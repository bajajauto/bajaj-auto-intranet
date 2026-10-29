import { createRemoteJWKSet, errors, jwtVerify } from 'jose'

/*
 * Entra ID access-token verification.
 *
 * Every route is private unless it opts out with `config: { public: true }`.
 * That default is the point: a route added next month without thinking about
 * auth is closed, not open.
 *
 * A verified request carries `request.user` — the identity the token proves.
 * It is deliberately thin (object id, tenant, name, UPN). Turning that into an
 * employee record is step D, server-side, never from anything the browser says.
 */

/*
 * v2 tokens are issued by `login.microsoftonline.com/{tid}/v2.0`, v1 by
 * `sts.windows.net/{tid}/`. Which one arrives depends on the API registration's
 * `accessTokenAcceptedVersion`, which IT may or may not have set — so both are
 * accepted, and both are pinned to our tenant.
 */
function issuersFor(tenantId) {
  return [
    `https://login.microsoftonline.com/${tenantId}/v2.0`,
    `https://sts.windows.net/${tenantId}/`,
  ]
}

/**
 * Builds the verifier. `jwks` is injectable so tests can sign with a local key;
 * in production it is Entra's published key set, fetched and cached by jose
 * (and refetched when a token arrives signed with a key it has not seen, which
 * is how Entra's key rollover is survived without a restart).
 */
export function createVerifier({ tenantId, audiences, scope, jwks }) {
  if (!tenantId || audiences.length === 0) {
    throw new Error('AUTH_MODE=entra needs AZURE_TENANT_ID and AZURE_API_AUDIENCE.')
  }

  const keySet =
    jwks ??
    createRemoteJWKSet(
      new URL(`https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`),
    )

  return async function verify(token) {
    const { payload } = await jwtVerify(token, keySet, {
      issuer: issuersFor(tenantId),
      audience: audiences,
      algorithms: ['RS256'],
      // Phone clocks drift; Entra's own guidance allows a few minutes.
      clockTolerance: 300,
    })

    /*
     * `scp` is present only on delegated (user) tokens. An app-only token —
     * a daemon using client credentials — has `roles` instead and no user
     * behind it, so it is refused here rather than treated as nobody.
     */
    const scopes = typeof payload.scp === 'string' ? payload.scp.split(' ') : []
    if (!scopes.includes(scope)) {
      throw new errors.JWTClaimValidationFailed(`missing scope ${scope}`, payload, 'scp')
    }
    if (typeof payload.oid !== 'string') {
      throw new errors.JWTClaimValidationFailed('missing oid', payload, 'oid')
    }

    return {
      oid: payload.oid,
      tenantId: payload.tid,
      name: payload.name ?? null,
      // v2 tokens use preferred_username, v1 use upn.
      upn: payload.preferred_username ?? payload.upn ?? null,
      scopes,
    }
  }
}

function bearerFrom(request) {
  const header = request.headers.authorization
  if (typeof header !== 'string') return null
  const [kind, token] = header.split(' ')
  return kind?.toLowerCase() === 'bearer' && token ? token : null
}

/**
 * Installs the onRequest hook. With `verify` null (AUTH_MODE=off) every request
 * passes with `request.user = null`, which is what local development runs on.
 */
export function installAuth(app, { verify }) {
  app.decorateRequest('user', null)

  if (!verify) {
    app.log.warn('AUTH_MODE=off — every route is open. Never expose this server.')
    return
  }

  app.addHook('onRequest', async (request, reply) => {
    // CORS preflights carry no Authorization header by design.
    if (request.method === 'OPTIONS') return
    if (request.routeOptions.config?.public) return

    const token = bearerFrom(request)
    if (!token) {
      return reply
        .code(401)
        .header('WWW-Authenticate', 'Bearer')
        .send({ error: 'Sign-in required.' })
    }

    try {
      request.user = await verify(token)
    } catch (err) {
      /*
       * The reason is logged, not sent. "Wrong audience" or "bad issuer" tells
       * a caller exactly which claim to forge next; the client only needs to
       * know to sign in again.
       */
      request.log.info({ code: err.code, reason: err.message }, 'token rejected')
      return reply
        .code(401)
        .header('WWW-Authenticate', 'Bearer error="invalid_token"')
        .send({ error: 'Sign-in required.' })
    }
  })
}

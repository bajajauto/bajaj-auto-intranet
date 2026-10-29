import { SignJWT, createLocalJWKSet, exportJWK, generateKeyPair } from 'jose'
import { buildApp } from '../src/app.js'
import { createVerifier } from '../src/lib/auth.js'

/*
 * Signs tokens with a local key standing in for Entra's, so the whole check —
 * signature, issuer, audience, expiry, scope — runs with no tenant.
 */

export const TENANT = '11111111-1111-1111-1111-111111111111'
export const API_CLIENT_ID = '22222222-2222-2222-2222-222222222222'

/** An app wired to a local key, and a `token()` that signs with it. */
export async function testApp() {
  const key = await generateKeyPair('RS256')
  const jwk = { ...(await exportJWK(key.publicKey)), kid: 'test', alg: 'RS256' }

  const verify = createVerifier({
    tenantId: TENANT,
    audiences: [API_CLIENT_ID, `api://${API_CLIENT_ID}`],
    scope: 'access_as_user',
    jwks: createLocalJWKSet({ keys: [jwk] }),
  })
  const app = await buildApp({ verify })

  async function token(overrides = {}, signingKey = key) {
    const claims = {
      tid: TENANT,
      oid: 'aaaaaaaa-0000-0000-0000-000000000001',
      name: 'Test Employee',
      preferred_username: 'test.employee@bajajauto.co.in',
      scp: 'access_as_user',
      ...overrides.claims,
    }
    return new SignJWT(claims)
      .setProtectedHeader({ alg: 'RS256', kid: 'test' })
      .setIssuer(overrides.issuer ?? `https://login.microsoftonline.com/${TENANT}/v2.0`)
      .setAudience(overrides.audience ?? API_CLIENT_ID)
      .setIssuedAt()
      .setExpirationTime(overrides.exp ?? '1h')
      .sign(signingKey.privateKey)
  }

  return { app, token }
}

export const bearer = (t) => (t ? { authorization: `Bearer ${t}` } : {})

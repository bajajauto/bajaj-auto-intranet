import { before, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { SignJWT, createLocalJWKSet, exportJWK, generateKeyPair } from 'jose'
import { buildApp } from '../src/app.js'
import { createVerifier } from '../src/lib/auth.js'

/*
 * Signs tokens with a local key standing in for Entra's, so the whole check —
 * signature, issuer, audience, expiry, scope — runs with no tenant.
 */

const TENANT = '11111111-1111-1111-1111-111111111111'
const API_CLIENT_ID = '22222222-2222-2222-2222-222222222222'
const PRIVATE_ROUTE = '/csr/impact'

let app
let key
let strangerKey

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

const get = (path, bearer) =>
  app.inject({ method: 'GET', url: path, headers: bearer ? { authorization: `Bearer ${bearer}` } : {} })

before(async () => {
  key = await generateKeyPair('RS256')
  strangerKey = await generateKeyPair('RS256')
  const jwk = { ...(await exportJWK(key.publicKey)), kid: 'test', alg: 'RS256' }

  const verify = createVerifier({
    tenantId: TENANT,
    audiences: [API_CLIENT_ID, `api://${API_CLIENT_ID}`],
    scope: 'access_as_user',
    jwks: createLocalJWKSet({ keys: [jwk] }),
  })
  app = await buildApp({ verify })
  // Routes read request.user; capture it without adding a route to the real app.
  app.get('/__whoami', async (request) => request.user)
})

describe('entra auth', () => {
  test('no token is 401', async () => {
    const res = await get(PRIVATE_ROUTE)
    assert.equal(res.statusCode, 401)
    assert.equal(res.headers['www-authenticate'], 'Bearer')
  })

  test('a valid v2 token passes and sets request.user', async () => {
    assert.equal((await get(PRIVATE_ROUTE, await token())).statusCode, 200)
    const me = (await get('/__whoami', await token())).json()
    assert.equal(me.oid, 'aaaaaaaa-0000-0000-0000-000000000001')
    assert.equal(me.upn, 'test.employee@bajajauto.co.in')
  })

  test('a v1 token (sts issuer, api:// audience) passes', async () => {
    const t = await token({
      issuer: `https://sts.windows.net/${TENANT}/`,
      audience: `api://${API_CLIENT_ID}`,
      claims: { preferred_username: undefined, upn: 'v1.user@bajajauto.co.in' },
    })
    const res = await get('/__whoami', t)
    assert.equal(res.statusCode, 200)
    assert.equal(res.json().upn, 'v1.user@bajajauto.co.in')
  })

  const rejected = {
    'signed by another key': () => token({}, strangerKey),
    'another tenant': () => token({ issuer: 'https://login.microsoftonline.com/99999999-9999-9999-9999-999999999999/v2.0' }),
    'another audience (e.g. a Graph token)': () => token({ audience: '00000003-0000-0000-c000-000000000000' }),
    'expired': () => token({ exp: Math.floor(Date.now() / 1000) - 3600 }),
    'missing the API scope': () => token({ claims: { scp: 'User.Read' } }),
    'app-only (roles, no scp)': () => token({ claims: { scp: undefined, roles: ['Letters.Issue'] } }),
    'not a JWT at all': async () => 'not-a-token',
  }
  for (const [label, make] of Object.entries(rejected)) {
    test(`rejects a token ${label}`, async () => {
      const res = await get(PRIVATE_ROUTE, await make())
      assert.equal(res.statusCode, 401)
      // The reason stays in the log.
      assert.deepEqual(res.json(), { error: 'Sign-in required.' })
    })
  }

  test('health is public', async () => {
    assert.equal((await get('/health')).statusCode, 200)
  })

  test('CORS preflight passes without a token', async () => {
    const res = await app.inject({
      method: 'OPTIONS',
      url: PRIVATE_ROUTE,
      headers: {
        origin: 'http://localhost:5173',
        'access-control-request-method': 'GET',
        'access-control-request-headers': 'authorization',
      },
    })
    assert.equal(res.statusCode, 204)
    assert.match(res.headers['access-control-allow-headers'], /authorization/i)
  })

  test('letters are private', async () => {
    assert.equal((await get('/letters/employee')).statusCode, 401)
    const res = await app.inject({ method: 'POST', url: '/letters/generate', payload: {} })
    assert.equal(res.statusCode, 401)
  })
})

describe('auth off', () => {
  test('every route is open and request.user is null', async () => {
    const open = await buildApp({ verify: null })
    open.get('/__whoami', async (request) => ({ user: request.user }))
    assert.equal((await open.inject({ url: PRIVATE_ROUTE })).statusCode, 200)
    assert.deepEqual((await open.inject({ url: '/__whoami' })).json(), { user: null })
  })

  test('entra mode without tenant config refuses to start', () => {
    assert.throws(() => createVerifier({ tenantId: '', audiences: [], scope: 'access_as_user' }), /AZURE_TENANT_ID/)
  })
})

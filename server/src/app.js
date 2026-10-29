import Fastify from 'fastify'
import cors from '@fastify/cors'
import {
  AUTH_MODE,
  AZURE_API_AUDIENCES,
  AZURE_API_SCOPE,
  AZURE_TENANT_ID,
  CORS_ORIGINS,
  IS_PRODUCTION,
  LOG_LEVEL,
} from './config.js'
import { createVerifier, installAuth } from './lib/auth.js'
import contentRoutes from './routes/content.js'
import csrRoutes from './routes/csr.js'
import lettersRoutes from './routes/letters.js'
import adminRoutes from './routes/admin.js'

/*
 * Builds the server without starting it, so it can be exercised by tests with
 * `app.inject()` — no port, no sockets, no teardown.
 *
 * `options.verify` replaces the token verifier (null turns auth off), so a test
 * can sign tokens with a local key instead of needing a tenant.
 */
export async function buildApp(options = {}) {
  const verify =
    'verify' in options
      ? options.verify
      : AUTH_MODE === 'entra'
        ? createVerifier({
            tenantId: AZURE_TENANT_ID,
            audiences: AZURE_API_AUDIENCES,
            scope: AZURE_API_SCOPE,
          })
        : null

  const app = Fastify({
    logger: { level: LOG_LEVEL },
    // Trust the App Service proxy for the client IP once deployed.
    trustProxy: IS_PRODUCTION,
  })

  await app.register(cors, {
    origin: CORS_ORIGINS,
    // The client sends a bearer token, not a cookie, so no credentialed CORS.
    credentials: false,
  })

  // Before the routes, so the hook covers every one of them.
  installAuth(app, { verify })

  await app.register(adminRoutes)
  await app.register(contentRoutes)
  await app.register(csrRoutes)
  await app.register(lettersRoutes)

  /*
   * One error shape for the whole API. Stack traces and contract issues are
   * logged, never sent — the client only needs to know it failed.
   */
  app.setErrorHandler((error, request, reply) => {
    const status = error.statusCode ?? 500
    if (status >= 500) request.log.error({ err: error }, 'request failed')
    reply.code(status).send({
      error: status >= 500 ? 'Something went wrong on our side.' : error.message,
    })
  })

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ error: `No route for ${request.method} ${request.url}` })
  })

  return app
}

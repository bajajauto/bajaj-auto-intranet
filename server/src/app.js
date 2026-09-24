import Fastify from 'fastify'
import cors from '@fastify/cors'
import { CORS_ORIGINS, IS_PRODUCTION, LOG_LEVEL } from './config.js'
import contentRoutes from './routes/content.js'
import csrRoutes from './routes/csr.js'
import lettersRoutes from './routes/letters.js'
import adminRoutes from './routes/admin.js'

/*
 * Builds the server without starting it, so it can be exercised by tests with
 * `app.inject()` — no port, no sockets, no teardown.
 */
export async function buildApp() {
  const app = Fastify({
    logger: { level: LOG_LEVEL },
    // Trust the App Service proxy for the client IP once deployed.
    trustProxy: IS_PRODUCTION,
  })

  await app.register(cors, {
    origin: CORS_ORIGINS,
    // Needed once sign-in lands in step 4 and the client sends its session.
    credentials: true,
  })

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

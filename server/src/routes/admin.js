import { ADMIN_PURGE_TOKEN } from '../config.js'
import { cacheSize, purge } from '../lib/cache.js'

export default async function adminRoutes(app) {
  // Public: App Service's health probe has no token.
  app.get('/health', { config: { public: true } }, async () => ({
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    cachedEntries: cacheSize(),
  }))

  /*
   * The editor's escape hatch. Without it, someone who publishes a correction
   * waits out the full TTL, reloads, still sees the old text, and reports a bug.
   *
   * Disabled rather than open when no token is configured — an unauthenticated
   * cache purge is a free denial-of-service against the content source.
   */
  // Public to the Entra check — it has its own shared-secret header instead.
  app.post('/admin/cache/purge', { config: { public: true } }, async (request, reply) => {
    if (!ADMIN_PURGE_TOKEN) {
      return reply.code(503).send({ error: 'Purge is not configured.' })
    }
    if (request.headers['x-purge-token'] !== ADMIN_PURGE_TOKEN) {
      return reply.code(401).send({ error: 'Invalid purge token.' })
    }

    const dropped = purge(request.query.prefix)
    request.log.info({ dropped, prefix: request.query.prefix ?? '(all)' }, 'cache purged')
    return { purged: dropped }
  })
}

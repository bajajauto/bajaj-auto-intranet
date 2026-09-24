import { cached } from '../lib/cache.js'
import { read } from '../lib/store.js'
import { contracts, validate } from '../lib/contract.js'

/*
 * The flat content collections: one fixture, one route, no parameters.
 * Declared as data rather than fifteen near-identical handlers, so adding a
 * domain is a row and the caching and validation cannot be forgotten.
 */
const COLLECTIONS = [
  { path: '/news', fixture: 'news', schema: contracts.news.getAll.returns },
  { path: '/notices', fixture: 'notices', schema: contracts.notices.getAll.returns },
  {
    path: '/notifications',
    fixture: 'notifications',
    schema: contracts.notifications.getAll.returns,
  },
  {
    path: '/calendar/events',
    fixture: 'calendar',
    schema: contracts.calendar.getEvents.returns,
  },
  { path: '/ticker', fixture: 'ticker', schema: contracts.stock.getAll.returns },
  { path: '/vehicles', fixture: 'vehicles', schema: contracts.vehicles.getAll.returns },
  {
    path: '/bytes/volumes',
    fixture: 'bytes-volumes',
    schema: contracts.bajajBytes.getAll.returns,
  },
  {
    path: '/podcast/episodes',
    fixture: 'podcast-episodes',
    schema: contracts.podcast.getAll.returns,
  },
]

export default async function contentRoutes(app) {
  for (const { path, fixture, schema } of COLLECTIONS) {
    app.get(path, async (request) => {
      const data = await cached(fixture, () => read(fixture))
      return validate(request, schema, data, path)
    })
  }

  // --- lookups: a miss is null-with-404, never an error -------------------
  app.get('/vehicles/:id', async (request, reply) => {
    const all = await cached('vehicles', () => read('vehicles'))
    const found = all.find((v) => v.id === request.params.id)
    if (!found) return reply.code(404).send(null)
    return validate(request, contracts.vehicles.getById.returns, found, '/vehicles/:id')
  })

  app.get('/bytes/volumes/:id', async (request, reply) => {
    const all = await cached('bytes-volumes', () => read('bytes-volumes'))
    const found = all.find((v) => v.id === request.params.id)
    if (!found) return reply.code(404).send(null)
    return validate(request, contracts.bajajBytes.getById.returns, found, '/bytes/volumes/:id')
  })

  app.get('/podcast/episodes/by-volume/:volumeId', async (request, reply) => {
    const all = await cached('podcast-episodes', () => read('podcast-episodes'))
    const found = all.find((ep) => ep.sourceVolumeId === request.params.volumeId)
    if (!found) return reply.code(404).send(null)
    return validate(
      request,
      contracts.podcast.getByVolume.returns,
      found,
      '/podcast/episodes/by-volume/:volumeId',
    )
  })

  /*
   * Filtering lives here rather than on the client so the client never has to
   * hold the whole catalogue to show one tab. An unknown category is an empty
   * list, not a 404 — asking for a category with no videos is a valid question.
   */
  app.get('/videos', async (request) => {
    const all = await cached('videos', () => read('videos'))
    const { category } = request.query
    const data = category ? all.filter((v) => v.category === category) : all
    return validate(request, contracts.youtube.getAll.returns, data, '/videos')
  })

  app.get('/policies/:bucketId', async (request, reply) => {
    const library = await cached('policies', () => read('policies'))
    const bucket = library[request.params.bucketId]
    // Null is a real answer here: a bucket whose documents are not collected yet.
    if (!bucket) return reply.code(404).send(null)
    return validate(
      request,
      contracts.policyLibrary.getByBucket.returns,
      bucket,
      '/policies/:bucketId',
    )
  })
}

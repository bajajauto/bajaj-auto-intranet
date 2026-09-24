import { cached } from '../lib/cache.js'
import { read } from '../lib/store.js'
import { contracts, validate } from '../lib/contract.js'

const csr = () => cached('csr', () => read('csr'))

export default async function csrRoutes(app) {
  app.get('/csr/impact', async (request) =>
    validate(request, contracts.csr.getImpact.returns, (await csr()).impact, '/csr/impact'),
  )

  app.get('/csr/programs', async (request) =>
    validate(request, contracts.csr.getPrograms.returns, (await csr()).programs, '/csr/programs'),
  )

  app.get('/csr/opportunities', async (request) =>
    validate(
      request,
      contracts.csr.getOpportunities.returns,
      (await csr()).opportunities,
      '/csr/opportunities',
    ),
  )

  app.get('/csr/opportunities/:id', async (request, reply) => {
    const found = (await csr()).opportunities.find((o) => o.id === request.params.id)
    if (!found) return reply.code(404).send(null)
    return validate(
      request,
      contracts.csr.getOpportunityById.returns,
      found,
      '/csr/opportunities/:id',
    )
  })

  app.get('/csr/stories', async (request) =>
    validate(request, contracts.csr.getStories.returns, (await csr()).stories, '/csr/stories'),
  )

  /*
   * Per-user, so it is deliberately NOT cached — the cache is shared across
   * every employee, and one person's volunteer hours must never be served to
   * another. In step 5 this reads from Postgres keyed on the signed-in user.
   */
  app.get('/csr/me/stats', async (request) => {
    const data = (await read('csr')).userStats
    return validate(request, contracts.csr.getUserStats.returns, data, '/csr/me/stats')
  })
}

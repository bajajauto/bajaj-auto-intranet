import { buildApp } from './app.js'
import { HOST, PORT } from './config.js'

const app = await buildApp()

try {
  await app.listen({ port: PORT, host: HOST })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

// App Service sends SIGTERM on restart; drain in-flight requests first.
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    app.log.info(`${signal} received, shutting down`)
    await app.close()
    process.exit(0)
  })
}

import { build } from './app'
import 'dotenv/config'

const app = build({ logger: true })

try {
  await app.listen({ port: process.env.PORT || 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}

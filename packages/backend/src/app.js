import 'dotenv/config'
import Fastify from 'fastify'
import { contacts } from './routes/contacts'

export const build = (opts = {}) => {
  const app = Fastify(opts)

  app.register(contacts, { prefix: '/contacts' })

  return app
}

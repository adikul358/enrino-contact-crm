import Fastify from 'fastify'
import cors from '@fastify/cors'
import { contacts } from './routes/contacts'

export const build = (opts = {}) => {
  const app = Fastify(opts)
  app.register(cors, {
    origin: (origin, cb) => {
      const hostname = new URL(origin).hostname
      if (hostname === 'localhost') {
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'), false)
    }
  })

  app.register(contacts, { prefix: '/contacts' })

  return app
}

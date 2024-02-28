import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.get('/', (req, res) => {
    res.send({ message: 'Olá mundo' })
  })
}
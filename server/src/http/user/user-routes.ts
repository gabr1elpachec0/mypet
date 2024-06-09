import { FastifyInstance } from "fastify"
import bcrypt from 'bcryptjs'
import { prisma } from "../../lib/prisma"
import { userParam, userBody } from "./utils"

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {

    const { name, email, password } = userBody.parse(request.body)

    const hash = await bcrypt.hash(password, 10)

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash
        }
      })

      return reply.status(201).send({ message: 'Usuário criado com sucesso!' })
    } catch (e) {
      console.error(e)
    }
  })

  app.get('/users/:userId', async (request, reply) => {
    const { userId } = userParam.parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      return reply.status(200).send({ user })
    } catch (e) {
      console.error(e)
    }
  })
}
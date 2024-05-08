import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

import bcrypt from 'bcryptjs'

export async function userRoutes(app: FastifyInstance) {
  // User
  app.post('/user', async (request, reply) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    })

    const { name, email, password } = createUserBody.parse(request.body)

    const hash = await bcrypt.hash(password, 10)
    // console.log(hash)

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

  app.get('/user/:userId', async (request, reply) => {
    const findPetsByUserIdParams = z.object({
      userId: z.string().uuid()
    })

    const { userId } = findPetsByUserIdParams.parse(request.params)
    console.log(userId)
  })
}
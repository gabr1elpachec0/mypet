import { FastifyInstance } from "fastify"
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { generateJWTToken } from "../../utils/jwt"
import fastifyCookie from 'fastify-cookie'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users/register', async (request, reply) => {

    const { name, email, password } = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    }).parse(request.body)

    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user) {
      return reply.status(409).send({ error: 'Usuário já existe!' })
    }

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          type: 'USER'
        }
      })

      return reply.status(201).send({ message: 'Usuário criado com sucesso!' })
    } catch (e) {
      console.error(e)
    }
  })

  app.get('/users/:userId', async (request, reply) => {
    const { userId } = z.object({ userId: z.string().uuid() }).parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'Usuário não encontrado.' })
      }

      return reply.status(200).send({ user })
    } catch (e) {
      console.error(e)
    }
  })

  app.post('/users/login', async (request, reply) => {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(request.body)

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'Usuário não encontrado.' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return reply.status(404).send({ error: 'Credenciais inválidas.' })
      }

      const token = generateJWTToken(user.id, 'USER')

      return reply.send({ message: 'Login bem-sucedido!', token })
    } catch (error) {
      console.error(error)
    }
  })

  app.post('/users/logout', (request, reply) => {
  })
}
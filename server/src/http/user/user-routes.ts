import { FastifyInstance } from "fastify"
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { generateJWTToken } from "../../utils/jwt"

export async function userRoutes(app: FastifyInstance) {
  enum UserType {
    USER = 'USER',
    VET = 'VET'
  }

  app.get('/users/:userId', async (request, reply) => {
    const { userId } = z.object({ userId: z.string().uuid() }).parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found.' })
      }

      return reply.status(200).send({ user })
    } catch (e) {
      console.error(e)
    }
  })

  app.post('/users/signup', async (request, reply) => {
    const { name, email, password, type } = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      type: z.enum([UserType.USER, UserType.VET])
    }).parse(request.body)

    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user) {
      return reply.status(409).send({ error: 'User already exists.' })
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          type
        }
      })

      return reply.status(201).send({ userId: user.id })
    } catch (e) {
      console.error(e)
    }
  })

  app.post('/users/auth', async (request, reply) => {
    const { email, password } = z.object({
      email: z.string().email(),
      password: z.string()
    }).parse(request.body)

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found. Please create an account.' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return reply.status(401).send({ error: 'Invalid credentials.' })
      }

      const token = generateJWTToken(user.id, 'USER')

      return reply.send({ token })
    } catch (e) {
      console.error(e)
    }
  })

  app.put("/users/:userId", async (request, reply) => {
    const { userId } = z.object({ userId: z.string().uuid() }).parse(request.params)
    const { name, email, password, type } = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      type: z.enum([UserType.USER, UserType.VET])
    }).parse(request.body)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ message: "User not found." })
      }

      const hash = await bcrypt.hash(password, 10)

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          name,
          email,
          password: hash,
          type
        }
      })

      return reply.status(200).send({ message: "User updated successfully." })
    } catch (e) {
      console.error(e)
    }
  })

  app.delete("/users/:userId", async (request, reply) => {
    const { userId } = z.object({ userId: z.string().uuid() }).parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ message: "User not found." })
      }

      await prisma.user.delete({
        where: {
          id: userId
        }
      })

      return reply.status(200).send({ message: "User deleted successfully." })
    } catch (e) {
      console.error(e)
    }
  })
}
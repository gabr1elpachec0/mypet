import { FastifyInstance } from "fastify";
import jwt from 'jsonwebtoken'
import { prisma } from "../../lib/prisma";
import { petBody } from "./utils";
import * as fastifyCookie from 'fastify-cookie'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', async (request, reply) => {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ error: 'Token não encontrado!' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)
    const userId = decoded.userId

    try {
      const pets = await prisma.pet.findMany({
        where: {
          userId
        }
      })

      return reply.status(200).send({ pets })
    } catch(e) {
      console.error(e)
    }
  })

  app.post('/pets', async (request, reply) => {
    const { name, birthDate, breed, size, gender } = petBody.parse(request.body)
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ error: 'Token não encontrado!' })
    }

    const decoded = jwt.verify(token, process.env.SECRET)    
    const userId = decoded.userId

    try {
      const findUserById = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      await prisma.pet.create({
        data: {
          userId,
          name,
          birthDate: new Date(birthDate),
          breed,
          size,
          gender,
        } 
      })

      return reply.status(201).send({ message: `Pet de ${findUserById?.name} adicionado(a) com sucesso!` })
    } catch (e) {
      console.error(e)
    }
  })
}
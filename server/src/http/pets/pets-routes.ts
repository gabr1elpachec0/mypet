import { FastifyInstance } from "fastify";
import jwt from 'jsonwebtoken'
import { prisma } from "../../lib/prisma";
import { petBody } from "./utils";
import { z } from "zod";

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:userId', async (request, reply) => {
    const { userId } = z.object({ 
      userId: z.string() 
    }).parse(request.params)

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

  app.post('/pets/:userId', async (request, reply) => {
    const { name, birthDate, breed, size, gender } = petBody.parse(request.body)
    const { userId } = z.object({ 
      userId: z.string() 
    }).parse(request.params)

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
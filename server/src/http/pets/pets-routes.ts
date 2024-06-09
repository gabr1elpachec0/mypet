import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { petBody, userParam } from "./utils";

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:userId', async (request, reply) => {

    const { userId } = userParam.parse(request.params)

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

    const { userId } = userParam.parse(request.params)
    const { name, birthDate, breed, size, gender } = petBody.parse(request.body)

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
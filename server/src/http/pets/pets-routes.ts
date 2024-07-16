import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:userId', async (request, reply) => {
    const { name, birthDate, breed, size, gender } = z.object({
      name: z.string(),
      birthDate: z.string(),
      breed: z.string(),
      size: z.string(),
      gender: z.string()
    }).parse(request.body)

    const { userId } = z.object({ 
      userId: z.string() 
    }).parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found.' })
      }

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

      return reply.status(201).send({ message: 'Pet was created successfully.' })
    } catch (e) {
      console.error(e)
    }
  })

  app.get('/pets/:userId', async (request, reply) => {
    const { userId } = z.object({ 
      userId: z.string() 
    }).parse(request.params)

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found.' })
      }

      const pets = await prisma.pet.findMany({
        where: {
          userId
        }
      })

      if (pets.length > 0) {
        return reply.status(200).send({ petsOwner: `${user.name}`, pets })
      }

      return reply.status(200).send({ message: `${user.name} does not have any pets.` })
    } catch(e) {
      console.error(e)
    }
  })
}
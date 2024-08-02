import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function petsRoutes(app: FastifyInstance) {
  app.post('/users/:userId/pets', async (request, reply) => {
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

      const pet = await prisma.pet.create({
        data: {
          userId,
          name,
          birthDate: new Date(birthDate),
          breed,
          size,
          gender,
        } 
      })

      return reply.status(201).send({ message: 'Pet was created successfully.', petId: pet.id })
    } catch (e) {
      console.error(e)
    }
  })

  app.get('/users/:userId/pets', async (request, reply) => {
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

  app.get('/pets/:petId', async (request, reply) => {
    const { petId } = z.object({
      petId: z.string().uuid()
    }).parse(request.params)

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id: petId
        }
      })
  
      if (!pet) {
        return reply.status(404).send({ message: 'Pet not found.' })
      }
  
      return reply.status(200).send({ pet })
    } catch (e) {
      console.error(e)
    }
  })

  app.put('/pets/:petId', async (request, reply) => {
    const { petId } = z.object({
      petId: z.string().uuid()
    }).parse(request.params)

    const { name, birthDate, breed, size, gender } = z.object({
      name: z.string(),
      birthDate: z.string(),
      breed: z.string(),
      size: z.string(),
      gender: z.string()
    }).parse(request.body)

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id: petId
        }
      })

      if (!pet) {
        return reply.status(404).send({ error: 'Pet not found.' })
      }

      await prisma.pet.update({
        where: {
          id: petId
        },
        data: {
          name,
          birthDate,
          breed,
          size,
          gender
        }
      })

      return reply.status(200).send({ message: `${pet.name} was updated succesfully.` })
    } catch(e) {
      console.error(e)
    }
  })

  app.delete('/pets/:petId', async (request, reply) => {
    const { petId } = z.object({
      petId: z.string().uuid()
    }).parse(request.params)

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id: petId
        }
      })
  
      if (!pet) {
        return reply.status(404).send({ message: 'Pet not found.' })
      }
  
      await prisma.pet.delete({
        where: {
          id: petId
        }
      })
  
      return reply.status(200).send({ message: `${pet.name} was deleted successfully.` })
    } catch (e) {
      console.error(e)
    }
  })
}
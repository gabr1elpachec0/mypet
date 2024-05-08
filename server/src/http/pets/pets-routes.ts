import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:userId', async (request, reply) => {
    const findPetsByUserIdParams = z.object({
      userId: z.string().uuid()
    })

    const { userId } = findPetsByUserIdParams.parse(request.params)

    // id do usuário precisa ser o do que está logado na plataforma (questão de segurança)

    try {
      const pets = await prisma.pet.findMany({
        where: {
          userId
        }
      })

      return pets
    } catch(e) {
      console.error(e)
    }
  })

  app.get('/pets', async (req) => {
    const findAllPets = await prisma.pet.findMany()

    return findAllPets
  })

  app.post('/pet/:userId', async (request, reply) => {
    const createPetsParams = z.object({
      userId: z.string().uuid()
    })

    const createPetsBody = z.object({
      name: z.string(),
      birthDate: z.string(),
      breed: z.string(),
      size: z.string(),
      gender: z.string(),
    })

    const { userId } = createPetsParams.parse(request.params)
    const { name, birthDate, breed, size, gender } = createPetsBody.parse(request.body)

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

      return reply.status(201).send({ message: `Pet de ${findUserById?.name} criado(a) com sucesso!` })
    } catch (e) {
      console.error(e)
    }
  })
}
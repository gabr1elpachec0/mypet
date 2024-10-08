import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function vaccinesRoutes(app: FastifyInstance) {
  app.get('/pets/:petId/vaccines', async (request, reply) => {
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

      const vaccines = await prisma.vaccines.findMany({
        where: {
          petId
        }
      })

      if (vaccines.length > 0) {
        return reply.status(200).send({ vaccines })
      }

      return reply.status(200).send({ message: `${pet.name} does not have any registered vaccine.` })
    } catch (e) {
      console.error(e)
    }
  })

  app.get('/vaccines/:vaccineId', async (request, reply) => {
    const { vaccineId } = z.object({
      vaccineId: z.string().uuid()
    }).parse(request.params)

    try {
      const vaccine = await prisma.vaccines.findUnique({
        where: {
          id: vaccineId
        }
      })

      if (!vaccine) {
        return reply.status(404).send({ message: 'Vaccine not found.' })
      }

      return reply.status(200).send({ vaccine })
    } catch (error) {
      console.error(error)
    }
  })

  app.post('/pets/:petId/vaccines', async (request, reply) => {
    const { petId } = z.object({
      petId: z.string().uuid()
    }).parse(request.params)

    const {
      vaccineCategory,
      vaccineName,
      vaccineDate,
      vaccineRepeatDate
    } = z.object({
      vaccineCategory: z.string(),
      vaccineName: z.string(),
      vaccineDate: z.string(),
      vaccineRepeatDate: z.string()
    }).parse(request.body)

    try {
      const pet = await prisma.pet.findUnique({
        where: {
          id: petId
        }
      })

      if (!pet) {
        return reply.status(404).send({ message: 'Pet not found.' })
      }

      const vaccine = await prisma.vaccines.create({
        data: {
          vaccineCategory,
          vaccineName,
          vaccineDate: new Date(vaccineDate),
          vaccineRepeatDate: new Date(vaccineRepeatDate),
          petId
        }
      })

      return reply.status(201).send({ vaccineId: vaccine.id })
    } catch (error) {
      console.error(error)
    }
  })

  app.put('/vaccines/:vaccineId', async (request, reply) => {
    const { vaccineId } = z.object({
      vaccineId: z.string().uuid()
    }).parse(request.params)

    const {
      vaccineCategory,
      vaccineName,
      vaccineDate,
      vaccineRepeatDate
    } = z.object({
      vaccineCategory: z.string(),
      vaccineName: z.string(),
      vaccineDate: z.string(),
      vaccineRepeatDate: z.string()
    }).parse(request.body)

    try {
      const vaccine = await prisma.vaccines.findUnique({
        where: {
          id: vaccineId
        }
      })

      if (!vaccine) {
        return reply.status(404).send({ message: 'Vaccine not found.' })
      }

      await prisma.vaccines.update({
        where: {
          id: vaccineId
        },
        data: {
          vaccineCategory,
          vaccineName,
          vaccineDate,
          vaccineRepeatDate
        }
      })

      return reply.status(200).send({ message: 'Vaccine updated successfully.' })
    } catch (error) {
      console.error(error)
    }
  })

  app.delete('/vaccines/:vaccineId', async (request, reply) => {
    const { vaccineId } = z.object({
      vaccineId: z.string().uuid()
    }).parse(request.params)

    try {
      const vaccine = await prisma.vaccines.findUnique({
        where: {
          id: vaccineId
        }
      })

      if (!vaccine) {
        return reply.status(404).send({ message: 'Vaccine not found.' })
      }

      await prisma.vaccines.delete({
        where: {
          id: vaccineId
        }
      })

      return reply.status(200).send({ message: 'Vaccine deleted successfully.' })
    } catch (error) {
      console.error(error)
    }
  })
}
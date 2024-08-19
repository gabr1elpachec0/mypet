import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function medicinesRoutes(app: FastifyInstance) {
  app.get('/pets/:petId/medicines', async (request, reply) => {
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

      const medicines = await prisma.medicines.findMany({
        where: {
          petId
        }
      })

      if (medicines.length > 0) {
        return reply.status(200).send({ medicines })
      }

      return reply.status(200).send({ message: `${pet.name} does not have any registered medicine.` })
    } catch (error) {
      console.error(error)
    }
  })

  app.get('/medicines/:medicineId', async (request, reply) => {
    const { medicineId } = z.object({
      medicineId: z.string().uuid()
    }).parse(request.params)

    try {
      const medicine = await prisma.medicines.findUnique({
        where: {
          id: medicineId
        }
      })

      if (!medicine) {
        return reply.status(404).send({ message: 'Medicine not found.' })
      }

      return reply.status(200).send({ medicine })
    } catch (error) {
      console.error(error)
    }
  })

  app.post('/pets/:petId/medicines', async (request, reply) => {
    const { petId } = z.object({
      petId: z.string().uuid()
    }).parse(request.params)

    const {
      medicineCategory,
      medicineName,
      medicineDate,
      medicineRepeatDate
    } = z.object({
      medicineCategory: z.string(),
      medicineName: z.string(),
      medicineDate: z.string(),
      medicineRepeatDate: z.string()
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

      const medicine = await prisma.medicines.create({
        data: {
          medicineCategory,
          medicineName,
          medicineDate: new Date(medicineDate),
          medicineRepeatDate: new Date(medicineRepeatDate),
          petId
        }
      })

      return reply.status(201).send({ medicineId: medicine.id })
    } catch (error) {
      console.error(error)
    }
  })

  app.put('/medicines/:medicineId', async (request, reply) => {
    const { medicineId } = z.object({
      medicineId: z.string().uuid()
    }).parse(request.params)

    const {
      medicineCategory,
      medicineName,
      medicineDate,
      medicineRepeatDate
    } = z.object({
      medicineCategory: z.string(),
      medicineName: z.string(),
      medicineDate: z.string(),
      medicineRepeatDate: z.string()
    }).parse(request.body)

    try {
      const medicine = await prisma.medicines.findUnique({
        where: {
          id: medicineId
        }
      })

      if (!medicine) {
        return reply.status(404).send({ message: 'Medicine not found.' })
      }

      await prisma.medicines.update({
        where: {
          id: medicineId
        },
        data: {
          medicineCategory,
          medicineName,
          medicineDate,
          medicineRepeatDate
        }
      })

      return reply.status(200).send({ message: 'Medicine updated successfully.' })
    } catch (error) {
      console.error(error)
    }
  })

  app.delete('/medicines/:medicineId', async (request, reply) => {
    const { medicineId } = z.object({
      medicineId: z.string().uuid()
    }).parse(request.params)

    try {
      const medicine = await prisma.medicines.findUnique({
        where: {
          id: medicineId
        }
      })

      if (!medicine) {
        return reply.status(404).send({ message: 'Medicine not found.' })
      }

      await prisma.medicines.delete({
        where: {
          id: medicineId
        }
      })

      return reply.status(200).send({ message: 'Medicine deleted successfully.' })
    } catch (error) {
      console.error(error)
    }
  })
}
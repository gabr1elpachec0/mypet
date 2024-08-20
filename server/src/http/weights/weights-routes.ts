import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function weightsRoutes(app: FastifyInstance) {
	app.get('/pets/:petId/weights', async (request, reply) => {
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

			const weights = await prisma.weight.findMany({
				where: {
					petId
				}
			})

			if (weights.length > 0) {
				return reply.status(200).send({ weights })
			}

			return reply.status(200).send({ message: `${pet.name} does not have any registered weight.` })
		} catch (e) {
			console.error(e)
		}
	})

	app.get('/weights/:weightId', async (request, reply) => {
		const { weightId } = z.object({
			weightId: z.string().uuid()
		}).parse(request.params)

		try {
			const weight = await prisma.weight.findUnique({
				where: {
					id: weightId
				}
			})

			if (!weight) {
				return reply.status(404).send({ message: 'Weight not found.' })
			}

			return reply.status(200).send({ weight })
		} catch (error) {
			console.error(error)
		}
	})

	app.post('/pets/:petId/weights', async (request, reply) => {
		const { petId } = z.object({
			petId: z.string().uuid()
		}).parse(request.params)

		const {
			weight,
			weightDate
		} = z.object({
			weight: z.number().positive(),
			weightDate: z.string(),
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

			const weightRegister = await prisma.weight.create({
				data: {
					weight,
					weightDate: new Date(weightDate),
					petId
				}
			})

			return reply.status(201).send({ weightId: weightRegister.id })
		} catch (error) {
			console.error(error)
		}
	})

	app.put('/weights/:weightId', async (request, reply) => {
		const { weightId } = z.object({
			weightId: z.string().uuid()
		}).parse(request.params)

		const {
			weight,
			weightDate
		} = z.object({
			weight: z.number().positive(),
			weightDate: z.string()
		}).parse(request.body)

		try {
			const weightRegister = await prisma.weight.findUnique({
				where: {
					id: weightId
				}
			})

			if (!weightRegister) {
				return reply.status(404).send({ message: 'Weight not found.' })
			}

			await prisma.weight.update({
				where: {
					id: weightId
				},
				data: {
					weight,
					weightDate: new Date(weightDate)
				}
			})

			return reply.status(200).send({ message: 'Weight updated successfully.' })
		} catch (error) {
			console.error(error)
		}
	})

	app.delete('/weights/:weightId', async (request, reply) => {
		const { weightId } = z.object({
			weightId: z.string().uuid()
		}).parse(request.params)

		try {
			const weight = await prisma.weight.findUnique({
				where: {
					id: weightId
				}
			})

			if (!weight) {
				return reply.status(404).send({ message: 'Weight not found.' })
			}

			await prisma.weight.delete({
				where: {
					id: weightId
				}
			})

			return reply.status(200).send({ message: 'Weight deleted successfully.' })
		} catch (error) {
			console.error(error)
		}
	})
}
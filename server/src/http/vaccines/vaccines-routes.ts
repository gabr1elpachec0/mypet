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
                return reply.status(200).send({ pet: `${pet.name}`, vaccines })
            }

            return reply.status(200).send({ message: `${pet.name} does not have any vaccines.` })
        } catch (e) {
            console.error(e)
        }
    })
}
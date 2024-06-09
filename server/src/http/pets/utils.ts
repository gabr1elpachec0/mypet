import { z } from "zod";

export const petBody = z.object({
  name: z.string(),
  birthDate: z.string(),
  breed: z.string(),
  size: z.string(),
  gender: z.string(),
})

export const userParam = z.object({
  userId: z.string().uuid()
})
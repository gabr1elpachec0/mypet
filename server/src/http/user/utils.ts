import { z } from "zod";

export const userBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const userParam = z.object({
  userId: z.string().uuid()
})

export const userLogin = z.object({
  email: z.string().email(),
  password: z.string()
})
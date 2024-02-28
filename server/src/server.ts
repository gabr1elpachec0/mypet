import fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./http/routes"

const app = fastify()

app.register(appRoutes)

app.register(cors)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running!')
})
import fastify from "fastify"
import cors from "@fastify/cors"
import fastifyCookie from 'fastify-cookie'
import { userRoutes } from "./http/user/user-routes"
import { petsRoutes } from "./http/pets/pets-routes"

const app = fastify()

app.register(userRoutes)
app.register(petsRoutes)

app.register(cors)

app.register(fastifyCookie, {
  secret: '',
  parseOptions: {} 
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running!')
})
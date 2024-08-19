import fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./http/user/user-routes"
import { petsRoutes } from "./http/pets/pets-routes"
import { vaccinesRoutes } from "./http/vaccines/vaccines-routes"
import { medicinesRoutes } from "./http/medicines/medicines-routes"

const app = fastify()

app.register(userRoutes)
app.register(petsRoutes)
app.register(vaccinesRoutes)
app.register(medicinesRoutes)

app.register(cors)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running!')
})
import jwt from '@fastify/jwt'
import 'dotenv/config'
import fastify from 'fastify'
import permissionRoutes from './routes/permission'
import rolesRoutes from './routes/roles'
import tagRoutes from './routes/tag'
import user from './routes/user'
import userKanban from './routes/userKanban'
const app = fastify()
app.register(user)
app.register(userKanban)
app.register(rolesRoutes)
app.register(permissionRoutes)
app.register(tagRoutes)
app.register(jwt, { secret:  String(process.env.SECRET_TOKEN) })
const port = parseInt(process.env.PORT || '5000', 10)
try {
  app.listen(
    {
      port,
    },
    () => {
      console.log(`HTTP server running on http://localhost:${port} 🚀`)
    },
  )
} catch (error) {
  console.error('Erro ao conectar ao MongoDB:', error)
  process.exit(1)
}

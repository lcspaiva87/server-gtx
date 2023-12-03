import { FastifyInstance } from 'fastify'
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated'
import { can } from '../middlewares/permissions'
import { CreateRolesController } from '../useCases/roles/CreateRolesController'
import { ListRolesController } from '../useCases/roles/ListRolesController'
const createRolesController = new CreateRolesController()
const listRolesController = new ListRolesController()
async function rolesRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/roles',
    {
      preHandler: [can(['admin']), ensuredAuthenticated()],
    },
    createRolesController.handle,
  )
  fastify.get(
    '/roles',
    {
      preHandler: [can(['admin']), ensuredAuthenticated()],
    },
    listRolesController.handle,
  )
}

export default rolesRoutes

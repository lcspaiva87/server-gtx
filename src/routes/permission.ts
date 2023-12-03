import { FastifyInstance } from 'fastify'
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated'
import { can } from '../middlewares/permissions'
import { CreatePermissionController } from '../useCases/permission/CreatePermissionController'
import { CreateUserAccessControll } from '../useCases/permission/CreateUserAccessControll'
import { ListPermissionController } from '../useCases/permission/ListPermissionController'
const createPermissionController = new CreatePermissionController()
const createUserAccessController = new CreateUserAccessControll()
const listPermissionController = new ListPermissionController()
async function permissionRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/permission',
    {
      preHandler: [can(['zero']), ensuredAuthenticated()],
    },
    createPermissionController.handle,
  )
  fastify.post(
    '/permission/acl',
    {
      preHandler: [can(['admin']), ensuredAuthenticated()],
    },
    createUserAccessController.handle,
  )
  fastify.get(
    '/permission/',
    {
      preHandler: [can(['admin']), ensuredAuthenticated()],
    },
    listPermissionController.handle,
  )
}

export default permissionRoutes

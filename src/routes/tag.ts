import { FastifyInstance } from 'fastify'
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated'
import { can } from '../middlewares/permissions'
import { CreateTagController } from '../useCases/tag/CreateTagController'
import { EditTagController } from '../useCases/tag/EditTagController'
import { ListTagUseController } from '../useCases/tag/ListTagController'
const createTagController = new CreateTagController()
const listTagUseController = new ListTagUseController()
const editTagController = new EditTagController()
async function tagRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/tag',
    {
      preHandler: [
        can(['admin', 'support', 'supervisor']),
        ensuredAuthenticated(),
      ],
    },
    createTagController.handle,
  )
  fastify.get(
    '/tag',
    {
      preHandler: [
        can(['admin', 'support', 'supervisor']),
        ensuredAuthenticated(),
      ],
    },
    listTagUseController.handle,
  )
  fastify.patch(
    '/tag',
    {
      preHandler: [
        can(['admin', 'support', 'supervisor']),
        ensuredAuthenticated(),
      ],
    },
    editTagController.handle,
  )
}

export default tagRoutes

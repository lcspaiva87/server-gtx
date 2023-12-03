import { FastifyInstance } from 'fastify'
import { jwtHook } from '../lib/jwtHook'
import { CreeateTask, PathIdTask } from '../modules/kanban/Task'
import {
  CreeateColumn,
  DeleteColumn,
  PathIdColumn,
} from '../modules/kanban/column'

async function userKanban(fastify: FastifyInstance) {
  jwtHook(fastify)
  fastify.post('/columns', CreeateColumn)
  fastify.delete('/columns/:id', DeleteColumn)
  fastify.patch('/columns/:id', PathIdColumn)

  fastify.post('/task', CreeateTask)
  fastify.patch('/task/:id', PathIdTask)
}

export default userKanban

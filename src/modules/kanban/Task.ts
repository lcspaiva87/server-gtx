import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

async function CreeateTask(req: FastifyRequest, reply: FastifyReply) {
  try {
    const Schema = z.object({
      userId: z.number().int(),
      columnId: z.number().int(),
      camera: z.string(),
      tag: z.string(),
      company: z.string(),
      title: z.string(),
    })
    const { userId, title, camera, columnId, company, tag } = Schema.parse(
      req.body,
    )
    const fields: any = { userId, title, camera, columnId, company, tag }
    const emptyFields = []

    for (const fieldName in fields) {
      if (!fields[fieldName]) {
        emptyFields.push(fieldName)
      }
    }
    if (emptyFields.length > 0) {
      reply.status(400).send({
        message: `The following fields are empty: ${emptyFields.join(', ')}`,
      })
      return
    }
    const Task = await prisma.task.create({
      data: {
        userId,
        title,
        columnId,
        company,
        tag,
        camera,
        date: new Date().toISOString(), // add the current date as a string
      },
    })

    reply.status(200).send({ message: 'Column registered successfully', Task })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}

async function DeleteTask(req: FastifyRequest, reply: FastifyReply) {
  try {
    const Schema = z.object({
      id: z.string(),
    })
    const { id } = Schema.parse(req.params)
    const Task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!Task) {
      return reply.status(400).send({ message: 'Task not found' })
    }
    reply.status(200).send({ message: 'Task deleted successfully', Task })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}
async function PathIdTask(req: FastifyRequest, reply: FastifyReply) {
  try {
    const Schema = z.object({
      id: z.string(),
    })
    const SchemaTask = z.object({
      columId: z.number().int(),
    })
    const { id } = Schema.parse(req.params)
    const { columId } = SchemaTask.parse(req.body)
    const Task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!Task) {
      return reply.status(400).send({ message: 'Task not found' })
    }

    const Column = await prisma.column.findUnique({
      where: {
        id: columId,
      },
    })
    if (!Column) {
      return reply.status(400).send({ message: 'Column not found' })
    }

    await prisma.task.update({
      where: {
        id: Task.id,
      },
      data: {
        columnId: columId,
      },
    })
    reply.status(200).send({ message: `Task updated successfully` })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}

export { CreeateTask, DeleteTask, PathIdTask }

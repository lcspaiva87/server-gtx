import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

async function CreeateColumn(req: FastifyRequest, reply: FastifyReply) {
  try {
    const CoinSchema = z.object({
      userId: z.number().int(),
      title: z.string(),
    })
    const { userId, title } = CoinSchema.parse(req.body)
    const Column = await prisma.column.create({
      data: {
        userId,
        title,
      },
    })

    reply
      .status(200)
      .send({ message: 'Column registered successfully', Column })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error', error })
  }
}

async function DeleteColumn(req: FastifyRequest, reply: FastifyReply) {
  try {
    const CoinSchema = z.object({
      id: z.string(),
    })
    const { id } = CoinSchema.parse(req.params)
    const Column = await prisma.column.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!Column) {
      return reply.status(400).send({ message: 'Column not found' })
    }
    reply.status(200).send({ message: 'Column deleted successfully', Column })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}
async function PathIdColumn(req: FastifyRequest, reply: FastifyReply) {
  try {
    const CoinSchema = z.object({
      id: z.number().int(),
    })
    const { id: idColumOld } = CoinSchema.parse(req.params)
    const { id: idNew } = CoinSchema.parse(req.body)

    const Column = await prisma.column.findUnique({
      where: {
        id: Number(idColumOld),
      },
    })
    if (!Column) {
      return reply.status(400).send({ message: 'Column not found' })
    }
    await prisma.column.update({
      where: {
        id: Column.id,
      },
      data: {
        id: idNew,
      },
    })
    reply.status(200).send({ message: 'Column found successfully', Column })
  } catch (error) {
    reply.status(500).send({ message: 'Internal server error', error })
  }
}
export { CreeateColumn, DeleteColumn, PathIdColumn }

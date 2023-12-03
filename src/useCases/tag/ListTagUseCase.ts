import { prisma } from '../../lib/prisma'

class ListTagUseCase {
  async execute() {
    const tags = await prisma.tag.findMany()
    return tags
  }
}
export { ListTagUseCase }

import { prisma } from '../../lib/prisma'
interface ITagRequest {
  idCompany: string
  idTag: string
  name: string
}
class EditTagIUseCase {
  async execute({ idCompany, idTag, name }: ITagRequest) {
    const tag = await prisma.tag.findMany({
      where: {
        idCompany,
        idTag,
      },
    })
    if (!tag) {
      throw new Error('Tag not found')
    }
    const tagEdited = await prisma.tag.update({
      where: {
        idTag,
      },
      data: {
        name,
      },
    })
    return tagEdited
  }
}
export { EditTagIUseCase }

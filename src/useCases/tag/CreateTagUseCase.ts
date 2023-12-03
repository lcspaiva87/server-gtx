import { prisma } from '../../lib/prisma'

interface IUserRequest {
  name: string
  idCompany: string
}

class CreateTagUseCase {
  async execute({ name, idCompany }: IUserRequest) {
    const tagAlreadyExists = await prisma.tag.findMany({
      where: {
        name,
        idCompany,
      },
    })

    if (tagAlreadyExists) {
      throw new Error('tag already linked to the company')
    }
    const tag = await prisma.tag.create({
      data: {
        name,
        idCompany,
      },
    })
    return tag
  }
}
export { CreateTagUseCase }

import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma'

interface IUserRequest {
  name: string
  password: string
  username: string
}
class CreateUserUseCase {
  async execute({ name, password, username }: IUserRequest) {
    const userAlreadyExists = await prisma.user.findMany({
      where: {
        username,
      },
    })
    const hashedPassword = await bcrypt.hash(password, 10)
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    })
    return user
  }
}

export { CreateUserUseCase }

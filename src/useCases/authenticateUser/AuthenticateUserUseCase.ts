import { compare } from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'
const IRequestSchema = z.object({
  email: z.string().email(), // Garante que seja uma string de e-mail válida
  password: z.string(), // Garante que seja uma string
})
type IRequest = z.infer<typeof IRequestSchema>
class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    // Verificar se o usuário existe
    // Verificar se a senha está correta
    // Gerar token
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    // Verificar se o usuário existe
    if (!userAlreadyExists) {
      throw new Error('User or password incorrect!')
    }
    const passwordMatch = await compare(password, userAlreadyExists?.password)
    if (!passwordMatch) {
      throw new Error('User or password incorrect!')
    }
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(
      userAlreadyExists.idUser,
      userAlreadyExists,
    )
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.idUser,
      },
    })
    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.idUser,
    )
    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }

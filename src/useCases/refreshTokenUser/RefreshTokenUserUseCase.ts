import dayjs from 'dayjs'
import { prisma } from '../../lib/prisma'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

class RefreshTokenUserUseCase {
  async execute(refresh_Token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_Token,
      },
    })
    if (!refreshToken) {
      throw new Error('Refresh token invalid!')
    }
    if (!refreshToken.userId) {
      throw new Error('Refresh token invalid!')
    }
    let dataUser = null
    const user = await prisma.user.findFirst({
      where: {
        idUser: refreshToken.userId,
      },
    })
    if (!user) {
      throw new Error('Refresh token invalid!')
    } else {
      dataUser = user
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    )
    const generateRefreshToken = new GenerateTokenProvider()
    const token = await generateRefreshToken.execute(refreshToken.userId, user)
    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      })
      const generateRefreshToken = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshToken.execute(
        refreshToken.userId,
      )

      const { expiresIn, id } = newRefreshToken
      return { token, refreshToken: { expiresIn, token: id } }
    }

    return { token }
  }
}

export { RefreshTokenUserUseCase }

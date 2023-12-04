import dayJS from 'dayjs'
import { prisma } from '../lib/prisma'
class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayJS().add(1, 'day').unix()
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    })
    const {id:newRefreshToken, expiresIn:validad} =refreshToken
    return {newRefreshToken ,validad }
  }
}
export { GenerateRefreshToken }

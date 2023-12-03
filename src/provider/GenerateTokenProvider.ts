import { User } from '@prisma/client'
import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string, user: User) {
    const token = sign({ user }, '14308240-68e9-4821-a8a3-a6111f37e3df', {
      subject: userId,
      expiresIn: '50s',
    })

    return token
  }
}
export { GenerateTokenProvider }

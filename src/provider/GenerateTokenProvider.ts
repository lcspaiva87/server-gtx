import { User } from '@prisma/client'
import 'dotenv/config'
import { sign } from 'jsonwebtoken'
class GenerateTokenProvider {
  async execute(userId: string, user: User) {
    const token = sign({ user }, String(process.env.SECRET_TOKEN), {
      subject: userId,
      expiresIn: '10s',
    })

    return token
  }
}
export { GenerateTokenProvider }

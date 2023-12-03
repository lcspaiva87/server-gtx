import { z } from 'zod'

const typerefreshTokenUseCase = z.object({
  refresh_token: z.string(),
})

export { typerefreshTokenUseCase }

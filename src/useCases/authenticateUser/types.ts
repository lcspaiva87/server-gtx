import { z } from 'zod'

const typeRegisterUser = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(6).max(20),
  avatar: z
    .string()
    .url()
    .optional()
    .default(
      'https://ogimg.infoglobo.com.br/in/24907109-c86-bcf/FT1086A/avatar-a-lenda-de-aang.jpg',
    ),
})
const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})
export { UserLogin, typeRegisterUser }

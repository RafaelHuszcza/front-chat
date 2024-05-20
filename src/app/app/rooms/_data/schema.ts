import { z } from 'zod'

export const roomSchema = z.object({
  id: z.string(),
  subject: z.string(),
  ownerId: z.string(),
})

export type Room = z.infer<typeof roomSchema>

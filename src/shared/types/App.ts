import { z } from 'zod'

export const tableHeaderSchema = z.object({
  title: z.string(),
  key: z.string(),
})

export type TableHeader = z.infer<typeof tableHeaderSchema>

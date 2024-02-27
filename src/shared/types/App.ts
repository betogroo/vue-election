import { z } from 'zod'

export const tableHeaderSchema = z.object({
  title: z.string(),
  key: z.string(),
})

export const isPendingSchema = z.object({
  action: z.string().optional(),
  value: z.boolean().default(false),
})

export type TableHeader = z.infer<typeof tableHeaderSchema>
export type IsPending = z.infer<typeof isPendingSchema>

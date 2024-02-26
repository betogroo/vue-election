import { z } from 'zod'

import {
  FORM_REQUIRED as required_error,
  FORM_NUMBER_ONLY as form_number_only,
} from '@/config'

const requiredStringField = () => z.string({ required_error })

export const electionSchema = z.object({
  id: requiredStringField().uuid(),
  created_at: z.string(),
  date: requiredStringField(),
  name: requiredStringField(),
  description: requiredStringField(),
  uppercase: z.boolean().default(false),
  ready: z.boolean().default(false),
  organization: requiredStringField(),
  candidate_number_length: z
    .number({ invalid_type_error: form_number_only, required_error })
    .min(1, 'O número deve ser entre 1 e 5')
    .max(5, 'O número deve ser entre 1 e 5'),
})

export const electionSchemaList = z.array(electionSchema)

export const insertElectionSchema = electionSchema.omit({
  id: true,
  created_at: true,
})

export type Election = z.infer<typeof electionSchema>

export type ElectionInsert = z.infer<typeof insertElectionSchema>

import { z } from 'zod'

import {
  FORM_REQUIRED as required_error,
  FORM_NUMBER_ONLY as form_number_only,
} from '@/config'

const requiredStringField = () => z.string({ required_error })
const requiredMinStringField = (min: number) =>
  requiredStringField().min(min, `O campo deve ter no mínimo ${min} letras`)
const requiredUuidField = () => requiredStringField().uuid()

export const electionSchema = z.object({
  id: requiredUuidField(),
  created_at: z.string(),
  date: requiredStringField(),
  name: requiredMinStringField(5),
  description: requiredMinStringField(5),
  uppercase: z.boolean().default(false),
  ready: z.boolean().default(false),
  organization: requiredMinStringField(5),
  candidate_number_length: z
    .number({ invalid_type_error: form_number_only, required_error })
    .min(1, 'O número deve ser entre 1 e 5')
    .max(5, 'O número deve ser entre 1 e 5'),
})
export const electionSchemaInsert = electionSchema.omit({
  id: true,
  created_at: true,
})
export const electionSchemaList = z.array(electionSchema)

export type Election = z.infer<typeof electionSchema>

export type ElectionInsert = z.infer<typeof electionSchemaInsert>

export const candidateSchema = z.object({
  id: requiredUuidField(),
  created_at: z.string(),
  name: requiredMinStringField(5),
  avatar: z.string().url('Url inválida').default(''),
  candidate_number: z.string(),
  election_id: z.string(),
})
export const candidateSchemaInsert = candidateSchema.omit({
  id: true,
  created_at: true,
})

export const candidatesSchema = z.array(candidateSchema)

export type Candidate = z.infer<typeof candidateSchema>
export type CandidateInsert = z.infer<typeof candidateSchemaInsert>

export const ballotBoxSchema = z.object({
  id: requiredUuidField(),
  created_at: z.string(),
  site: requiredMinStringField(5),
  ready: z.nullable(z.string()).default(null),
  election_id: z.string(),
})

export const ballotBoxSchemaInsert = ballotBoxSchema.pick({
  site: true,
})

export type BallotBox = z.infer<typeof ballotBoxSchema>
export type BallotBoxInsert = z.infer<typeof ballotBoxSchemaInsert>

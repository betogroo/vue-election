<script setup lang="ts">
import { z } from 'zod'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { CandidateInsert, candidateSchemaInsert } from '../types/Election'

interface Props {
  election_id: string
}
const props = defineProps<Props>()

const $emit = defineEmits<{
  'handle-submit': [data: CandidateInsert]
}>()

const validationSchema = toTypedSchema(candidateSchemaInsert)
const { values, handleSubmit, meta, resetForm } = useForm<CandidateInsert>({
  validationSchema,
  initialValues: {
    election_id: props.election_id,
  },
})

const name = useField('name', validationSchema)
const candidate_number = useField('candidate_number', validationSchema)
const avatar = useField('avatar', validationSchema)

const onSubmit = handleSubmit(async () => {
  try {
    const parsedValues = candidateSchemaInsert.parse(values)
    $emit('handle-submit', parsedValues)
  } catch (err) {
    if (err instanceof z.ZodError) console.warn(err.issues)
  }
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="name.value.value"
          density="compact"
          :error-messages="name.errorMessage.value"
          label="Nome do Candidato"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="candidate_number.value.value"
          density="compact"
          :error-messages="candidate_number.errorMessage.value"
          label="Número do Candidato"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="avatar.value.value"
          density="compact"
          :error-messages="avatar.errorMessage.value"
          label="Avatar"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-right">
        <v-btn
          class="mr-3"
          color="warning"
          @click="resetForm"
          >Limpar</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!meta.valid"
          type="submit"
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

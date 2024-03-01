<script setup lang="ts">
import { ElectionInsert, electionSchemaInsert } from '../types/Election'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { IsPending } from '@/shared/types/App'

interface Props {
  isPending: IsPending
}
defineProps<Props>()

const $emit = defineEmits<{
  'handle-submit': [value: ElectionInsert]
}>()

const validationSchema = toTypedSchema(electionSchemaInsert)

const { values, handleSubmit, meta, resetForm } = useForm<ElectionInsert>({
  validationSchema,
})

const name = useField('name', validationSchema)
const date = useField('date', validationSchema)
const description = useField('description', validationSchema)
const organization = useField('organization', validationSchema)
const uppercase = useField('uppercase', validationSchema)
const candidate_number_length = useField(
  'candidate_number_length',
  validationSchema,
)

const onSubmit = handleSubmit(async () => {
  try {
    const parsedValues = electionSchemaInsert.parse(values)
    console.log(parsedValues)
    $emit('handle-submit', parsedValues)
  } catch (err) {
    if (err instanceof z.ZodError) console.warn(err.issues)
  }
})
</script>

<template>
  <v-form
    class="pa-1 ma-1"
    @submit.prevent="onSubmit"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="date.value.value"
          density="compact"
          :error-messages="date.errorMessage.value"
          label="Data da Eleição"
          type="date"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="name.value.value"
          density="compact"
          :error-messages="name.errorMessage.value"
          label="Titulo da Eleição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="description.value.value"
          density="compact"
          :error-messages="description.errorMessage.value"
          label="Descrição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="organization.value.value"
          density="compact"
          :error-messages="organization.errorMessage.value"
          label="Nome da Instituição"
          variant="outlined"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="candidate_number_length.value.value"
          density="compact"
          :error-messages="candidate_number_length.errorMessage.value"
          label="Dígitos"
          type="number"
          variant="outlined"
        />
      </v-col>
      <v-col cols="8">
        <v-switch
          v-model="uppercase.value.value"
          class="d-flex justify-center align-center"
          color="success"
          density="compact"
          hide-details
          label="Letras em Caixa Alta?"
        ></v-switch>
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
          :loading="isPending.action === 'add-election' && isPending.value"
          type="submit"
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

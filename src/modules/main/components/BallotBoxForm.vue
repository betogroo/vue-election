<script setup lang="ts">
import { z } from 'zod'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { BallotBoxInsert, ballotBoxSchemaInsert } from '../types/Election'

const $emit = defineEmits<{
  'handle-submit': [data: BallotBoxInsert]
}>()
const validationSchema = toTypedSchema(ballotBoxSchemaInsert)
const { values, handleSubmit, meta, resetForm } = useForm<BallotBoxInsert>({
  validationSchema,
})

const site = useField('site', validationSchema)

const onSubmit = handleSubmit(async () => {
  try {
    const parsedValues = ballotBoxSchemaInsert.parse(values)
    $emit('handle-submit', parsedValues)
  } catch (err) {
    if (err instanceof z.ZodError) console.warn(err.issues)
  }
})
</script>

<template>
  <v-form
    class="ma-1 pa-1"
    @submit.prevent="onSubmit"
  >
    <v-row>
      <v-col>
        <v-text-field
          v-model="site.value.value"
          density="compact"
          :error-messages="site.errorMessage.value"
          label="Local da Urna"
        ></v-text-field>
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

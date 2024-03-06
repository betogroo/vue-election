<script setup lang="ts">
import { CandidateInsert } from '../types/Election'
import { computed, ref } from 'vue'

interface Props {
  election_id: string
  //number_length: number
}
const props = defineProps<Props>()

const $emit = defineEmits<{
  'handle-submit': [data: CandidateInsert]
}>()

const number_length = ref(3)

const handleSubmit = () => {
  $emit('handle-submit', formData.value)
}
const resetForm = () => {
  formData.value = {
    name: '',
    candidate_number: '',
    election_id: props.election_id,
  }
}
const formData = ref<CandidateInsert>({
  name: '',
  candidate_number: '',
  election_id: props.election_id,
})

const formError = computed(() => {
  let name = ''
  let candidate_number = ''
  const name_error = !formData.value.name.length ? true : false
  const candidate_number_error =
    formData.value.candidate_number.length < number_length.value ? true : false
  if (name_error) name = 'Campo é Obrigatório'
  if (candidate_number_error) candidate_number = 'Campo é Obrigatório'

  return {
    name,
    name_error,
    candidate_number,
    candidate_number_error,
  }
})
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="formData.name"
          density="compact"
          :error-messages="formError.name"
          label="Nome do Candidato"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-list-item
          class="pa-1 mb-2"
          color="red"
          variant="plain"
        >
          <v-list-item-title
            :class="`text-${formError.candidate_number_error ? 'error' : 'black'}`"
            >Número do Candidato</v-list-item-title
          >
          <v-list-item-subtitle
            :class="`text-${formError.candidate_number_error ? 'error' : 'black'}`"
            >{{ formError.candidate_number }}</v-list-item-subtitle
          >
          <template #append>
            <v-otp-input
              v-model="formData.candidate_number"
              :error="formError.candidate_number ? true : false"
              label="Número do Candidato"
              :length="3"
              variant="outlined"
              width="200"
            ></v-otp-input>
          </template> </v-list-item
      ></v-col>
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
          :disabled="formError.name_error || formError.candidate_number_error"
          type="submit"
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-form>
</template>

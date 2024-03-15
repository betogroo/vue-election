<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElectionHeader, AppCardTitle } from '.'
import { Voter } from '../types/Election'
import { useHelpers } from '../composables'
interface Props {
  id: string
}
const props = defineProps<Props>()
const form = ref(false)
const voter_ra = ref<string>('')
const voter = ref<Voter | null>(null)
// passa\r para composable
const error = ref('')
const loading = ref(false)

import { useBallotBox, useElection, useVoters } from '../composables'
const { getBallotBox, ballotBox, setBallotBoxReady } = useBallotBox()
const { getElection, election } = useElection()
const { fetchAvailableVoters, availableVoters } = useVoters()

try {
  await getBallotBox(props.id)
  if (!ballotBox.value) throw new Error('Urna não encontrada')
  const election_id = ballotBox.value.election_id
  await Promise.all([getElection(election_id)])
} catch (err) {
  const e = err as Error
  console.log(e)
}
const newRelease = async () => {
  form.value = true
  await fetchAvailableVoters(ballotBox.value!.election_id)
}

const resetRelease = async () => {
  await setBallotBoxReady(ballotBox.value!.id, null)
  await fetchAvailableVoters(ballotBox.value!.election_id)
  voter_ra.value = ''
  form.value = false
  voter.value = null
}
const searchVoter = async () => {
  error.value = ''
  loading.value = true
  await useHelpers().delay()
  if (!voter_ra.value) voter.value = null

  const result =
    availableVoters.value.find((item) => item.ra === +voter_ra.value) || null
  loading.value = false
  if (!result) {
    error.value = 'Eleitor não encontrado!'
    voter_ra.value = ''
    return
  }
  voter.value = result
}
const releaseVote = async () => {
  await setBallotBoxReady(ballotBox.value!.id, voter.value!.id)
  await fetchAvailableVoters(ballotBox.value!.election_id)
}

watch(
  () => ballotBox.value!.ready,
  async (newValue) => {
    if (newValue === null) {
      await resetRelease()
    }
  },
)
</script>

<template>
  <v-container
    v-if="election"
    class="pa-2"
  >
    <v-card
      v-if="ballotBox"
      class="fill-height w-100 pa-4"
      :color="ballotBox.ready ? 'error' : 'success'"
      variant="outlined"
    >
      <AppCardTitle
        title="Monitoramento de Urna"
        :title-plus="ballotBox.site"
      />

      <template #prepend>
        <v-card-title>
          <ElectionHeader :election="election" />
        </v-card-title>
      </template>
      <template v-if="ballotBox.ready">
        <v-progress-circular
          color="error"
          indeterminate
        ></v-progress-circular>
        Aguarde o Candidato terminar seu voto
        <v-btn
          color="error"
          @click="resetRelease"
          >Cancelar</v-btn
        >
      </template>
      <template v-else>
        <v-btn
          block
          class="mb-3"
          color="success"
          :disabled="form"
          @click="newRelease"
          >Nova Liberação</v-btn
        >
        <v-sheet v-if="!voter && form">
          <v-form @submit.prevent="searchVoter">
            <v-text-field
              v-model="voter_ra"
              type="number"
            ></v-text-field>
            <v-btn
              :disabled="voter_ra.length < 8"
              :loading="loading"
              type="submit"
              >Pesquisar Eleitor</v-btn
            >
            <v-alert
              v-if="error"
              color="error"
              >{{ error }}</v-alert
            >
          </v-form>
        </v-sheet>
        <v-sheet v-if="voter">
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-h5">{{
                voter.name
              }}</v-list-item-title>
              <v-list-item-subtitle class="text-h6">{{
                voter.ra
              }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  class="mx-2"
                  color="success"
                  @click="releaseVote"
                  >Liberar</v-btn
                >
                <v-btn
                  class="mx-2"
                  color="error"
                  @click="resetRelease"
                >
                  Cancelar</v-btn
                >
              </template>
            </v-list-item>
          </v-list>
          <v-row>
            <v-col cols="12"></v-col>
            <v-col cols="12"></v-col>
          </v-row>
        </v-sheet>
      </template>
    </v-card>
  </v-container>
</template>

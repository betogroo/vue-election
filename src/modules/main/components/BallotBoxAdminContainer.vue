<script setup lang="ts">
import { watch } from 'vue'
import { ElectionHeader, AppCardTitle } from '.'
interface Props {
  id: string
}
const props = defineProps<Props>()

import { useBallotBox, useElection } from '../composables'
const { getBallotBox, ballotBox, setBallotBoxReady } = useBallotBox()
const { getElection, election } = useElection()

try {
  await getBallotBox(props.id)
  if (!ballotBox.value) throw new Error('Urna não encontrada')
  const election_id = ballotBox.value.election_id
  await Promise.all([getElection(election_id)])
} catch (err) {
  const e = err as Error
  console.log(e)
}
const resetRelease = async () => {
  await setBallotBoxReady(ballotBox.value!.id, null)
  // await fetchAvailableVoters(ballotBox.value.election_id)
  // voter_ra.value = ''
  // form.value = false
  // voter.value = null
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
      <template v-else>Liberar</template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ElectionHeader } from '.'
interface Props {
  id: string
}
const props = defineProps<Props>()

import { useBallotBox, useElection } from '../composables'
const { getBallotBox, ballotBox } = useBallotBox()
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
      <template #prepend>
        <v-card-title>
          <ElectionHeader :election="election" />
        </v-card-title>
      </template>
      <v-card-title
        ><h1 class="text-h4">
          {{ ballotBox.site }}
        </h1></v-card-title
      >
    </v-card>
  </v-container>
</template>

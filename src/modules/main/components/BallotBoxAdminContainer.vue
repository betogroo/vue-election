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
  <v-container v-if="election">
    <ElectionHeader :election="election" />
  </v-container>
  <div>{{ ballotBox }}</div>
  <div>{{ election }}</div>
</template>

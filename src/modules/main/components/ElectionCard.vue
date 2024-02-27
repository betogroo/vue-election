<script setup lang="ts">
import { useElection } from '../composables'

interface Props {
  id: string
}
const props = defineProps<Props>()

const { getElection, election } = useElection()
await getElection(props.id)
</script>

<template>
  <v-container v-if="election">
    <h1 class="d-flex">
      <div class="text-h6">{{ election.name }}</div>
      <div class="text-h6 font-weight-light">- {{ election.organization }}</div>
    </h1>
    <h2 class="text-subtitle-2">
      {{ election.description }}
    </h2>
    <h2 class="text-body-1">{{ election.date }}</h2>
  </v-container>
</template>

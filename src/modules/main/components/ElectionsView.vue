<script setup lang="ts">
import { useElection } from '../composables'
const { elections, fetchElections } = useElection()

await fetchElections()
</script>

<template>
  <div
    v-for="election in elections"
    :key="election.id"
  >
    {{ election.name }}
  </div>
</template>

<script setup lang="ts">
import { useHelpers } from '../composables'
import { Election } from '../types/Election'

interface Props {
  election: Election
}
defineProps<Props>()
</script>

<template>
  <h1 class="d-flex">
    <div class="text-h6">{{ election.name }}</div>
    <div class="text-h6 font-weight-light">- {{ election.organization }}</div>
  </h1>
  <h2 class="text-subtitle-2">
    {{ election.description }}
  </h2>
  <h2 class="text-body-1">
    eleição em {{ useHelpers().dateBr(election.date, 'long') }}
  </h2>
</template>

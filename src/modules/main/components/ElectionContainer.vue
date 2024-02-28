<script setup lang="ts">
import { useElection } from '../composables'
import { ElectionCard, AppGenericTable } from '.'

interface Props {
  id: string
}
const props = defineProps<Props>()

const ready = () => {
  return Math.random() < 0.5 ? true : false
}

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
  <v-container>
    <h1 class="text-h5">Urnas</h1>
    <div class="d-flex flex-wrap align-center justify-center">
      <ElectionCard
        v-for="item in 4"
        :id="item"
        :key="item"
        :is-ready="ready()"
        max-width="500"
      />
    </div>
  </v-container>
  <v-container>
    <h1 class="text-h5">Candidatos</h1>
  </v-container>
</template>

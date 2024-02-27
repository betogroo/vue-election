<script setup lang="ts">
import { useElection } from '../composables'
import { AppGenericTable } from '../components'
const { elections, fetchElections, electionTableHeader } = useElection()

await fetchElections()
</script>

<template>
  <AppGenericTable
    aim-view="HomeView"
    :headers="electionTableHeader"
    :table-data="elections"
    title="Eleições Cadastradas"
  >
  </AppGenericTable>
</template>

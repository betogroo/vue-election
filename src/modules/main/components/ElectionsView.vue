<script setup lang="ts">
import { useElection } from '../composables'
import { AppGenericTable, ElectionForm } from '../components'
const {
  elections,
  deleteElection,
  fetchElections,
  electionTableHeader,
  addElection,
  addElectionDialog,
  isPending,
} = useElection()

await fetchElections()
</script>

<template>
  <AppGenericTable
    v-model="addElectionDialog"
    aim-view="ElectionView"
    :delete-pending="isPending.action === 'delete-pending' && isPending.value"
    :headers="electionTableHeader"
    :table-data="elections"
    table-subject="Eleição"
    title="Eleições Cadastradas"
    @delete-item-confirm="(id) => deleteElection(id)"
  >
    <template #addForm
      ><ElectionForm
        :is-pending="isPending"
        @handle-submit="(election) => addElection(election)"
    /></template>
  </AppGenericTable>
</template>

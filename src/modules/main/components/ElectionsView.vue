<script setup lang="ts">
import { useElection } from '../composables'
import { AppGenericTable, ElectionForm } from '../components'
import { ElectionInsert } from '../types/Election'
const {
  elections,
  fetchElections,
  electionTableHeader,
  addElection: _addElection,
  addElectionDialog,
  isPending,
} = useElection()

const addElection = async (election: ElectionInsert) => {
  try {
    await _addElection(election)
    await fetchElections()
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}

await fetchElections()
</script>

<template>
  <AppGenericTable
    v-model="addElectionDialog"
    aim-view="ElectionView"
    :headers="electionTableHeader"
    :table-data="elections"
    title="Eleições Cadastradas"
  >
    <template #addForm
      ><ElectionForm
        :is-pending="isPending"
        @handle-submit="(election) => addElection(election)"
    /></template>
  </AppGenericTable>
</template>

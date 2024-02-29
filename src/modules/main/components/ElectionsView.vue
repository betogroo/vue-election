<script setup lang="ts">
import { useElection } from '../composables'
import { AppGenericTable, ElectionForm } from '../components'
import { ElectionInsert } from '../types/Election'
const {
  elections,
  deleteElection: _deleteElection,
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
const deleteElection = async (id: string) => {
  try {
    await _deleteElection(id)
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

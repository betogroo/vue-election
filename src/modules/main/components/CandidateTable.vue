<script setup lang="ts">
import { TableHeader } from '@/shared/types/App'
import { AppGenericTable } from '.'
import { Candidate } from '../types/Election'

interface Props {
  candidates: Candidate[]
  tableHeader: TableHeader[]
}
defineProps<Props>()
</script>

<template>
  <AppGenericTable
    :headers="tableHeader"
    :table-data="candidates"
    table-subject="Candidato"
    title="Candidatos"
  />
</template>

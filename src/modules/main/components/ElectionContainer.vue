<script setup lang="ts">
import { useElection, useCandidates } from '../composables'
import { BallotBoxCard, CandidateTable } from '.'

interface Props {
  id: string
}
const props = defineProps<Props>()

const ready = () => {
  return Math.random() < 0.5 ? true : false
}

const { getElection, election } = useElection()
const {
  closeAddDialog,
  addDialog,
  fetchCandidates,
  candidates,
  tableHeader: candidatesTableHeader,
} = useCandidates()
await getElection(props.id)
await fetchCandidates(props.id)
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
    <v-sheet class="d-flex align-center justify-space-between">
      <h1 class="text-h5">Urnas</h1>

      <v-dialog
        v-model="addDialog"
        max-width="500px"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="success"
            prepend-icon="mdi-plus-thick"
            variant="outlined"
            v-bind="props"
          >
            Cadastrar {{ `Urna` }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Cadastrar {{ `Urna` }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <slot name="addForm"></slot>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              block
              color="warning"
              variant="outlined"
              @click="closeAddDialog"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
    <div class="d-flex flex-wrap align-center justify-center">
      <BallotBoxCard
        v-for="item in 4"
        :id="item"
        :key="item"
        :is-ready="ready()"
        max-width="420"
      />
    </div>
  </v-container>
  <v-container>
    <CandidateTable
      :candidates="candidates"
      :table-header="candidatesTableHeader"
    />
  </v-container>
</template>

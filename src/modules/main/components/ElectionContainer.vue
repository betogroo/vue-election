<script setup lang="ts">
import {
  useElection,
  useCandidates,
  useBallotBox,
  useHelpers,
} from '../composables'
import { BallotBoxCard, BallotBoxForm, AppGenericTable, CandidateForm } from '.'

interface Props {
  id: string
}
const props = defineProps<Props>()

const ready = () => {
  return Math.random() < 0.5 ? true : false
}

const { getElection, election } = useElection()
const {
  //closeFormDialog: candidateCloseFormDialog,
  formDialog: candidateFormDialog,
  fetchCandidates,
  addCandidate,
  deleteCandidate: _deleteCandidate,
  candidates,
  tableHeader: candidatesTableHeader,
} = useCandidates()
const {
  ballotBoxList,
  addBallotBox,
  formDialog: ballotBoxFormDialog,
  closeFormDialog: ballotBoxCloseFormDialog,
  fetchBallotBox,
  setBallotBoxReady: _disableBallotBox,
} = useBallotBox()

const deleteCandidate = async (id: string) => {
  try {
    await _deleteCandidate(id)
  } catch (err) {
    const e = err as Error
    console.error(e)
  }
}
const disableBallotBox = async (ballot_box_id: string) => {
  await _disableBallotBox(ballot_box_id, null)
}

await getElection(props.id)
await fetchCandidates(props.id)
await fetchBallotBox(props.id)
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
    <h2 class="text-body-1">
      eleição em {{ useHelpers().dateBr(election.date, 'long') }}
    </h2>
  </v-container>
  <v-container>
    <v-toolbar color="transparent">
      <template #title><h1 class="text-h5">Urnas</h1></template>
      <template #append>
        <v-dialog
          v-model="ballotBoxFormDialog"
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
                <slot name="addForm"
                  ><BallotBoxForm
                    :election_id="id"
                    @handle-submit="(data) => addBallotBox(data)"
                /></slot>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                block
                color="warning"
                variant="outlined"
                @click="ballotBoxCloseFormDialog"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-toolbar>
    <div class="d-flex flex-wrap align-center justify-center">
      <BallotBoxCard
        v-for="item in ballotBoxList"
        :key="item.id"
        :ballot-box="item"
        :is-ready="ready()"
        @handle-disable="(ballot_box_id) => disableBallotBox(ballot_box_id)"
      />
    </div>
  </v-container>
  <v-container v-if="election">
    <AppGenericTable
      v-model="candidateFormDialog"
      :headers="candidatesTableHeader"
      :table-data="candidates"
      table-subject="Candidato"
      title="Candidatos"
      @delete-item-confirm="(id) => deleteCandidate(id)"
    >
      <template #addForm
        ><CandidateForm
          :election_id="id"
          :number_length="election.candidate_number_length"
          @handle-submit="(candidate) => addCandidate(candidate)" /></template
    ></AppGenericTable>
  </v-container>
</template>

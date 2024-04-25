<script setup lang="ts">
import {
  BallotBoxHeader,
  BallotBoxDisplayEnd,
  BallotBoxNumericKeyboard,
  BallotBoxNumericDisplay,
  BallotBoxCandidateDisplay,
  BallotBoxActionKeyboard,
} from './'
import {
  useBallotBox,
  useElection,
  useCandidates,
  useVoters,
  useVote,
} from '../../composables'
import { computed, watch } from 'vue'
import { Vote } from '../../types/Election'
interface Props {
  id: string
}
const props = defineProps<Props>()

const {
  getBallotBox,
  ballotBox,
  numericDisplay,
  updateDisplay,
  resetDisplay,
  setBallotBoxReady,
} = useBallotBox()
const { getElection, election } = useElection()
const { fetchCandidates, candidates, selectedCandidate } = useCandidates()
const { fetchVoters, fetchAvailableVoters, voters, availableVoters } =
  useVoters()
const { addVote } = useVote()

const confirmVote = async () => {
  if (!election.value!.id || !selectedCandidate.value!.id) return
  const vote: Vote = {
    voter_id: ballotBox.value?.ready,
    election_id: election.value!.id,
    ballot_box_id: ballotBox.value!.id,
    candidate_id: selectedCandidate.value!.id,
  }
  const recordedVote = await addVote(vote)
  if (recordedVote) await setBallotBoxReady(ballotBox.value!.id, null)
  console.log(vote)
}

try {
  await getBallotBox(props.id)
  if (!ballotBox.value) throw new Error('Urna não encontrada')
  const election_id = ballotBox.value.election_id
  await Promise.all([
    fetchCandidates(election_id),
    getElection(election_id),
    fetchVoters(),
    fetchAvailableVoters(election_id),
  ])
} catch (err) {
  const e = err as Error
  console.log(e)
}

watch(
  () => numericDisplay.value,
  (newValue) => {
    selectedCandidate.value = undefined
    if (newValue.length === election.value.candidate_number_length) {
      console.log('vai setar o selectCandidate')
      selectedCandidate.value = candidates.value.find(
        (candidate) => candidate.candidate_number === numericDisplay.value,
      )
    }
  },
)

const candidateCard = computed<boolean>(() => {
  return numericDisplay.value.length === election.value.candidate_number_length
})
</script>

<template>
  <v-container>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col cols="12">
        <BallotBoxHeader
          v-if="election"
          :organization="election.organization"
          :uppercase="election.uppercase"
        />
      </v-col>
      <v-col
        class="text-center d-flex align-center justify-center"
        cols="12"
        sm="8 "
      >
        <template v-if="!ballotBox?.ready">
          <BallotBoxDisplayEnd />
        </template>
        <template v-else>
          <h1>
            <BallotBoxNumericDisplay
              :content="numericDisplay"
              :length="election?.candidate_number_length"
            />
          </h1>
          <BallotBoxCandidateDisplay
            :candidate="selectedCandidate"
            :visible="candidateCard"
          />
          <BallotBoxNumericKeyboard
            :keyboard-disabled="candidateCard || !ballotBox.ready"
            @handle-click="updateDisplay"
          />
          <BallotBoxActionKeyboard
            :confirm-disabled="
              !candidateCard || selectedCandidate === undefined
            "
            :reset-disabled="!numericDisplay.length"
            @handle-confirm="confirmVote"
            @handle-reset="resetDisplay"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
  <div>Urna número {{ id }} {{ ballotBox }} da eleição. {{ election }}</div>
  <v-divider></v-divider>
  <div>
    <v-list>
      <v-list-item
        v-for="candidate in candidates"
        :key="candidate.id"
        >{{ candidate.name }}</v-list-item
      >
    </v-list>
  </div>
  <v-divider></v-divider>
  <v-row>
    <v-col cols="6">
      <v-list>
        <v-list-item
          v-for="voter in voters"
          :key="voter.id"
          >{{ voter.name }}</v-list-item
        >
      </v-list>
    </v-col>
    <v-col cols="6">
      <v-list>
        <v-list-item
          v-for="voter in availableVoters"
          :key="voter.id + 'a'"
          >{{ voter.name }}</v-list-item
        >
      </v-list>
    </v-col>
  </v-row>
</template>

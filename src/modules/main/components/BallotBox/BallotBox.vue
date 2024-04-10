<script setup lang="ts">
import {
  BallotBoxHeader,
  BallotBoxDisplayEnd,
  BallotBoxNumericKeyboard,
  BallotBoxNumericDisplay,
  BallotBoxActionKeyboard,
} from './'
import {
  useBallotBox,
  useElection,
  useCandidates,
  useVoters,
} from '../../composables'
interface Props {
  id: string
}
const props = defineProps<Props>()

const { getBallotBox, ballotBox, numericDisplay, updateDisplay, resetDisplay } =
  useBallotBox()
const { getElection, election } = useElection()
const { fetchCandidates, candidates } = useCandidates()
const { fetchVoters, fetchAvailableVoters, voters, availableVoters } =
  useVoters()

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
          <h1><BallotBoxNumericDisplay :content="numericDisplay" /></h1>
          <BallotBoxNumericKeyboard
            :keyboard-disabled="false"
            @handle-click="updateDisplay"
          />
          <BallotBoxActionKeyboard @handle-reset="resetDisplay" />
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

<script setup lang="ts">
import type { BallotBox } from '../types/Election'
interface Props {
  ballotBox: BallotBox
}
defineProps<Props>()

const $emit = defineEmits<{
  'handle-disable': [ballot_box_id: string | number]
}>()

const handleDisable = (ballot_box_id: string | number) => {
  console.log('vai desabilitar a urna', ballot_box_id)
  $emit('handle-disable', ballot_box_id)
}
const handleEnable = (ballot_box_id: string | number) => {
  console.log('vai habilitar a urna', ballot_box_id)
}
const handleMonitoring = (ballot_box_id: string | number) => {
  console.log('vai vai monitorar a urna', ballot_box_id)
}
</script>

<template>
  <v-responsive class="mx-2 my-1">
    <v-card
      class="rounded-xl"
      :color="ballotBox.ready ? 'red' : 'green'"
      :loading="ballotBox.ready ? true : false"
      variant="tonal"
    >
      <template #loader="{ isActive }"
        ><v-progress-linear
          v-if="isActive"
          color="green"
          height="4"
          indeterminate
        ></v-progress-linear
      ></template>
      <template #title>
        <v-list-item
          class="pa-0"
          nav
          :subtitle="ballotBox.ready ? 'Em votação' : 'Disponível'"
          :title="ballotBox.site"
          :to="{ name: 'BallotBoxView', params: { id: ballotBox.id } }"
        >
          <template v-slot:prepend>
            <v-avatar :color="ballotBox.ready ? 'error' : 'success'">
              <v-icon color="white">{{
                !ballotBox.ready ? 'mdi-cancel' : 'mdi-check'
              }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn
              icon="mdi-redo"
              variant="text"
            ></v-btn>
          </template>
        </v-list-item>
      </template>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="handleMonitoring(ballotBox.id)">Monitorar</v-btn>
        <v-btn
          v-if="ballotBox.ready"
          @click="handleDisable(ballotBox.id)"
          >Desabilitar</v-btn
        >
        <v-btn
          v-else
          @click="handleEnable(ballotBox.id)"
          >Habilitar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

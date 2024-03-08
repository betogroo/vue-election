<script setup lang="ts">
import { computed } from 'vue'
import type { BallotBox } from '../types/Election'
interface Props {
  ballotBox: BallotBox
}
const props = defineProps<Props>()

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

const successColor = 'success'
const errorColor = 'error'
const color = computed(() =>
  props.ballotBox.ready ? errorColor : successColor,
)
const loading = computed(() => (props.ballotBox.ready ? true : false))
const icon = computed(() =>
  props.ballotBox.ready ? 'mdi-cancel' : 'mdi-check',
)
const readyText = computed(() =>
  props.ballotBox.ready ? 'Em votação' : 'Disponível',
)
</script>

<template>
  <v-responsive class="mx-2 my-1">
    <v-card
      class="rounded-xl"
      :color="color"
      :loading="loading"
      variant="tonal"
    >
      <template #loader="{ isActive }"
        ><v-progress-linear
          v-if="isActive"
          :color="successColor"
          height="4"
          indeterminate
        ></v-progress-linear
      ></template>
      <template #title>
        <v-list-item
          class="pa-0"
          nav
          :subtitle="readyText"
          :title="ballotBox.site"
          :to="{ name: 'BallotBoxView', params: { id: ballotBox.id } }"
        >
          <template v-slot:prepend>
            <v-avatar :color="color">
              <v-icon color="white">{{ icon }}</v-icon>
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

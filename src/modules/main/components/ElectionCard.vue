<script setup lang="ts">
interface Props {
  id: string | number
  isReady: boolean
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
const goToBallotBox = (ballot_box_id: string | number) => {
  console.log('Abre a urna ', ballot_box_id)
}
</script>

<template>
  <v-responsive class="mx-2 my-1">
    <v-card
      class="rounded-xl"
      :color="!isReady ? 'red' : 'green'"
      :loading="!isReady"
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
        <div class="d-flex justify-space-between align-center">
          <div>
            <span class="text-h6">Urna {{ id }}</span>
            <span class="text-subtitle-1">
              ({{ `${!isReady ? 'Em votação' : 'Disponível'}` }})</span
            >
          </div>
          <div>
            <v-btn
              icon
              variant="text"
              @click="goToBallotBox(id)"
            >
              <v-icon>mdi-redo</v-icon>
            </v-btn>
          </div>
        </div>
      </template>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="handleMonitoring(id)">Monitorar</v-btn>
        <v-btn
          v-if="!isReady"
          @click="handleDisable(id)"
          >Desabilitar</v-btn
        >
        <v-btn
          v-else
          @click="handleEnable(id)"
          >Habilitar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-responsive>
</template>

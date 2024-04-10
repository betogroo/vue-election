<script setup lang="ts">
interface Props {
  confirmDisabled?: boolean
  resetDisabled?: boolean
}
withDefaults(defineProps<Props>(), {
  confirmDisabled: false,
  resetDisabled: false,
})

const $emit = defineEmits<{
  'handle-reset': []
  'handle-confirm': []
}>()
const handleReset = () => {
  $emit('handle-reset')
}
const handleConfirm = () => {
  $emit('handle-confirm')
}
</script>

<template>
  <v-card
    max-width="300"
    variant="text"
  >
    <v-card-text>
      <v-row class="text-center">
        <v-col cols="6">
          <v-btn
            color="warning"
            :disabled="resetDisabled"
            @click.prevent="handleReset"
            >Corrige</v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn
            color="success"
            :disabled="confirmDisabled"
            @click.prevent="handleConfirm"
            >Confirma</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

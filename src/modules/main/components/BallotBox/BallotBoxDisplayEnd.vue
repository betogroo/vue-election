<script setup lang="ts">
import { useInterval } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
const { counter: loading, pause } = useInterval(5, { controls: true })
const end = ref(false)

watchEffect(() => {
  if (loading.value >= 120) {
    pause()
    end.value = true
  }
})
</script>

<template>
  <v-sheet
    v-if="!end"
    class="d-flex flex-column"
    width="500"
  >
    <v-progress-linear
      v-model="loading"
      color="success"
      height="25"
      max="100"
    ></v-progress-linear>
    <div>Gravando</div>
  </v-sheet>
  <div v-else>
    <h1 class="text-h1">FIM</h1>
  </div>
</template>

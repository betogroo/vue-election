<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  length?: number
  content?: string
  label?: string
}
const props = withDefaults(defineProps<Props>(), {
  length: 3,
  label: undefined,
  content: '',
})

const display = computed(() => {
  return props.content?.split('')
})
</script>

<template>
  <v-row
    align="center"
    justify="start"
    no-gutters
  >
    <v-col
      v-if="label"
      sm="3"
    >
      <h4>{{ label }}:</h4>
    </v-col>
    <v-col>
      <div class="d-flex align-center">
        <v-sheet
          v-for="i in length"
          :key="i"
          class="d-flex align-center justify-center pa-1 ma-1 display-border"
          :height="50"
          :width="50"
          ><h3>{{ display![i - 1] }}</h3></v-sheet
        >
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.display-border {
  border: 2px solid;
}
</style>

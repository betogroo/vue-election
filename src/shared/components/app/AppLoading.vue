<script setup lang="ts">
const overlay = true
</script>

<template>
  <v-overlay
    class="align-center justify-center"
    :model-value="overlay"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

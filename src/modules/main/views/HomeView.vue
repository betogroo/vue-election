<script setup lang="ts">
import { ElectionsView, AppLoading } from '../components'
</script>
<template>
  <Suspense>
    <v-container class="d-flex justify-center fill-height">
      <v-responsive
        class="text-center"
        max-width="600"
      >
        <h1 class="text-center text-h3">LISTA DAS ELEIÇÕES</h1>
        <ElectionsView />
      </v-responsive>
    </v-container>
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

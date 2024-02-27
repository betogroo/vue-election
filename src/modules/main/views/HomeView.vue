<script setup lang="ts">
import { ElectionsView, AppLoading } from '../components'
</script>
<template>
  <Suspense>
    <v-container>
      <ElectionsView />
    </v-container>
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

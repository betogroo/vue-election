<script setup lang="ts">
import { ElectionsView, AppLoading } from '../components'
</script>
<template>
  <Suspense>
    <ElectionsView />
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

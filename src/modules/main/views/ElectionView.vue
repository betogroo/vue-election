<script setup lang="ts">
import { ElectionContainer, AppLoading } from '../components'
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <Suspense>
    <ElectionContainer :id="id" />
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

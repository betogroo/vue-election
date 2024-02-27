<script setup lang="ts">
import { ElectionCard, AppLoading } from '../components'
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <Suspense>
    <ElectionCard :id="id" />
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

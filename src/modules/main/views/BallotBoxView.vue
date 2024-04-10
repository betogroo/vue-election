<script setup lang="ts">
import { BallotBox, AppLoading } from '../components'
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <Suspense>
    <BallotBox :id="id" />
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

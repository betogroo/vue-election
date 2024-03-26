<script setup lang="ts">
import { BallotBoxAdminContainer, AppLoading } from '../components'
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <Suspense>
    <BallotBoxAdminContainer :id="id" />
    <template #fallback><AppLoading /></template>
  </Suspense>
</template>

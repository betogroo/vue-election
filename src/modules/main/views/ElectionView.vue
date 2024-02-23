<script setup lang="ts">
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <h2>Eleição número: {{ id }}</h2>
</template>

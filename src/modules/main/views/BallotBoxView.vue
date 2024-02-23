<script setup lang="ts">
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <h1>Aqui é a urna {{ id }} pronta para o voto</h1>
</template>

<script setup lang="ts">
interface Props {
  id: string
}
defineProps<Props>()
</script>

<template>
  <h1>Aqui é a urna {{ id }} em sua página de administração</h1>
</template>

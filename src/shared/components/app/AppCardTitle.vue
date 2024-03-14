<script setup lang="ts">
interface Props {
  title: string
  titlePlus: string
}
defineProps<Props>()
</script>

<template>
  <v-card-title>
    <div class="d-sm-inline text-h6">{{ title }}</div>
    <div class="d-none d-sm-inline">&nbsp;</div>
    <div class="d-block d-sm-inline text-h6 font-weight-light">
      {{ titlePlus }}
    </div>
  </v-card-title>
</template>

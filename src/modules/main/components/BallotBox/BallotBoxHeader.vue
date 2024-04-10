<script setup lang="ts">
interface Props {
  uppercase?: boolean
  organization: string
}
withDefaults(defineProps<Props>(), {
  uppercase: false,
})
</script>

<template>
  <v-sheet
    class="text-h4 text-center"
    :class="uppercase ? 'text-uppercase' : ''"
    >{{ organization }}</v-sheet
  >
</template>

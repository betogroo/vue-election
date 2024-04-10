<script setup lang="ts">
interface Props {
  value: number | string
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: 'black',
})

const $emit = defineEmits<{
  handleClick: [value: number | string]
}>()

const handleClick = () => {
  $emit('handleClick', props.value)
}
</script>

<template>
  <v-btn
    :color="color"
    density="comfortable"
    :ripple="false"
    size="x-small"
    stacked
    @click.prevent="handleClick"
  >
    <template #default>
      <h1 class="text-h4">{{ value }}</h1>
    </template>
  </v-btn>
</template>

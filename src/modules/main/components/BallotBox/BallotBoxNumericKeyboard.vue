<script setup lang="ts">
import { AppNumericBtn } from '@/shared/components'

interface Props {
  keyboardDisabled: boolean
}
withDefaults(defineProps<Props>(), {
  keyboardDisabled: false,
})

const $emit = defineEmits<{
  'handle-click': [value: number | string]
}>()

const handleClick = (value: number | string) => {
  $emit('handle-click', value)
}
</script>

<template>
  <v-card
    class="mt-2 ml-1 rounded-xl"
    :disabled="keyboardDisabled"
    max-width="300"
    :ripple="false"
    variant="text"
  >
    <v-card-text class="text-center">
      <v-row>
        <v-col cols="4"
          ><AppNumericBtn
            :value="7"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="8"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="9"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="4"
          ><AppNumericBtn
            :value="4"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="5"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="6"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="4"
          ><AppNumericBtn
            :value="1"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="2"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
        <v-col cols="4"
          ><AppNumericBtn
            :value="3"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
      <v-row>
        <v-col
          ><AppNumericBtn
            :value="0"
            @handle-click="(value) => handleClick(value)"
        /></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

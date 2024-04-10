<script setup lang="ts">
import type { Candidate } from '../../types/Election'
interface Props {
  visible: boolean
  candidate: Candidate | undefined
}
withDefaults(defineProps<Props>(), {
  visible: false,
})
</script>

<template>
  <v-row
    align="center"
    :style="{ visibility: visible ? 'visible' : 'hidden' }"
  >
    <v-col sm="3"><h4>Nome:</h4></v-col>
    <v-col>
      <h5>{{ candidate ? candidate.name : 'Candidato não encontrado' }}</h5>
    </v-col>
    <v-col sm="3">
      <v-avatar
        v-if="candidate"
        color="grey"
        rounded="xl"
        size="100"
        variant="outlined"
      >
        <v-img
          cover
          :src="candidate.avatar"
        ></v-img> </v-avatar
    ></v-col>
  </v-row>
</template>

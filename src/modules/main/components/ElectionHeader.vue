<script setup lang="ts">
import { useHelpers } from '../composables'
import { Election } from '../types/Election'

interface Props {
  election: Election
}
defineProps<Props>()
</script>

<template>
  <v-card variant="text">
    <v-card-title>
      <div class="d-block d-sm-inline text-h6">{{ election.name }}:</div>
      <div class="d-none d-sm-inline">&nbsp;</div>
      <div class="d-block d-sm-inline text-h6 font-weight-light">
        {{ election.organization }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      <h2 class="text-subtitle-2">
        {{ election.description }}
      </h2>
      <h2 class="text-body-1">
        Eleição em {{ useHelpers().dateBr(election.date, 'long') }}
      </h2>
    </v-card-subtitle>
  </v-card>
</template>

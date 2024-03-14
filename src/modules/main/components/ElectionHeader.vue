<script setup lang="ts">
import { AppCardTitle } from '.'
import { useHelpers } from '../composables'
import { Election } from '../types/Election'

interface Props {
  election: Election
}
defineProps<Props>()
</script>

<template>
  <v-card variant="text">
    <AppCardTitle
      :title="election.name"
      :title-plus="election.organization"
    />
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

<script setup lang="ts">
import { version as vuetifyVersion } from 'vuetify'
import { version as vueVersion } from 'vue'
import { APP_TITLE } from '@/config'
const appVersion = __APP_VERSION__
const appName = __APP_NAME__
const displayName = APP_TITLE
</script>

<template>
  <v-row justify="center">
    <v-col
      class="d-flex flex-column"
      cols="12"
    >
      <h5>{{ displayName }}</h5>
      <h6>{{ appName }}</h6>
      <div>
        <v-img
          max-height="250"
          src="@/assets/logo.png"
        />
      </div>
      <div>{{ appVersion }}</div>
    </v-col>
    <v-col
      class="d-flex flex-column"
      cols="6"
    >
      <div>
        <v-img
          max-height="150"
          src="@/assets/logo_vue.svg"
        />
      </div>
      <div>{{ vueVersion }}</div>
    </v-col>
    <v-col
      class="d-flex flex-column"
      cols="6"
    >
      <div>
        <v-img
          max-height="160"
          src="@/assets/logo_vuetify.svg"
        />
      </div>
      <div>{{ vuetifyVersion }}</div>
    </v-col>
  </v-row>
</template>

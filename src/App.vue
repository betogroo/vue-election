<script setup lang="ts">
import { useAuthStore } from './modules/auth/store/useAuthStore'
import { AppBar, AppLoading } from '@/shared/components'
import { useAuth } from './modules/auth/composables'
import { useRoute, useRouter } from 'vue-router'
const { isPending, logout } = useAuth()
const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const handleLogout = async () => {
  await logout().then(() => {
    router.push({ name: 'LoginView' })
  })
}
</script>
<template>
  <v-app>
    <Suspense>
      <AppBar
        v-if="!route.meta.hideAppBar"
        :is-pending="isPending === 'logout'"
        :user="store.user"
        @logout="handleLogout"
      />
      <template #fallback><AppLoading /></template>
    </Suspense>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<template>
  <div>Logger dig ind…</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '../../modules/auth/store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string

  if (!code) {
    console.error('Manglende kode fra Google')
    router.push('/login')
    return
  }

  try {
    await auth.handleCallback(code)
    router.replace('/sheets')
  } catch (err) {
    console.error('Login-fejl:', err)
    auth.logout()
    router.push('/login')
  }
})
</script>

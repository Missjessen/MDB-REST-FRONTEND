<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-1">
          <RouterLink to="/" class="text-xl font-bold text-teal-600 dark:text-teal-300">
            WomBat
          </RouterLink>
        </div>

        <!-- Navigation links -->
        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Main navigation" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li><RouterLink to="/about" class="text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">About</RouterLink></li>
              <li><RouterLink to="/sheets" class="text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Sheets</RouterLink></li>
              <li><RouterLink to="/projects" class="text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Projects</RouterLink></li>
            </ul>
          </nav>

          <!-- Profile / Login -->
          <div class="ml-6 relative" ref="dropdownRef">
            <!-- If logged in -->
            <div v-if="auth.isLoggedIn">
              <button
                type="button"
                @click="toggleDropdown"
                class="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
              >
                <span class="sr-only">Open profile menu</span>
                <img
                  :src="auth.user?.picture"
                  :alt="auth.user?.name"
                  class="w-10 h-10 object-cover rounded-full"
                />
              </button>

              <!-- Dropdown -->
              <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
                role="menu"
              >
                <div class="p-2">
                  <p class="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-white">
                    {{ auth.user?.name }}
                  </p>
                  <RouterLink to="/profile" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">My profile</RouterLink>
                  <RouterLink to="/settings" class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Settings</RouterLink>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600/10 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <!-- If NOT logged in -->
            <div v-else>
              <button
                @click="auth.login"
                class="text-sm font-medium text-blue-600 hover:underline"
              >
                Login med Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../modules/auth/store'
import { RouterLink } from 'vue-router'


export default defineComponent({
  name: 'NavBar',
  components: { RouterLink },
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const showDropdown = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        showDropdown.value = false
      }
    }

    const handleLogout = async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
      } catch (err) {
        console.warn('Fejl under backend logout:', err)
      }

      auth.logout()
      router.push('/login')
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      auth,
      showDropdown,
      toggleDropdown,
      dropdownRef,
      handleLogout
    }
  }
})
</script>
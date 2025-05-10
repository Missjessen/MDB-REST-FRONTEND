<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
    
  <img src="/src/assets/img/wombat3.png" class="absolute top-0 left-0 min-h-full ob" alt="">
  
  <div class="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
   
    <div class="login-page">
    <h1>Velkommen til Sheets-portalen</h1>
    <button @click="login">Login med Google</button>

  </div>
  <button
  type="button"
  data-twe-ripple-init
  data-twe-ripple-color="light"
  class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
  Click me
</button>
  </div>
</div>






   



</template>

<script setup lang="ts">
import { AuthService } from '../../modules/auth/services/AuthService'

const auth = new AuthService()
function login() {
  // send brugeren til din backend, som redirect’er videre til Google med
  // redirect_uri = import.meta.env.VITE_REDIRECT_URI
  auth.loginWithGoogle()
}
</script>

<style scoped>
.login-page { display: flex; flex-direction: column; align-items: center; padding: 2rem; }
button { padding: .5rem 1rem; font-size: 1rem; }
</style>

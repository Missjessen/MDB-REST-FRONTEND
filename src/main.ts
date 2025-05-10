import { createApp }   from 'vue'
import { createPinia } from 'pinia'
import App             from './App.vue'
import router          from './router'
import './assets/tailwind.css' 
import { useAuthStore } from '@/modules/auth/store' 


const app   = createApp(App)
const pinia = createPinia()

app.use(pinia)   // <— først Pinia
app.use(router)  // <— så router (der kører beforeEach)
useAuthStore().restore()
app.mount('#app')


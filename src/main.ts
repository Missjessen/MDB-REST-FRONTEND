import { createApp }   from 'vue'
import { createPinia } from 'pinia'
import App             from './App.vue'
import router          from './router'
import './assets/tailwind.css' 
import { useAuthStore } from '@/modules/auth/store' 
import axios           from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_API_BASE

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)       // ✅ først Pinia
app.use(router)      // ✅ så router

// ✅ nu er pinia aktiv – så restore virker korrekt
const auth = useAuthStore()
auth.restore()

app.mount('#app')


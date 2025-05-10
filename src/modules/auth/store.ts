// src/modules/auth/store.ts
import { defineStore } from 'pinia'
import { authApi } from './api'
import type { IUser } from './interfaces'
import { AuthService } from './services/AuthService'

const authService = new AuthService()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null,
    token: '' as string,
    accessToken: '' as string, // ← til Google Picker
  }),

  getters: {
    isLoggedIn: (state) =>
      !!state.token && !!state.user
  },

  actions: {
    // Starter login-flow ved redirect til Google
    login() {
      authService.loginWithGoogle()
    },

    // Kaldes fra frontend efter redirect fra Google
    async handleCallback(code: string) {
      const res = await authApi.get('/google/callback', { params: { code } })
      const { token, user, accessToken } = res.data
    
      this.token = token
      this.user = user
      this.accessToken = accessToken
    
      localStorage.setItem('auth-token', token)
      authApi.defaults.headers.common.Authorization = `Bearer ${token}`
    },

    // Kalder /me endpoint for at hente brugerinfo
    async fetchMe() {
      this.user = await authService.fetchMe()
    },

    // Log ud
    logout() {
      this.token = ''
      this.user = null
      this.accessToken = ''
      localStorage.removeItem('auth-token')
      delete authApi.defaults.headers.common.Authorization
    },

    // Kald ved opstart: sætter JWT fra localStorage
    restore() {
      const saved = localStorage.getItem('auth-token')
      if (saved) {
        this.token = saved
        authApi.defaults.headers.common.Authorization = `Bearer ${saved}`
      }
    }
  },
})

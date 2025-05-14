// src/modules/auth/store.ts
import { defineStore } from 'pinia'
import { authApi } from './api'
import type { IUser } from './interfaces'
import { AuthService } from './services/AuthService'
import { apiClient } from './api'

const authService = new AuthService()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null,
    token: localStorage.getItem('auth-token') || '',
    accessToken: '' as string // ← til fx Google Picker
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user
  },

  actions: {
    // 🌐 Starter Google login flow
    login() {
      authService.loginWithGoogle()
    },

    // ✅ Håndter callback efter redirect fra Google
    async handleCallback(code: string) {
      const { token, user, accessToken } = await authService.handleCallback(code)

      this.user = user
      this.accessToken = accessToken
      this.setToken(token)
    },

    // ✅ Bruges efter refresh/redirect for at hente brugerinfo
    async fetchMe() {
      try {
        const user = await authService.fetchMe()
        this.user = user
        this.setToken(this.token)
      } catch (err) {
        this.logout()
        throw err
      }
    },

    // ✅ Sætter token globalt + i localStorage
    setToken(token: string) {
      this.token = token
      localStorage.setItem('auth-token', token)

      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
      authApi.defaults.headers.common.Authorization = `Bearer ${token}`
    },

    // 🧽 Ryd alt ved logout
    logout() {
      this.token = ''
      this.user = null
      this.accessToken = ''
      localStorage.removeItem('auth-token')
      delete apiClient.defaults.headers.common.Authorization
      delete authApi.defaults.headers.common.Authorization
    },

    // 🪄 Kald ved app-start
    restore() {
      const saved = localStorage.getItem('auth-token')
      if (saved) {
        this.setToken(saved)
      }
    }
  }
})

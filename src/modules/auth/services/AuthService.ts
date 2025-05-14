import type { IUser } from '../interfaces'
import { authApi, apiClient } from '../api'



export class AuthService {
  loginWithGoogle() {
    // Redirect til din backend Google OAuth login
    window.location.href = `${import.meta.env.VITE_API_BASE}/auth/google`
  }

  async handleCallback(code: string): Promise<{ token: string; user: IUser; accessToken: string }> {
    const res = await authApi.get('/google/callback', { params: { code } })
    const { token, user, accessToken } = res.data

    // ✅ Sæt token globalt på begge axios-instanser
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`

    // ✅ Gem i localStorage (kan bruges til auto-login)
    localStorage.setItem('auth-token', token)

    return { token, user, accessToken }
  }

  async fetchMe(): Promise<IUser> {
    const res = await authApi.get('/me')
    return res.data.user
  }

  logout() {
    localStorage.removeItem('auth-token')
    delete apiClient.defaults.headers.common.Authorization
    delete authApi.defaults.headers.common.Authorization
  }
}
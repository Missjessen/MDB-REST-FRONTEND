import type { IUser } from '../interfaces'
import { authApi } from '../api'



  export class AuthService {
   loginWithGoogle() {
  // peger nu på http://localhost:4000/auth/google
  window.location.href = `${import.meta.env.VITE_API_BASE}/auth/google`
}

// services/AuthService.ts
async handleCallback(code: string): Promise<{ token: string; user: IUser; accessToken: string }> {
  const res = await authApi.get('/google/callback', { params: { code } })
  const { token, user, accessToken } = res.data

  // Sæt Authorization header globalt
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('auth-token', token)

  return { token, user, accessToken }
}

   /** Henter /auth/me – skal ligge efter at token er sat på header */
   async fetchMe(): Promise<IUser> {
    // GET http://localhost:4000/api/auth/me
    const res = await authApi.get('/me')
    return res.data.user
  }
}

export { authApi };

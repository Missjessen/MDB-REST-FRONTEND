// src/modules/auth/AuthGuard.ts
import type { IAuthGuard } from './IAuthGuard'
import { useAuthStore } from './store'
import router from '@/router'

export class AuthGuard implements IAuthGuard {
  /** 
   * Henter brugerinfo hvis vi har et token, 
   * og returnerer om vi er logget ind. 
   */
  public async ensureAuth(): Promise<boolean> {
    const auth = useAuthStore()   

    // Hvis vi har en token men ingen bruger, så hent brugerinfo
    if (auth.token && !auth.user) {
      try {
        await auth.fetchMe()
      } catch {
        auth.logout()
        return false
      }
    }

    return !!auth.user && auth.isLoggedIn
  }

  public redirectToLogin(): void {
    router.replace('/login')
  }
}

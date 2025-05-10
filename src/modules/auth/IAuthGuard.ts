// src/modules/auth/IAuthGuard.ts
export interface IAuthGuard {
    ensureAuth(): Promise<boolean>;
    redirectToLogin(): void;
  }
  
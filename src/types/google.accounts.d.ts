declare namespace google.accounts.oauth2 {
    interface TokenClientConfig {
      client_id: string;
      scope: string;
      callback: (response: TokenResponse) => void;
    }
  
    interface TokenResponse {
      access_token: string;
      expires_in: number;
      token_type: string;
      state?: string;
      error?: string;
      error_description?: string;
    }
  
    interface TokenClient {
      requestAccessToken(options?: { prompt?: string }): void;
    }
  
    function initTokenClient(config: TokenClientConfig): TokenClient;
  }
  
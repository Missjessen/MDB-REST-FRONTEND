// src/modules/sheets/interfaces/GooglePickerResponse.ts

export interface GooglePickerResponse {
    action: 'picked' | 'cancel' | string
    docs: {
      id: string
      name: string
      mimeType: string
      iconUrl: string
      url: string
    }[]
  }
  
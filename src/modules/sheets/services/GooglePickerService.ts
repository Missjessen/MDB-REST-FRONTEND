declare const gapi: any
declare const google: any

export class GooglePickerService {
  private accessToken: string | null = null

  // Loader Google Picker API
  public async initPickerClient(): Promise<void> {
    if (window.google?.picker) return

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => gapi.load('client:picker', resolve)
      script.onerror = () => reject(new Error('Google API kunne ikke loades'))
      document.head.appendChild(script)
    })
  }

  // Loader identity client (kun nødvendigt hvis du senere vil forny token manuelt)
  public async initIdentityClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.oauth2) return resolve()

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('GIS (identity client) kunne ikke indlæses'))
      document.head.appendChild(script)
    })
  }

  // Ny metode – giver adgangstoken fra login
  public setAccessToken(token: string) {
    this.accessToken = token
  }

  

  // Åbner Picker med Sheets
  public showPicker() {
    if (!this.accessToken) {
      console.error('❌ showPicker: MISSING accessToken!')
      alert('Du er ikke logget ind med adgang til Google Drive.')
      return
    }

    const picker = new google.picker.PickerBuilder()
      .addView(new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS))
      .setOAuthToken(this.accessToken)
      .setDeveloperKey(import.meta.env.VITE_GOOGLE_API_KEY)
      .setAppId(import.meta.env.VITE_GOOGLE_APP_ID)
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const doc = data.docs?.[0]
          if (doc) alert(`Du valgte: ${doc.name}`) // ← her kan du sende sheetId til din store
        }
      })
      .build()

    picker.setVisible(true)
  }
}

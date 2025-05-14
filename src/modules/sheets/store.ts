import { defineStore } from 'pinia'
import type { Sheet } from './interfaces/Sheet'
import { SheetsService } from './services/SheetsService'
import { GooglePickerService } from './services/GooglePickerService'
import { useAuthStore } from '../auth/store'

const sheetsService = new SheetsService()
const picker = new GooglePickerService()

export const useSheetsStore = defineStore('sheets', {
  state: () => ({
    list: [] as Sheet[],
    current: null as Sheet | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async loadAll() {
  this.loading = true
  try {
    const result = await sheetsService.fetchSheets()
    console.log('✅ Hentet fra API:', result)

    this.list = Array.isArray(result) ? result : [] // sikrer array-type
  } catch (err) {
    console.error('❌ Fejl ved hentning:', err)
    this.error = 'Kunne ikke hente dine ark'
    this.list = []
  } finally {
    this.loading = false
  }
},

    async loadById(id: string) {
      this.loading = true
      try {
        const res = await sheetsService.fetchSheetById(id)
        this.current = res
      } catch (err) {
        this.error = 'Kunne ikke hente arket'
      } finally {
        this.loading = false
      }
    },

    setCurrent(sheet: Sheet) {
      this.current = sheet
    },

    async deleteSheet(id: string) {
      try {
        await sheetsService.deleteSheet(id)
        this.list = this.list.filter(s => s._id !== id)
      } catch (err) {
        console.error('Kunne ikke slette sheet:', err)
        this.error = 'Sletning mislykkedes'
      }
    },

    async syncSheetToDb(sheet: Sheet) {
      try {
        const result = await sheetsService.syncDbAll(sheet._id)
        alert(
          `✅ Ark: ${sheet.name}\n` +
          `Kampagner: ${result.campaigns}\nAnnoncer: ${result.ads}\nKeywords: ${result.keywords}`
        )
      } catch (err) {
        console.error('Fejl under synk:', err)
        this.error = `Synkronisering mislykkedes for ${sheet.name}`
      }
    },

    async showPicker(): Promise<{ id: string; name: string } | null> {
      return new Promise((resolve) => {
        const pickerInstance = new google.picker.PickerBuilder()
          .addView(new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS))
          .setOAuthToken(useAuthStore().accessToken)
          .setDeveloperKey(import.meta.env.VITE_GOOGLE_API_KEY)
          //.setAppId(import.meta.env.VITE_GOOGLE_PROJECT_NUMBER)
          .setCallback((data: any) => {
            if (data.action === google.picker.Action.PICKED) {
              const doc = data.docs[0]
              resolve({ id: doc.id, name: doc.name })
            } else {
              resolve(null)
            }
          })
          .build()

        pickerInstance.setVisible(true)
      })
    },

    async saveSheetMeta(sheet: { id: string; name: string }) {
      try {
        await sheetsService.createSheet(sheet.name) // gemmer kun navn pt.
      } catch (err) {
        console.error('Kunne ikke gemme sheet:', err)
      }
    },

    async openPicker() {
      try {
        const auth = useAuthStore()
        await picker.initPickerClient()
        picker.setAccessToken(auth.accessToken)

        const selected = await this.showPicker()

        if (selected) {
          await this.saveSheetMeta(selected)
          await this.loadAll()
        }
      } catch (err) {
        console.error('Kunne ikke åbne eller gemme ark:', err)
        this.error = 'Kunne ikke åbne picker'
      }
    }
  }
})

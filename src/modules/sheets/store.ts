// src/modules/sheets/store.ts
import { defineStore } from 'pinia'
import type { Sheet } from './interfaces/Sheet'
import { SheetsService } from './services/SheetsService'
import { GooglePickerService } from './services/GooglePickerService'
import { useAuthStore } from '@/modules/auth/store'

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
        this.list = await sheetsService.fetchSheets()
      } catch (e) {
        console.error(e)
        this.error = 'Kunne ikke hente ark'
      } finally {
        this.loading = false
      }
    },

    // Genindført loadById
    async loadById(id: string) {
      this.loading = true
      try {
        this.current = await sheetsService.fetchSheetById(id)
      } catch (e) {
        console.error(e)
        this.error = 'Kunne ikke hente arket'
      } finally {
        this.loading = false
      }
    },

    async createSheet(name: string) {
      this.loading = true
      try {
        const sheet = await sheetsService.createSheet(name)
        this.list.push(sheet)
      } catch (e) {
        console.error(e)
        this.error = 'Oprettelse mislykkedes'
      } finally {
        this.loading = false
      }
    },

    async openPicker() {
      this.loading = true
      try {
        await picker.initPickerClient()
        picker.setAccessToken(useAuthStore().accessToken)

        const selected = await new Promise<{ id: string; name: string } | null>(resolve => {
          new google.picker.PickerBuilder()
            .addView(new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS))
            .setOAuthToken(useAuthStore().accessToken)
            .setDeveloperKey(import.meta.env.VITE_GOOGLE_API_KEY)
            .setCallback(data => {
              const doc = data.docs?.[0]
              if (
                data.action === google.picker.Action.PICKED &&
                doc?.id != null &&
                typeof doc.name === 'string'
              ) {
                resolve({
                  id:   doc.id,
                  name: doc.name    
                })
              } else {
                resolve(null)
              }
            })
            .build()
            .setVisible(true)
        })

        if (selected) {
          const sheet = await sheetsService.createSheet(selected.name)
          this.list.push(sheet)
        }
      } catch (e) {
        console.error(e)
        this.error = 'Kunne ikke åbne picker'
      } finally {
        this.loading = false
      }
    },

    async deleteSheet(id: string) {
      this.loading = true
      try {
        await sheetsService.deleteSheet(id)
        this.list = this.list.filter(s => s._id !== id)
      } catch (e) {
        console.error(e)
        this.error = 'Sletning mislykkedes'
      } finally {
        this.loading = false
      }
    },

    async syncSheetToDb(sheet: Sheet) {
      this.loading = true
      try {
        const r = await sheetsService.syncDbAll(sheet._id)
        alert(
          `✅ ${sheet.name}\n` +
          `Kampagner: ${r.campaigns}\n` +
          `Annoncer: ${r.ads}\n` +
          `Keywords: ${r.keywords}`
        )
      } catch (e) {
        console.error(e)
        this.error = 'Synk mislykkedes'
      } finally {
        this.loading = false
      }
    }
  }
})

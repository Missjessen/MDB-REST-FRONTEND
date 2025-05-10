import { defineStore } from 'pinia'
import type { AdDef } from '../interfaces/AdDef'
import {
  getAds,
  updateAd,
  deleteAd,
  createAd,
  syncAds
} from '../services/adService'

export const useAdStore = defineStore('ads', {
  state: () => ({
    list: [] as AdDef[],
    loading: false,
    error: null as string | null,
    sheetId: ''
  }),

  actions: {
    setSheetId(id: string) {
      this.sheetId = id
    },

    async loadAll() {
      this.loading = true
      this.error = null
      try {
        if (!this.sheetId) throw new Error('Sheet ID mangler')
        this.list = await getAds(this.sheetId)
      } catch (err) {
        console.error('Fejl under hentning af annoncer:', err)
        this.error = 'Kunne ikke hente annoncer'
      } finally {
        this.loading = false
      }
    },

    async save(ad: AdDef) {
      try {
        if (!this.sheetId || !ad._id) throw new Error('Sheet ID eller annonce mangler')
        await updateAd(this.sheetId, ad)
        const index = this.list.findIndex(a => a._id === ad._id)
        if (index !== -1) this.list[index] = { ...this.list[index], ...ad }
      } catch (err) {
        console.error('Fejl under gemning af annonce:', err)
        throw err
      }
    },

    async create(ad: Partial<AdDef>) {
      try {
        const newAd = await createAd(this.sheetId, ad)
        this.list.push(newAd)
      } catch (err) {
        console.error('Fejl under oprettelse af annonce:', err)
        throw err
      }
    },

    async remove(adId: string) {
      try {
        await deleteAd(this.sheetId, adId)
        this.list = this.list.filter(a => a._id !== adId)
      } catch (err) {
        console.error('Fejl under sletning af annonce:', err)
        throw err
      }
    },

    async syncFromSheet() {
      try {
        this.loading = true
        const synced = await syncAds(this.sheetId)
        this.list = synced.data
      } catch (err) {
        console.error('Fejl under synkronisering fra Sheet:', err)
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})

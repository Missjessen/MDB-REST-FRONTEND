import { defineStore } from 'pinia'
import type { KeywordDef } from '../interfaces/KeywordDef'
import {
  getKeywords,
  updateKeyword,
  deleteKeyword,
  createKeyword,
  syncKeywords
} from '../services/keywordService'

export const useKeywordStore = defineStore('keywords', {
  state: () => ({
    list: [] as KeywordDef[],
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
        this.list = await getKeywords(this.sheetId)
      } catch (err) {
        console.error('Fejl under hentning af søgeord:', err)
        this.error = 'Kunne ikke hente søgeord'
      } finally {
        this.loading = false
      }
    },

    async save(keyword: KeywordDef) {
      try {
        if (!this.sheetId || !keyword._id) throw new Error('Sheet ID eller søgeord-ID mangler')
        await updateKeyword(this.sheetId, keyword)
        const index = this.list.findIndex(k => k._id === keyword._id)
        if (index !== -1) this.list[index] = { ...this.list[index], ...keyword }
      } catch (err) {
        console.error('Fejl under gemning af søgeord:', err)
        throw err
      }
    },

    async create(keyword: Partial<KeywordDef>) {
      try {
        const newKeyword = await createKeyword(this.sheetId, keyword)
        this.list.push(newKeyword)
      } catch (err) {
        console.error('Fejl under oprettelse af søgeord:', err)
        throw err
      }
    },

    async remove(keywordId: string) {
      try {
        await deleteKeyword(this.sheetId, keywordId)
        this.list = this.list.filter(k => k._id !== keywordId)
      } catch (err) {
        console.error('Fejl under sletning af søgeord:', err)
        throw err
      }
    },

    async syncFromSheet() {
      try {
        this.loading = true
        const synced = await syncKeywords(this.sheetId)
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

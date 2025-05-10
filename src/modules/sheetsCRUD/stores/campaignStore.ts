import { defineStore } from 'pinia'
import type { CampaignDef } from '../../sheetsCRUD/interfaces/CampaignDef'
import {
  getCampaigns,
  updateCampaign,
  deleteCampaign,
  createCampaign,
  syncCampaigns
} from '../../sheetsCRUD/services/campaignService'

export const useCampaignStore = defineStore('campaigns', {
  state: () => ({
    list: [] as CampaignDef[],
    loading: false,
    error: null as string | null,
    sheetId: '', // Google Sheet ID
    mongoId: ''  // Mongo _id
  }),

  actions: {
    setSheetIds(sheetId: string, mongoId: string) {
      this.sheetId = sheetId
      this.mongoId = mongoId
    },

    async loadAll() {
      this.loading = true
      this.error = null
      try {
        if (!this.sheetId) throw new Error('Sheet ID mangler')
        this.list = await getCampaigns(this.sheetId)
      } catch (err) {
        console.error('Fejl under hentning af kampagner:', err)
        this.error = 'Kunne ikke hente kampagner'
      } finally {
        this.loading = false
      }
    },

    async save(campaign: CampaignDef) {
      try {
        if (!this.sheetId || !campaign._id) throw new Error('Sheet ID eller kampagne mangler')
        await updateCampaign(this.sheetId, campaign)
        const index = this.list.findIndex(c => c._id === campaign._id)
        if (index !== -1) this.list[index] = { ...this.list[index], ...campaign }
      } catch (err) {
        console.error('Fejl under gemning af kampagne:', err)
        throw err
      }
    },

    async create(campaign: Partial<CampaignDef>) {
      try {
        const newCampaign = await createCampaign(this.sheetId, campaign)
        this.list.push(newCampaign)
      } catch (err) {
        console.error('Fejl under oprettelse af kampagne:', err)
        throw err
      }
    },

    async remove(campaignId: string) {
      try {
        await deleteCampaign(this.sheetId, campaignId)
        this.list = this.list.filter(c => c._id !== campaignId)
      } catch (err) {
        console.error('Fejl under sletning af kampagne:', err)
        throw err
      }
    },

    async syncFromSheet() {
      try {
        this.loading = true
        const synced = await syncCampaigns(this.sheetId)
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

import axios from 'axios'
import type { CampaignDef } from '../interfaces/CampaignDef'
import { useAuthStore } from '@/modules/auth/store'

export async function getCampaigns(sheetId: string): Promise<CampaignDef[]> {
  if (!sheetId) throw new Error('Sheet ID er påkrævet for at hente kampagner')
  const auth = useAuthStore()
  try {
    const res = await axios.get(`/api/campaign-defs/${sheetId}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    return res.data
  } catch (error: any) {
    console.error('Fejl under hentning af kampagner:', error)
    throw new Error('Kunne ikke hente kampagner fra serveren')
  }
}

export async function updateCampaign(sheetId: string, campaign: CampaignDef): Promise<void> {
  if (!sheetId || !campaign._id) throw new Error('Sheet ID og kampagne-ID er påkrævet for at opdatere kampagnen')
  const auth = useAuthStore()
  try {
    await axios.put(
      `/api/campaign-defs/${sheetId}/${campaign._id}`,
      {
        name: campaign.name,
        status: campaign.status,
        budget: campaign.budget
      },
      {
        headers: { Authorization: `Bearer ${auth.token}` }
      }
    )
  } catch (error: any) {
    console.error('Fejl under opdatering af kampagne:', error)
    throw new Error('Kunne ikke gemme kampagnen')
  }
}

export async function createCampaign(sheetId: string, campaign: Partial<CampaignDef>): Promise<CampaignDef> {
  if (!sheetId) throw new Error('Sheet ID er påkrævet for at oprette kampagne')
  const auth = useAuthStore()
  try {
    const res = await axios.post(`/api/campaign-defs/${sheetId}`, campaign, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    return res.data
  } catch (error: any) {
    console.error('Fejl under oprettelse af kampagne:', error)
    throw new Error('Kunne ikke oprette kampagnen')
  }
}

export async function deleteCampaign(sheetId: string, campaignId: string): Promise<void> {
  if (!sheetId || !campaignId) throw new Error('Sheet ID og kampagne-ID er påkrævet for at slette kampagnen')
  const auth = useAuthStore()
  try {
    await axios.delete(`/api/campaign-defs/${sheetId}/${campaignId}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
  } catch (error: any) {
    console.error('Fejl under sletning af kampagne:', error)
    throw new Error('Kunne ikke slette kampagnen')
  }
}

export async function syncCampaigns(sheetId: string): Promise<{ synced: number; data: CampaignDef[] }> {
  if (!sheetId) throw new Error('Sheet ID er påkrævet for synkronisering')
  const auth = useAuthStore()
  try {
    const res = await axios.post(`/api/campaign-defs/${sheetId}/sync-db`, {}, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    return res.data
  } catch (error: any) {
    console.error('Fejl under synkronisering af kampagner:', error)
    throw new Error('Synkronisering mislykkedes')
  }
}

import axios from 'axios'
import type { AdDef } from '../interfaces/AdDef'
import { useAuthStore } from '@/modules/auth/store'

export async function getAds(sheetId: string): Promise<AdDef[]> {
  const auth = useAuthStore()
  const res = await axios.get(`/api/ad-defs/${sheetId}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

export async function updateAd(sheetId: string, ad: AdDef): Promise<void> {
  const auth = useAuthStore()
  await axios.put(
    `/api/ad-defs/${sheetId}/${ad._id}`,
    {
      headline1: ad.headline1,
      headline2: ad.headline2,
      description: ad.description,
      finalUrl: ad.finalUrl
    },
    {
      headers: { Authorization: `Bearer ${auth.token}` }
    }
  )
}

export async function deleteAd(sheetId: string, adId: string): Promise<void> {
  const auth = useAuthStore()
  await axios.delete(`/api/ad-defs/${sheetId}/${adId}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
}

export async function createAd(sheetId: string, ad: Partial<AdDef>): Promise<AdDef> {
  const auth = useAuthStore()
  const res = await axios.post(`/api/ad-defs/${sheetId}`, ad, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

export async function syncAds(sheetId: string): Promise<{ data: AdDef[] }> {
  const auth = useAuthStore()
  const res = await axios.post(`/api/ad-defs/${sheetId}/sync-db`, {}, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

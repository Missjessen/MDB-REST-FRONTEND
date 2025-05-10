import axios from 'axios'
import type { KeywordDef } from '../interfaces/KeywordDef'
import { useAuthStore } from '@/modules/auth/store'

export async function getKeywords(sheetId: string): Promise<KeywordDef[]> {
  const auth = useAuthStore()
  const res = await axios.get(`/api/keyword-defs/${sheetId}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

export async function updateKeyword(sheetId: string, keyword: KeywordDef): Promise<void> {
  const auth = useAuthStore()
  await axios.put(
    `/api/keyword-defs/${sheetId}/${keyword._id}`,
    {
      keyword: keyword.keyword,
      matchType: keyword.matchType,
      cpc: keyword.cpc
    },
    {
      headers: { Authorization: `Bearer ${auth.token}` }
    }
  )
}

export async function deleteKeyword(sheetId: string, keywordId: string): Promise<void> {
  const auth = useAuthStore()
  await axios.delete(`/api/keyword-defs/${sheetId}/${keywordId}`, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
}

export async function createKeyword(sheetId: string, keyword: Partial<KeywordDef>): Promise<KeywordDef> {
  const auth = useAuthStore()
  const res = await axios.post(`/api/keyword-defs/${sheetId}`, keyword, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

export async function syncKeywords(sheetId: string): Promise<{ data: KeywordDef[] }> {
  const auth = useAuthStore()
  const res = await axios.post(`/api/keyword-defs/${sheetId}/sync`, {}, {
    headers: { Authorization: `Bearer ${auth.token}` }
  })
  return res.data
}

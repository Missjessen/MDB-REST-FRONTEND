// src/modules/sheets/services/SheetsService.ts
import type { ISheetsService } from '../ISheetsService'
import type { Sheet } from '../models'
import { apiClient } from '../../auth/api'

export class SheetsService implements ISheetsService {
  async fetchSheets(): Promise<Sheet[]> {
    const res = await apiClient.get('/sheets')
    return res.data
  }

  async createSheet(name: string): Promise<Sheet> {
    const res = await apiClient.post('/sheets', { name })
    return res.data
  }

  async fetchSheetById(id: string): Promise<Sheet> {
    const res = await apiClient.get(`/sheets/${id}`)
    return res.data
  }

  async deleteSheet(id: string): Promise<void> {
    await apiClient.delete(`/sheets/${id}`)
  }

  async syncDbAll(id: string): Promise<{ campaigns: number; ads: number; keywords: number }> {
    const res = await apiClient.post(`/sheets/${id}/sync-db-all`)
    return res.data
  }
}

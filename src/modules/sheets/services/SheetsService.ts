import type { Sheet } from '../interfaces/Sheet'
import axios from 'axios'
import { useAuthStore } from '@/modules/auth/store'

export class SheetsService {
  getAuthHeader() {
    const token = useAuthStore().token
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  async fetchSheets(): Promise<Sheet[]> {
    const res = await axios.get('/api/sheets', this.getAuthHeader())
    return res.data
  }

  async fetchSheetById(id: string): Promise<Sheet> {
    const res = await axios.get(`/api/sheets/${id}`, this.getAuthHeader())
    return res.data
  }

  async createSheet(name: string): Promise<Sheet> {
    const res = await axios.post('/api/sheets', { name }, this.getAuthHeader())
    return res.data
  }

  async deleteSheet(id: string): Promise<void> {
    await axios.delete(`/api/sheets/${id}`, this.getAuthHeader())
  }
}

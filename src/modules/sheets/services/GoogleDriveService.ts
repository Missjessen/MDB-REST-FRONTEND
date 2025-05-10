// modules/sheets/services/GoogleDriveService.ts
import axios from 'axios'

export class GoogleDriveService {
  async listSheets(): Promise<{ id: string; name: string }[]> {
    const res = await axios.get('/api/google/sheets') // proxy via backend
    return res.data.files
  }
}
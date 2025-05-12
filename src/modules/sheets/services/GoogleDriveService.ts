// modules/sheets/services/GoogleDriveService.ts
import axios from 'axios'

export class GoogleDriveService {
  async listSheets(): Promise<{ id: string; name: string }[]> {
    const res = await axios.get('/api/sheets') // proxy via backend har fjernet google
    return res.data.files
  }
}
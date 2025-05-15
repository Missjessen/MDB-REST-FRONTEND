// src/modules/sheets/ISheetsService.ts
import type { Sheet } from './models'


export interface ISheetsService {
  fetchSheets(): Promise<Sheet[]>
  createSheet(name: string): Promise<Sheet>
  fetchSheetById(id: string): Promise<Sheet>
  deleteSheet(id: string): Promise<void>
  syncDbAll(id: string): Promise<{ campaigns: number; ads: number; keywords: number }>

}

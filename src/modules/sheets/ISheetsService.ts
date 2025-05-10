// src/modules/sheets/ISheetsService.ts
import type { Sheet } from './models'

/**  
 * Interface for alle dine Sheets‐endpoints  
 * (følg Interface Segregation: kun de metoder frontenden behøver)  
 */
export interface ISheetsService {
  fetchSheets(): Promise<Sheet[]>
  createSheet(name: string): Promise<Sheet>
  fetchSheetById(id: string): Promise<Sheet>
  // Senere kan du tilføje:
  // syncDbAll(id: string): Promise<SyncResult>
  // syncAds(id: string): Promise<YourAdsResponse>
  // osv.
}

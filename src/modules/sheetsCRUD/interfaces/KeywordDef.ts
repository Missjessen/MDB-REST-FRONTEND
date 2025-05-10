export interface KeywordDef {
    _id?: string
    sheetId: string
    userId?: string
    keyword: string
    matchType: 'EXACT' | 'PHRASE' | 'BROAD'
    cpc: number
    rowIndex?: number
  }
  
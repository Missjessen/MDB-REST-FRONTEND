// interfaces/AdDef.ts
export interface AdDef {
    _id: string;            // <-- obligatorisk
    sheetId: string;
    headline1: string;
    headline2?: string;
    description?: string;
    finalUrl: string;
    rowIndex?: number;
  }
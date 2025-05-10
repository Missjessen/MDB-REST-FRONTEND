// src/modules/sheets/api.ts
import axios from 'axios'

/**
 * Én Axios‐instans som peger på dine Sheets-endpoints
 * Base‐URL sættes via VITE_API_BASE fra .env
 */
export const sheetsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE}/sheets`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
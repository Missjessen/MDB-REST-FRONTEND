<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Sheet Administration</h1>

    <div v-if="!sheet">Indlæser ark...</div>

    <div v-else>
      <h2 class="text-xl font-semibold mb-2">{{ sheet.name }}</h2>
      <p class="mb-4 text-sm text-gray-500">
        <a :href="sheet.sheetUrl" target="_blank" class="underline text-blue-500">
          Åbn i Google Sheets ↗
        </a>
      </p>

      <iframe
        v-if="sheet.sheetUrl"
        :src="sheet.sheetUrl.replace('/edit', '/preview')"
        width="100%"
        height="400"
        class="mb-6 border rounded"
      ></iframe>

      <div class="flex gap-4 mb-6 flex-wrap">
        <button class="btn-tab" :class="tabClass('campaigns')" @click="activeTab = 'campaigns'">Kampagner</button>
        <button class="btn-tab" :class="tabClass('ads')" @click="activeTab = 'ads'">Annoncer</button>
        <button class="btn-tab" :class="tabClass('keywords')" @click="activeTab = 'keywords'">Søgeord</button>
        <button class="btn-sync" @click="syncDb">🔄 Sync til DB</button>
        <button class="btn-sync" @click="syncAds">📤 Sync til Ads</button>
        <button class="btn-sync" @click="syncAll">🧠 Sync alt</button>
      </div>

      <div v-if="activeTab === 'campaigns'">
        <CampaignEditor :sheetId="sheet.sheetId || sheet._id" />

      </div>
      <div v-if="activeTab === 'ads'">
        <AdEditor :sheetId="sheet.sheetId || sheet._id" />
      </div>
      <div v-if="activeTab === 'keywords'">
        <KeywordEditor sheetId="sheet.sheetId || sheet._id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSheetsStore } from '../../../modules/sheets/store'
import CampaignEditor from '../../../modules/sheetsCRUD/components/CampaignEditor.vue'
import AdEditor from '../../../modules/sheetsCRUD/components/AdEditor.vue'
import KeywordEditor from '../../../modules/sheetsCRUD/components/KeywordEditor.vue'
import axios from 'axios'
import { useAuthStore } from '@/modules/auth/store'

const route = useRoute()
const sheets = useSheetsStore()
const auth = useAuthStore()
const activeTab = ref<'campaigns' | 'ads' | 'keywords'>('campaigns')

onMounted(() => {
  sheets.loadById(route.params.id as string)
})

const sheet = computed(() => sheets.current)

function tabClass(tab: string) {
  return [
    'px-4 py-2 rounded border',
    activeTab.value === tab ? 'bg-blue-600 text-white' : 'bg-white text-black'
  ]
}

async function syncDb() {
  if (sheet.value?.sheetId) {
    try {
      await axios.post(`/api/sheets/${sheet.value.sheetId}/sync-db-all`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      alert('✅ Synkronisering til DB fuldført')
    } catch (err: any) {
      alert('❌ Fejl ved sync til DB: ' + err?.response?.data?.error || err.message)
    }
  }
}

async function syncAds() {
  if (sheet.value?.sheetId) {
    try {
      await axios.post(`/api/sheets/${sheet.value.sheetId}/sync-ads`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      alert('✅ Synkronisering til Ads fuldført')
    } catch (err: any) {
      alert('❌ Fejl ved sync til Ads: ' + err?.response?.data?.error || err.message)
    }
  }
}

async function syncAll() {
  if (sheet.value?.sheetId) {
    try {
      await axios.post(`/api/sheets/${sheet.value.sheetId}/sync-all-and-ads`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      alert('✅ Fuld synkronisering (DB + Ads) fuldført')
    } catch (err: any) {
      alert('❌ Fejl ved fuld sync: ' + err?.response?.data?.error || err.message)
    }
  }
}
</script>

<style scoped>
.btn-tab {
  transition: all 0.2s ease;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: white;
}
.btn-tab:hover {
  background-color: #e0e7ff;
}
.btn-sync {
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
</style>

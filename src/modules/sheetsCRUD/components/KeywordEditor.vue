<template>
    <div>
      <h3 class="text-lg font-semibold mb-4">Rediger søgeord</h3>
  
      <div v-if="loading">Indlæser søgeord...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>
  
      <div
        v-for="keyword in keywordStore.list"
        :key="keyword._id"
        class="mb-4 p-4 border rounded"
      >
        <label class="block mb-1 font-medium">Søgeord</label>
        <input v-model="keyword.keyword" class="input" />
  
        <label class="block mt-2 mb-1 font-medium">Matchtype</label>
        <select v-model="keyword.matchType" class="input">
          <option value="EXACT">EXACT</option>
          <option value="PHRASE">PHRASE</option>
          <option value="BROAD">BROAD</option>
        </select>
  
        <label class="block mt-2 mb-1 font-medium">CPC (kr)</label>
        <input type="number" v-model.number="keyword.cpc" class="input" />
  
        <div class="flex gap-2 mt-4">
          <button class="btn-save" @click="save(keyword)">Gem</button>
          <button class="btn-delete" @click="remove(keyword._id!)">Slet</button>
        </div>
      </div>
  
      <!-- Opret nyt søgeord -->
      <div class="mt-6 border-t pt-4">
        <h4 class="text-md font-semibold mb-2">Nyt søgeord</h4>
        <input v-model="newKeyword.keyword" class="input" placeholder="Søgeord" />
        <select v-model="newKeyword.matchType" class="input">
          <option value="EXACT">EXACT</option>
          <option value="PHRASE">PHRASE</option>
          <option value="BROAD">BROAD</option>
        </select>
        <input v-model.number="newKeyword.cpc" type="number" class="input" placeholder="CPC" />
  
        <button class="btn-add mt-2" @click="create">Opret søgeord</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useKeywordStore } from '../stores/keywordStore'
  
  const props = defineProps<{ sheetId: string }>()
  const keywordStore = useKeywordStore()
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  export type MatchType = 'EXACT' | 'PHRASE' | 'BROAD'

export interface KeywordDef {
  _id: string
  keyword: string
  matchType: MatchType
  cpc: number
  rowIndex: number
}
  onMounted(async () => {
    try {
      loading.value = true
      keywordStore.setSheetId(props.sheetId)
      await keywordStore.loadAll()
    } catch (err: any) {
      error.value = 'Kunne ikke hente søgeord'
    } finally {
      loading.value = false
    }
  })
  
  function save(keyword: any) {
  keywordStore.save(keyword)
}

function remove(id: string) {
  keywordStore.remove(id)
}

// ✅ Her tilføjes create-funktionen:
async function create() {
  try {
    await keywordStore.create(newKeyword.value)
    newKeyword.value = {
      keyword: '',
      matchType: 'EXACT',
      cpc: 0
    }
  } catch (err) {
    error.value = 'Kunne ikke oprette søgeord'
  }
}
  
const newKeyword = ref<Partial<KeywordDef>>({
  keyword: '',
  matchType: 'EXACT',
  cpc: 0
})

  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .btn-save {
    background-color: #10b981;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
  .btn-delete {
    background-color: #ef4444;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
  .btn-add {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
  </style>
  
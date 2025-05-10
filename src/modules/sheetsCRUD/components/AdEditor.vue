<template>
    <div>
      <!-- Header med sync-knap -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Annoncer</h3>
        <button
          @click="onSync"
          class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          🔄 Synk fra Sheet
        </button>
      </div>
  
      <!-- Loading-indikator -->
      <div v-if="store.loading" class="italic text-gray-500 mb-4">
        Indlæser annoncer…
      </div>
  
      <!-- CRUD-liste -->
      <div v-else>
        <ul class="mb-6">
          <li
            v-for="ad in store.list"
            :key="ad._id"
            class="mb-4 border p-4 rounded shadow-sm"
          >
            <div class="flex gap-2 mb-2">
              <input
                v-model="ad.headline1"
                @blur="() => store.save(ad)"
                placeholder="Headline 1"
                class="flex-1 p-2 border rounded"
              />
              <input
                v-model="ad.headline2"
                @blur="() => store.save(ad)"
                placeholder="Headline 2"
                class="flex-1 p-2 border rounded"
              />
            </div>
            <div class="flex gap-2 mb-2">
              <input
                v-model="ad.description"
                @blur="() => store.save(ad)"
                placeholder="Description"
                class="flex-1 p-2 border rounded"
              />
              <input
                v-model="ad.finalUrl"
                @blur="() => store.save(ad)"
                placeholder="Final URL"
                class="flex-1 p-2 border rounded"
              />
            </div>
            <button
              @click="() => store.remove(ad._id!)"
              class="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Slet annonce
            </button>
          </li>
        </ul>
  
        <!-- Form til at oprette ny annonce -->
        <div class="flex flex-wrap gap-2 items-end">
          <input
            v-model="newAd.headline1"
            placeholder="Headline 1"
            class="p-2 border rounded flex-1 min-w-[150px]"
          />
          <input
            v-model="newAd.headline2"
            placeholder="Headline 2"
            class="p-2 border rounded flex-1 min-w-[150px]"
          />
          <input
            v-model="newAd.description"
            placeholder="Description"
            class="p-2 border rounded flex-1 min-w-[200px]"
          />
          <input
            v-model="newAd.finalUrl"
            placeholder="Final URL"
            class="p-2 border rounded flex-1 min-w-[200px]"
          />
          <button
            @click="onCreate"
            :disabled="!newAd.headline1 || !newAd.finalUrl"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
          >
            Opret annonce
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { defineProps } from 'vue'
  import { useAdStore } from '../../sheetsCRUD/stores/adStore'
  
  const props = defineProps<{ sheetId: string }>()
  
  // Hent Pinia-store og bind sheetId
  const store = useAdStore()
  store.setSheetId(props.sheetId)
  
  // Nyt objekt til oprettelse
  const newAd = ref({
    headline1: '',
    headline2: '',
    description: '',
    finalUrl: ''
  })
  
  // Funktion til at hente alle annoncer
  async function load() {
    if (!props.sheetId) return
    await store.loadAll()
  }
  
  // “Synk fra Sheet”-knap
  async function onSync() {
    try {
      await store.syncFromSheet()
    } catch (e) {
      console.error(e)
      alert('❌ Kunne ikke synkronisere annoncer')
    }
  }
  
  // Opret ny annonce
  async function onCreate() {
    await store.create(newAd.value)
    // nulstil inputfelter
    newAd.value = {
      headline1: '',
      headline2: '',
      description: '',
      finalUrl: ''
    }
  }
  
  // Load ved mount og når sheetId ændres
  onMounted(load)
  watch(() => props.sheetId, (id) => {
    store.setSheetId(id)
    load()
  })
  </script>
  
  <style scoped>
  /* Ekstra hover/transitions kan tilpasses her */
  </style>
  
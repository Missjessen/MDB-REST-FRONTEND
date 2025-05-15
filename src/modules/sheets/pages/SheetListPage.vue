<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Dine Google Sheets</h1>

    <!-- ----- Opret nyt ark via navn ----- -->
    <form @submit.prevent="create()" class="flex gap-2">
      <input
        v-model="newName"
        placeholder="Navn på nyt sheet"
        class="flex-1 px-2 py-1 border rounded"
      />
      <button
        type="submit"
        class="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        :disabled="!newName"
      >Opret</button>
      <button
        type="button"
        @click="picker()"
        class="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >Vælg eksisterende</button>
    </form>

    <!-- ----- Liste af sheets ----- -->
    <ul v-if="store.list.length" class="divide-y">
      <li
        v-for="sheet in store.list"
        :key="sheet._id"
        class="flex justify-between items-center py-2"
      >
        <div>
          <p class="font-medium">{{ sheet.name }}</p>
          <small class="text-gray-500">{{ sheet.sheetUrl || 'Link mangler' }}</small>
        </div>

        <div class="flex space-x-2">
          <RouterLink
            :to="`/sheets/${sheet._id}`"
            class="text-blue-600 underline"
          >Åbn</RouterLink>


          <button
            @click="remove(sheet)"
            class="text-red-500 hover:underline"
          >Slet</button>
        </div>
      </li>
    </ul>
    <p v-else class="text-gray-500">Ingen ark fundet.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSheetsStore } from '@/modules/sheets/store'
import type { Sheet } from '@/modules/sheets/interfaces/Sheet'

const store = useSheetsStore()
const newName = ref('')

onMounted(() => {
  store.loadAll()
})

async function create() {
  await store.createSheet(newName.value)
  newName.value = ''
}

function remove(sheet: Sheet) {
  if (confirm(`Slet sheet "${sheet.name}"?`)) {
    store.deleteSheet(sheet._id)
  }
}

function picker() {
  store.openPicker()
}
</script>

<style scoped>
input:disabled + button {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

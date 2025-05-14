<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dine Google Sheets</h1>

    <ul v-if="store.list.length">
      <li
        v-for="sheet in store.list"
        :key="sheet._id"
        class="flex justify-between items-center py-2 border-b gap-4"
      >
        <div class="flex-1">
          <p class="font-medium">{{ sheet.name }}</p>
          <small class="text-gray-500"> {{ sheet.sheetUrl || 'Link mangler' }}</small>
        </div>

        <div class="flex gap-3">
          <RouterLink
            :to="`/sheets/${sheet._id}`"
            class="text-blue-600 underline text-sm"
          >
            Åbn
          </RouterLink>

          <button
            class="text-green-600 text-sm hover:underline"
            @click="sync(sheet)"
          >
            Sync
          </button>

          <button
            class="text-red-500 text-sm hover:underline"
            @click="remove(sheet)"
          >
            Slet
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-gray-500">Ingen ark fundet.</p>

    <div class="mt-6">
      <button
        @click="addSheet"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        ➕ Opret nyt ark
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSheetsStore } from '@/modules/sheets/store'
import type { Sheet } from '@/modules/sheets/interfaces/Sheet'

const store = useSheetsStore()

onMounted(() => {
  store.loadAll()
})

function sync(sheet: Sheet) {
  store.syncSheetToDb(sheet)
}

function remove(sheet: Sheet) {
  if (confirm(`Er du sikker på, at du vil slette arket "${sheet.name}"?`)) {
    store.deleteSheet(sheet._id)
  }
}

function addSheet() {
  store.openPicker()
}
</script>

<style scoped>
li {
  transition: background 0.2s ease;
}
li:hover {
  background: #f3f4f6;
}
</style>

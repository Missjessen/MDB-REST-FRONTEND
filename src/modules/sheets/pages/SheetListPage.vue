<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dine Google Sheets</h1>

    <ul v-if="store.list.length">
      <li
        v-for="sheet in store.list"
        :key="sheet._id"
        class="flex justify-between items-center py-2 border-b"
      >
        <div>
          <p class="font-medium">{{ sheet.name }}</p>
          <small class="text-gray-500">{{ sheet.sheetUrl }}</small>
        </div>
        <RouterLink
          :to="`/sheets/${sheet._id}`"
          class="text-blue-600 underline"
        >
          Åbn
        </RouterLink>
      </li>
    </ul>

    <p v-else class="text-gray-500">Ingen ark fundet.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSheetsStore } from '@/modules/sheets/store'

const store = useSheetsStore()

onMounted(() => {
  store.loadAll()
})
</script>

<style scoped>
li {
  transition: background 0.2s ease;
}
li:hover {
  background: #f3f4f6;
}
</style>
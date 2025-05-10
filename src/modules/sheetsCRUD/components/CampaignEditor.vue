<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Rediger kampagner</h3>

    <div v-if="campaigns.loading">Indlæser kampagner...</div>
    <div v-if="campaigns.error" class="text-red-500">{{ campaigns.error }}</div>

    <div
      v-for="(campaign) in campaigns.list"
      :key="campaign._id"
      class="mb-4 p-4 border rounded"
    >
      <label class="block mb-1 font-medium">Navn</label>
      <input v-model="campaign.name" class="input" />

      <label class="block mt-2 mb-1 font-medium">Status</label>
      <select v-model="campaign.status" class="input">
        <option value="ENABLED">Aktiv</option>
        <option value="PAUSED">Sat på pause</option>
      </select>

      <label class="block mt-2 mb-1 font-medium">Budget</label>
      <input type="number" v-model.number="campaign.budget" class="input" />

      <div class="mt-4 flex gap-2">
        <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          @click="saveCampaign(campaign)"
        >
          Gem
        </button>
        <button
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          @click="removeCampaign(campaign._id)"
        >
          Slet
        </button>
      </div>
    </div>

    <div class="mt-8">
      <h4 class="text-md font-semibold mb-2">Ny kampagne</h4>
      <input v-model="newCampaign.name" placeholder="Navn" class="input mb-2" />
      <select v-model="newCampaign.status" class="input mb-2">
        <option value="ENABLED">Aktiv</option>
        <option value="PAUSED">Sat på pause</option>
      </select>
      <input type="number" v-model.number="newCampaign.budget" placeholder="Budget" class="input mb-2" />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="createCampaign()"
      >
        + Opret kampagne
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCampaignStore } from '@/modules/sheetsCRUD/stores/campaignStore'

const props = defineProps<{ sheetId: string }>()
const campaigns = useCampaignStore()
import type { CampaignDef } from '../../sheetsCRUD/interfaces/CampaignDef'

const newCampaign = ref<Partial<CampaignDef>>({
  name: '',
  status: 'ENABLED',
  budget: 0
})

onMounted(async () => {
  if (!props.sheetId) return
  campaigns.setSheetIds(props.sheetId, '')
  await campaigns.loadAll()
})

async function saveCampaign(campaign: any) {
  try {
    await campaigns.save(campaign)
    alert('Kampagne opdateret')
  } catch {
    alert('Kunne ikke gemme kampagnen')
  }
}

async function removeCampaign(campaignId: string) {
  try {
    await campaigns.remove(campaignId)
    alert('Kampagne slettet')
  } catch {
    alert('Kunne ikke slette kampagnen')
  }
}



async function createCampaign() {
  try {
    await campaigns.create({ ...newCampaign.value })
    newCampaign.value = { name: '', status: 'ENABLED', budget: 0 }
    alert('Ny kampagne oprettet')
  } catch {
    alert('Kunne ikke oprette kampagnen')
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
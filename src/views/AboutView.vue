<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-center">Om WomBat</h1>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Formål</h2>
      <p class="text-gray-700 leading-relaxed">
        WomBat integrerer Google Sheets med en MongoDB-backend og
en Google Ads API, så du kan oprette og administrere kampagne-data
på ét sted. Platformen gør det nemt at synkronisere data til og fra
dine ark samt udrulle ændringer direkte til Google Ads via batch-opkald.
      </p>
    </section>

    <section class="grid gap-6 md:grid-cols-2">
      <div class="bg-white p-6 rounded-2xl shadow-sm">
        <h3 class="text-xl font-medium mb-2">Hovedfunktioner</h3>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>✅ Opret, hent, opdater og slet Google Sheets</li>
          <li>🔄 Synkroniser kampagner, annoncer & søgeord</li>
          <li>🚀 Push ressourcer til Google Ads API</li>
          <li>📊 Interaktiv dokumentation via Swagger UI</li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm">
        <h3 class="text-xl font-medium mb-2">Teknologi-stack</h3>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>Node.js, Express & Mongoose</li>
          <li>Vue 3, Pinia & Vite</li>
          <li>Google APIs: Sheets, Drive, Ads</li>
          <li>JWT + OAuth 2.0 for sikkerhed</li>
        </ul>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Opsætning</h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-2">
        <li>Opret et projekt i Google Cloud Console og aktiver Sheets, Drive & Ads-API’er.</li>
        <li>Konfigurer OAuth 2.0 credentials med korrekt redirect URI.</li>
        <li>Indsæt CLIENT_ID, CLIENT_SECRET og developerKey i din <code>.env</code>:</li>
      </ol>
      <pre class="bg-gray-100 p-4 rounded"><code>
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_DEVELOPER_KEY=...
MONGODB_URI=...
JWT_SECRET=...
ALLOWED_ORIGINS=
      </code></pre>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Deployment</h2>
      <p class="text-gray-700 leading-relaxed">
        Byg frontend med <code>npm run build</code> og deploy på Netlify/Vercel.
        Kør backend på Render/Heroku med miljøvariable sat.
      </p>
    </section>

    <footer class="text-center text-gray-500 text-sm">
      <p>&copy; 2025 MDB REST – udviklet af Nanna Jessen</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Ingen særskilt logik endnu – kun statisk indhold
</script>

<style scoped>
/* Eventuelle justeringer for themes eller custom styles */
</style>

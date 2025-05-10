import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vueDevTools(),
    createHtmlPlugin({}),
    vue(),
    tsconfigPaths()          // henter dine paths fra tsconfig.json
  ],
  resolve: {
    alias: {
      // peger @ → src-mappen
      '@': path.resolve(__dirname, 'src')
    },
    // for en sikkerheds skyld, tilføj disse extension‐lookup:
    extensions: ['.mjs','.js','.ts','.jsx','.tsx','.json','.vue']
  },
  server: {
    proxy: {
      // alt der rammer /api/* på 5173 videresendes til http://localhost:4000/api/*
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

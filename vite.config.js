import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = '/ApiSimpsons_2025IIg1_Vidal_Johnathan/';
export default defineConfig({
  plugins: [react()],
  base: repoName,
})

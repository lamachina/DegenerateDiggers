import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const external = ['@material-ui/core'];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  external
})

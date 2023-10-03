import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import fs from 'fs'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.development.local' })
}

let https = {};
if (process.env.SSL_KEY_FILE && process.env.SSL_CRT_FILE) {
  https = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    rejectUnauthorized: false, // Trust the self-signed certificate
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  server: {
    https: https,
  },
})
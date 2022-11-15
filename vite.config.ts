import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgrPlugin from "vite-plugin-svgr"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin({ svgrOptions: { icon: true } }), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

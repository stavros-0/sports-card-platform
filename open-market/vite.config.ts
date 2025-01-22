import { defineConfig } from 'vite'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

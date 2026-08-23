import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const root = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo from https://emre967.github.io/izakaya-zen/,
  // so every built asset URL needs the /izakaya-zen/ prefix.
  base: '/izakaya-zen/',
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
    },
  },
  build: {
    // Multi-page app: each HTML file is its own entry with its own React root,
    // instead of a single-page app with client-side routing. Keeps the existing
    // menu.html / hakkimizda.html / ... URLs working as real, separate pages on
    // GitHub Pages (no SPA-on-static-host rewrite tricks needed).
    rollupOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        menu: path.resolve(root, 'menu.html'),
        hakkimizda: path.resolve(root, 'hakkimizda.html'),
        rezervasyon: path.resolve(root, 'rezervasyon.html'),
        iletisim: path.resolve(root, 'iletisim.html'),
      },
    },
  },
})

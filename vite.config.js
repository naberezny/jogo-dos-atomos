import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativo: funciona no GitHub Pages (/jogo-dos-atomos/) e localmente.
export default defineConfig({
  base: './',
  plugins: [react()],
  // No Windows o watcher às vezes perde gravações seguidas; polling evita tela velha.
  server: { watch: { usePolling: true, interval: 200 } },
});

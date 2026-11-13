import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativo: funciona no GitHub Pages (/jogo-dos-atomos/) e localmente.
export default defineConfig({
  base: './',
  plugins: [react()],
});

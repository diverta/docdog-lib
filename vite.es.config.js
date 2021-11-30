import { defineConfig } from 'vite';
const { resolve } = require('path');
import vue from '@vitejs/plugin-vue';
import libInjectCss from './libInjectCss';

// https://vitejs.dev/config/
export default defineConfig((settings) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main-es.js'),
      fileName: 'docdog-lib',
      formats: ['es'],
    },
    outDir: 'dist/es',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), libInjectCss()],
}));

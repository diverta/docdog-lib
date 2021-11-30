import { defineConfig } from 'vite';
const { resolve } = require('path');
import vue from '@vitejs/plugin-vue';
import libInjectCss from './libInjectCss';

// https://vitejs.dev/config/
export default defineConfig((settings) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main-iife.js'),
      name: 'docdog-lib.iife.js',
      formats: ['iife'],
    },
    outDir: 'dist/iife',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), libInjectCss()],
}));

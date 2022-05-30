// This is not directly a Vite config file : it is meant to export a configuration function as a preset of Vite's defineConfig for IIFE type build, used by multiple libraries

const { resolve } = require('path');
import vue from '@vitejs/plugin-vue';
//import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default function defineConfigIife(settings, keyname) {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, `src/main-${keyname}.iife.js`),
        name: `docdog-${keyname}.iife.js`,
        fileName: (format) => `docdog-${keyname}.${format}.js`,
        formats: ['iife'],
      },
      outDir: `dist/iife/${keyname}`,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return `docdog-${keyname}.css`;
            return assetInfo.name;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [vue()],
  };
}

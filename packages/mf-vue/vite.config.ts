import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('mf-'),
      },
    },
  })],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'mf-vue-about',
      fileName: 'mf-vue-about',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
    cssCodeSplit: false,
  },
});


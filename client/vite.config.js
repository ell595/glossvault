import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';

export default defineConfig({
    server: {
        hmr: {
            host: "0.0.0.0",
        },
        port: 3000,
        host: true,
    },
    plugins: [
        vue(),
        laravel({
            input: [
                'src/main.js',
                'src/assets/styles.css'
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            input: ['src/main.js', './index.html']
          },
          output:
          {
              format: 'es',
              strict: false,
              entryFileNames: "main.js",
              dir: 'dist/'
          }
    },
});

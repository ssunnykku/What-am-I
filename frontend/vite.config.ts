import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePluginHtmlEnv(),
    react(),
    tsconfigPaths(),
    VitePluginHtmlEnv({
      compiler: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});

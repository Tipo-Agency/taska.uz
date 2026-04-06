import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    /** Локально `/api/*` → tipa (как nginx в проде). */
    proxy: {
      '/api': {
        target: 'https://tipa.taska.uz',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /**
         * React / router / Helmet отдельно от прикладного кода.
         * framer-motion + lucide — самые тяжёлые UI-зависимости.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('lucide-react')) return 'lucide';
          if (id.includes('react-router')) return 'react-router';
          if (id.includes('react-helmet-async')) return 'react-helmet-async';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react';
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-maskable.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Taska.uz',
        short_name: 'Taska.uz',
        description: 'CRM, ERP и автоматизация бизнеса в Узбекистане',
        theme_color: '#2C7E20',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,svg,ico,png,jpg,jpeg,webp,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});

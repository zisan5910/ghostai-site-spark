
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'profile.jpg', 'Resume.pdf'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,pdf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/github\.com\/.*\.png$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Md Ridoan Mahmud Zisan',
        short_name: 'Md Ridoan Mahmud Zisan',
        description: 'Portfolio of Md Ridoan Mahmud Zisan - Offline Ready',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'browser', // Changed from 'standalone' to 'browser' to discourage installation
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'https://github.com/RidoanDev.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'https://github.com/RidoanDev.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
  server: {
    port: 8080,
  },
  build: {
    sourcemap: true,
  },
});

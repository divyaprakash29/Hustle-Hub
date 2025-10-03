import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'HustleHub',
        short_name: 'HH',
        description: 'Job Portal for freelancers.',
        start_url: './',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
          {
            src: './assets/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: './assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './assets/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          // Caching static assets
          {
            urlPattern: ({ url }) => url.pathname.includes('assets'),
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.html'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          // Caching GET requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/'),
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'api-get-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling POST requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/'),
            handler: 'NetworkFirst', // Avoid caching for POST requests, but you can change this.
            method: 'POST',
            options: {
              cacheName: 'api-post-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling PUT requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/'),
            handler: 'NetworkOnly', // PUT requests should generally not be cached.
            method: 'PUT',
            options: {
              cacheName: 'api-put-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling DELETE requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/'),
            handler: 'NetworkOnly', // DELETE requests should generally not be cached.
            method: 'DELETE',
            options: {
              cacheName: 'api-delete-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/user/'),
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'api-get-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling POST requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/user/'),
            handler: 'NetworkFirst', // Avoid caching for POST requests, but you can change this.
            method: 'POST',
            options: {
              cacheName: 'api-post-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling PUT requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/user/'),
            handler: 'NetworkOnly', // PUT requests should generally not be cached.
            method: 'PUT',
            options: {
              cacheName: 'api-put-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Handling DELETE requests for APIs
          {
            urlPattern: ({ url }) => url.pathname.includes('/api/user/'),
            handler: 'NetworkOnly', // DELETE requests should generally not be cached.
            method: 'DELETE',
            options: {
              cacheName: 'api-delete-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});

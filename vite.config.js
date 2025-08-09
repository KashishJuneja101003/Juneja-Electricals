import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Juneja Electricals',
        short_name: 'JE',
        description: 'Buy electrical appliances from Juneja Electricals online.',
        theme_color: '#27548a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/BusinessLogo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/BusinessLogo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin && url.pathname.endsWith('.png'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    }
  }
})

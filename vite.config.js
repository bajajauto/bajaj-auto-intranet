import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

/* brand-dark: the status bar and launch screen colour once installed. */
const APP_THEME = '#133E82'

export default defineConfig({
  plugins: [
    react(),
    /*
     * Makes the build installable, which is what lets IT publish it into the
     * Android work profile as a Managed Google Play web app. Off in `npm run
     * dev` (the plugin's default), so the smoke scripts never meet a stale
     * service worker.
     */
    VitePWA({
      // A new deploy takes over on the next launch. There is no in-app
      // "update available" prompt to build or to ignore.
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'],
      manifest: {
        id: '/',
        name: 'Bajaj One',
        short_name: 'Bajaj One',
        description: 'Bajaj Auto intranet — news, self-service, letters and forms.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: APP_THEME,
        theme_color: APP_THEME,
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // The app shell only. Policies alone are ~64 MB of PDFs and
        // spreadsheets; precaching them would download all of it to every
        // phone on install.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        globIgnores: ['policies/**', 'forms/**', 'vehicles/**'],
        // The `three` chunk is over Workbox's 2 MB default.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Every navigation — `/auth/callback` included — is the SPA. MSAL
        // reads the redirect response from the URL, not from the server.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // The 360° spin frames: fetched on first view, then kept.
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/vehicles/'),
            handler: 'CacheFirst',
            options: { cacheName: 'vehicle-frames', expiration: { maxEntries: 200 } },
          },
        ],
        // API calls and Entra sign-in are cross-origin and never cached.
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor'
          return undefined
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

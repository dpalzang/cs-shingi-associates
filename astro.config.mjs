// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  site: 'https://cs-singhi-associates.vercel.app',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    tailwind(), 
    keystatic(), 
    react()
  ],
  vite: {
    optimizeDeps: {
      include: ['lodash/debounce', 'lodash/throttle', 'direction'],
    },
  },
  server: {
    host: true
  }
});
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'static', // Keystatic works fine with 'static'
  integrations: [
    tailwind(),
    react(), // <--- Make sure React is here
    keystatic()
  ],
});
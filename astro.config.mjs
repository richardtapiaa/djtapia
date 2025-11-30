// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'animation-libs': ['gsap', 'aos', 'motion'],
            'three-vendor': ['three'],
          }
        }
      },
     
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, 
          drop_debugger: true,
        }
      }
    },
    
    assetsInlineLimit: 4096, 
  },

  integrations: [react()],

  
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },

 
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
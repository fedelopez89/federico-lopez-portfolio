import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    visualizer({
      filename: './bundle-stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    minify: 'esbuild',
    target: 'es2015',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Object-form entries only match the bare package entry point, so
        // react-dom (a subpath import) ended up in the main chunk. Match by
        // package directory instead.
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return undefined;
          const inPackage = (...names: string[]) =>
            names.some((name) => id.includes(`/node_modules/${name}/`));
          if (inPackage('react', 'react-dom', 'scheduler'))
            return 'vendor-react';
          if (inPackage('framer-motion', 'motion-dom', 'motion-utils'))
            return 'vendor-motion';
          if (inPackage('styled-components')) return 'vendor-styled';
          if (inPackage('i18next', 'react-i18next')) return 'vendor-i18n';
          return undefined;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

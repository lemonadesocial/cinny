import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wasm } from '@rollup/plugin-wasm';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';
import dts from 'vite-plugin-dts';
import { svgLoader } from './viteSvgLoader';

const copyFiles = {
  targets: [
    {
      src: 'node_modules/@matrix-org/olm/olm.wasm',
      dest: '',
    },
    {
      src: '_redirects',
      dest: '',
    },
    {
      src: 'config.json',
      dest: '',
    },
    {
      src: 'public/res/android',
      dest: 'public/',
    }
  ],
}

export default defineConfig({
  appType: 'spa',
  publicDir: false,
  base: "",
  server: {
    port: 8080,
    host: true,
  },
  plugins: [
    dts(),
    viteStaticCopy(copyFiles),
    vanillaExtractPlugin(),
    svgLoader(),
    wasm(),
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          // Enable esbuild polyfill plugins
          NodeGlobalsPolyfillPlugin({
            process: false,
            buffer: true,
          }),
        ]
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lemonade/lib.ts'),
      name: 'Cinny',
      fileName: 'cinny',
      formats: ['es'],
    },
    outDir: 'dist/lib',
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
      plugins: [
        inject({ Buffer: ['buffer', 'Buffer'] }),
      ]
    }
  },
});

import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@dakoda', replacement: path.resolve(__dirname, '../../@erikdakoda') },
      { find: '@erikdakoda', replacement: path.resolve(__dirname, '../../@erikdakoda') },
    ],
  },
  test: {
    globals: true,
    setupFiles: ['dotenv/config'],
  },
});

console.log(path.resolve(__dirname, '../../@erikdakoda/'));

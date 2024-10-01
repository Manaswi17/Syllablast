import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path for alias resolution

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8', // Use v8 for coverage (default)
      reporter: ['text', 'text-summary', 'html'], // Generates text (tabular) and HTML reports
      all: true, // Include all files in the coverage report
      include: ['src/**/*.{js,ts,jsx,tsx}'], // Adjust to your source folder
      exclude: [
        'src/app/layout.tsx', // Exclude layout.tsx from coverage
        'src/app/page.tsx'         // Exclude page.tsx from coverage
      ]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias setup
    },
  },
});

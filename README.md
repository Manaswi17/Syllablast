Introduction: This is a setup guide for the Syllablast game project. The steps below will help you install all required dependencies, run tests, and generate a test coverage report. You'll start by creating the project structure, installing dependencies, and then running the commands.

# Installation required : 
1. React and React DOM
2. Typescript
3. Tailwind CSS
4. Testing Library : Vitest (npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom)and jest-dom matchers (npm install --save-dev @testing-library/jest-dom)
5. Vitest coverage tool.

# Step 1: Create the Project Directory and Place the src Folder
mkdir syllablastgame
cd syllablastgame

# Step 2: Create package.json
npm init -y

Open package.json and add the following content (overwrite if necessary)
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "coverage": "vitest run --coverage"
  },

# Step 3: Create vitest.config.ts

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


# Step 4: Install Dependencies
npm install

# Step 5: Run the Tests
npm run test

# Step 6: Generate the Test Coverage Report (Need to run this command as changes done in package.json)
npm run coverage

# Step 7: Run the Development Server
npm run dev

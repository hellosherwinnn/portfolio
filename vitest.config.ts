/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/content/**/*.test.ts'],
    passWithNoTests: true,
  },
});

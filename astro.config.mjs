import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserSite = repository === `${owner}.github.io`;
const isProductionBuild = process.env.npm_lifecycle_event === 'build';

export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'always' },
  site: owner ? `https://${owner}.github.io` : 'http://localhost:4321',
  base: isProductionBuild && repository && !isUserSite ? `/${repository}` : '/',
});

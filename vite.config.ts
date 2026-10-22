import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isUserSite = repositoryName?.toLowerCase() === `${repositoryOwner?.toLowerCase()}.github.io`;
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserSite
  ? `/${repositoryName}/`
  : '/';

export default defineConfig({ base, plugins: [react()] });

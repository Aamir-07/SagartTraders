import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  base: isGithubActions && repositoryName ? `/${repositoryName}/` : '/',
  plugins: [react()],
})

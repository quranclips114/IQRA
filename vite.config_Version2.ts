import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/IQRA/', // required for GitHub Pages under username.github.io/IQRA/
  plugins: [react()],
})
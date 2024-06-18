import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import packageInfo from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/life-is-precious/',
  plugins: [vue()],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageInfo.version),
    'import.meta.env.VITE_APP_NAME': JSON.stringify(packageInfo.name),
    'import.meta.env.VITE_APP_AUTHOR': JSON.stringify(packageInfo.author),
    'import.meta.env.VITE_APP_DESCRIPTION': JSON.stringify(
      packageInfo.description,
    ),
  },
});

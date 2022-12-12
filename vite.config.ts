import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readdirSync, statSync, writeFile } from 'fs';
import path, { join } from 'path';

function getDirectories(path: string) {
  return readdirSync(path).filter(function (file) {
    return statSync(join(path, file)).isDirectory();
  });
}

function createTypeDefinitions(path: string) {
  const filenames = readdirSync(path).filter(function (file) {
    return !statSync(join(path, file)).isDirectory() && file.endsWith('.svg');
  });
  const iconName = filenames.map(filename => `'${filename.slice(0, -4)}'`).join('|');
  writeFile('./src/build.d.ts', `type IconName = ${iconName};`, (err) => {
    if(err) {
      return console.error('Failed to create build definition file', err);
    }
    // eslint-disable-next-line no-console
    console.log('Build definition file created!');
  });
}

createTypeDefinitions('src/icons');
const srcDirs = getDirectories(path.resolve(__dirname, 'src'));

// https://vitejs.dev/config/
export default defineConfig({
  base: '/js-playground/',
  plugins: [svelte()],
  publicDir: 'src/assets',
  resolve: {
    alias: {
      ...srcDirs.reduce((aliases, dir) => {
        aliases[dir] = path.resolve(__dirname, 'src', dir);
        return aliases;
      }, {}),
      '@Playground': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
});

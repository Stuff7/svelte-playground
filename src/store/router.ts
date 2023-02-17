import type { RouteKey } from '@Playground/routes';
import { writable } from 'svelte/store';

interface RouterState {
  playgroundKey: RouteKey | '',
  path: string,
}

function parsePath(href: string): string {
  return href.replace(/^\s*\/+|\/+\s*$/g, '');
}

function parsePlaygroundKey(path: string): RouterState['playgroundKey'] {
  return path.split('/', 1)[0] as RouteKey;
}

function getStateFromPathname(): RouterState {
  let path = parsePath(window.location.pathname);
  path = path.slice(path.indexOf('/') + 1);
  return {
    path: path.slice(path.indexOf('/') + 1),
    playgroundKey: parsePlaygroundKey(path),
  };
}

const basePath = '/js-playground';
const router = writable<RouterState>(getStateFromPathname());

window.addEventListener('popstate', () => router.set(getStateFromPathname()));

export const navigate = (href: string) => {
  const path = parsePath(href);
  const playgroundKey = parsePlaygroundKey(path);
  history.pushState({}, '', `${basePath}/${path}`);
  router.set({ playgroundKey, path: path.slice(path.indexOf('/') + 1) });
};

export default router;

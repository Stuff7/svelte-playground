import { writable } from 'svelte/store';

const basePath = '/js-playground';
const path = window.location.pathname;
const router = writable(path.slice(path.lastIndexOf('/') + 1));

window.addEventListener('popstate', () => router.set(window.location.pathname));

export const navigate = (href: string) => {
  const route = href.replace(/^\s*\/+|\/+\s*$/g, '');
  history.pushState({}, '', `${basePath}/${route}`);
  router.set(route);
};

export default router;

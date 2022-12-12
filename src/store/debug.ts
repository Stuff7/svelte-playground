import { writable } from 'svelte/store';

export interface DebugStore {
  errors: Error[];
}

export const initialState: DebugStore = {
  errors: [],
};

const debug = writable(initialState);

window.addEventListener('error', (ev) => {
  debug.update(store => ({
    errors: [...store.errors, ev.error],
  }));
});

window.addEventListener('unhandledrejection', (ev) => {
  debug.update(store => ({
    errors: [...store.errors, ev.reason],
  }));
});

export function clearErrors() {
  debug.set({ errors: [] });
}

export default debug;

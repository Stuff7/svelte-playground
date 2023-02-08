import { writable } from 'svelte/store';

export interface DebugStore {
  errors: Error[];
}

export const initialState: DebugStore = {
  errors: [],
};

const debug = writable(initialState);

window.addEventListener('error', (ev) => {
  debug.update(store => ev.error instanceof Error ? ({
    errors: [...store.errors, ev.error],
  }) : store);
});

window.addEventListener('unhandledrejection', (ev) => {
  debug.update(store => ev.reason instanceof Error ? ({
    errors: [...store.errors, ev.reason],
  }) : store);
});

export function clearErrors() {
  debug.set({ errors: [] });
}

export default debug;

import type { User } from 'api/models';
import { writable } from 'svelte/store';

export const ACCOUNT_STORE_KEY = 'Account';

export interface AccountStore {
  user: Option<User>,
}

export const initialState: AccountStore = {
  user: null,
};

const accountStore = writable(initialState);

export default accountStore;

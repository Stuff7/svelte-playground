import type { User } from 'api/models';
import { writable } from 'svelte/store';

export const ACCOUNT_STORE_KEY = 'Account';

export interface AccountStore {
  user: Option<User>,
  userFetched: boolean,
}

export const initialState: AccountStore = {
  user: null,
  userFetched: false,
};

const accountStore = writable(initialState);

export default accountStore;

import { getUser, pingServer } from 'api';
import { writable } from 'svelte/store';
import { getLocalItem, setLocalItem } from 'utils/local-storage';
import accountStore from './account';

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'AccessToken';

interface ServerStore {
  accessToken: Option<string>,
  awake: boolean,
}

export let accessToken: Option<string> = null;
export let awake = false;

const initialState: ServerStore = {
  accessToken,
  awake,
};

export const serverStore = writable(initialState);

export function setAccessToken(accessToken: Option<string>) {
  setLocalItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
  serverStore.update(store => ({ ...store, accessToken }));
}

export function setAwake(awake: boolean) {
  serverStore.update(store => ({ ...store, awake }));
}

serverStore.subscribe(async (store) => {
  accessToken = store.accessToken;
  awake = store.awake;
  if (awake && accessToken) {
    accountStore.set({ user: await getUser() });
  }
});

pingServer().then(setAwake);

{
  const ACCESS_TOKEN_PARAM_KEY = 'access_token';
  const params = new URLSearchParams(location.search);
  const accessToken = params.get(ACCESS_TOKEN_PARAM_KEY);
  if (accessToken) {
    setAccessToken(accessToken);
    params.delete(ACCESS_TOKEN_PARAM_KEY);
    location.search = params.toString();
  } else {
    setAccessToken(getLocalItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY));
  }
}

export default serverStore;

export let API_URL: string;
export let WS_URL: string;

if (import.meta.env.VITE_SOCKET_ADDRESS) {
  API_URL = `http://${import.meta.env.VITE_SOCKET_ADDRESS}`;
  WS_URL = `ws://${import.meta.env.VITE_SOCKET_ADDRESS}/ws`;
} else {
  API_URL = 'http://playground-api-production.up.railway.app';
  WS_URL = 'ws://playground-api-production.up.railway.app/ws';
}

if (crypto && !('randomUUID' in crypto)) {
  // https://stackoverflow.com/a/2117523/2800218
  // LICENSE: https://creativecommons.org/licenses/by-sa/4.0/legalcode
  (crypto as Crypto).randomUUID = function randomUUID() {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
      (c: number) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  };
}

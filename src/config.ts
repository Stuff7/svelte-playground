export let API_URL = 'http://localhost:5000';

if (import.meta.env.PROD) {
  API_URL = 'https://playground-api-production.up.railway.app';
}

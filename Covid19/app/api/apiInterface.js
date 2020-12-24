import { api } from './api';
import getHeaders from './headers';
import { userData } from '../utils/global';

const apiCall = (url, method, body, headers) => api(
  url,
  method,
  getHeaders(userData.authToken, headers),
  body,
);

export { apiCall };

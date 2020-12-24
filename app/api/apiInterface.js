import { api } from './api';
import getHeaders, { getHeadersWithMultipartContent } from './headers';
import { UserData } from '../utils/global';

const apiCall = (url, method, body, headers) => api(
  url,
  method,
  getHeaders(`bearer ${UserData.BearerToken}`, headers),
  body,
);

const apiCallWithMultipartContent = (url, method, body, headers) => api(
  url,
  method,
  getHeadersWithMultipartContent(`bearer ${UserData.BearerToken}`, headers),
  body,
);

export { apiCall, apiCallWithMultipartContent };


/* eslint no-unneeded-ternary: 0 */
import { currentAppVersion } from '../config/appConfig';

const getHeaders = (header, userHeaders) => {
  const headers = userHeaders ? userHeaders : {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'APK-VERSION': `${currentAppVersion}`,
  };
  return header ? {
    Authorization: header,
    'APK-VERSION': `${currentAppVersion}`,
    ...headers,
  } : headers;
};

const getHeadersWithMultipartContent = (header, userHeaders) => {
  const headers = userHeaders ? userHeaders : {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    APK_VERSION: 1.1,
  };
  return header ? {
    Authorization: header,
    APK_VERSION: 1.1,
    ...headers,
  } : headers;
};

export { getHeadersWithMultipartContent };
export default getHeaders;

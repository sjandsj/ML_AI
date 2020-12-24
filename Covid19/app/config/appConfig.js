import Environments from './environments.json';

const defaultEnvironment = 'production';

export const getBaseUrl = function () {
  return defaultEnvironment === 'production' ? Environments['production'].BASE_URL : Environments['staging'].BASE_URL;
};

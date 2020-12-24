import Environments from './environments.json';
import { UIColors } from '../utils/variables';

export const defaultEnvironment = 'staging';

export const currentAppVersion = '1.4';

export const getBaseUrl = function getBaseUrl() {
  switch (defaultEnvironment) {
    case 'local':
      return Environments.local.BASE_URL;
    case 'development':
      return Environments.development.BASE_URL;
    case 'staging':
      return Environments.staging.BASE_URL;
    case 'production':
      return Environments.production.BASE_URL;
    default:
      break;
  }
  return Environments.production.BASE_URL;
};

export const androidClientId = '92793569477-vj3ihosfsea9n8eiari9o7rq848bujom.apps.googleusercontent.com';
export const iosClientId = '92793569477-t3qav6vovgmdv880lujk4tj8mhgoblrj.apps.googleusercontent.com';

const DarkGray = 'rgb(31, 35, 41)';
const Black = UIColors.newAppFontWhiteColor;

export const color = {
  DarkGray,
  Black,
};

export const constant = {
  // ABLY_API_KEY: 'nBIjwg.qc-6vw:2gfDGqrkplT0FpTs', // production
  ABLY_API_KEY: 'LZiQKQ.u80ZQg:Peve_L0RTwG33GM0', // staging
  // ABLY_API_KEY: '0Znrig.wEoqMQ:O_K-W4rOUhXBJZIw', // staging temp
  OPEN_APP_FIRST_TIME: 'OPEN_APP_FIRST_TIME',
  SERVER_ERROR_MESSAGE: 'The request failed due to an internal error.',
  noInternetConnection: {
    header: 'No Internet Connection Available',
    message: 'Please check your internet connection.',
  },
  USER_DETAILS: 'USER_DETAILS',
};

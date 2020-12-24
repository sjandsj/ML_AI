/* eslint no-underscore-dangle: 0 */

import {
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILURE,
} from '../actions/responsibleGambling';

const initialState = {
  isLoading: false,
  settingsData: {},
  supportEmail: '',
  walletLimit: '',
};

function getSettings(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_SETTINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        settingsData: {},
        supportEmail: '',
      };
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        settingsData: action.response,
        supportEmail: action.response.message.support_email,
        walletLimit: action.response.message.user_wallet_limit,
      };
    case GET_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default getSettings;

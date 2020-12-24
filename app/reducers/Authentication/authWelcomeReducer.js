/* eslint no-underscore-dangle: 0 */

import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_FORGOT_PASSWORD,
  AUTH_WELCOME,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST,
  USER_LOGIN_STATUS,
} from '../../actions/authentication';
import { AuthWelcomeView } from '../../utils/enum';

const initialState = {
  currentAuthWelcomeView: AuthWelcomeView.AUTH_WELCOME,
  loginUserData: {},
  homeMenuData: [],
  userLoginStatus: false,
};

function authWelcomeReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_LOGIN,
      };

    case AUTH_SIGNUP:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_SIGNUP,
      };

    case AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_FORGOT_PASSWORD,
      };

    case AUTH_WELCOME:
      return {
        ...state,
        currentAuthWelcomeView: AuthWelcomeView.AUTH_WELCOME,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loginUserData: {},
        userLoginStatus: false,
      };
    case LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loginUserData: {},
        userLoginStatus: false,
        homeMenuData: [],
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loginUserData: action.data,
        userLoginStatus: true,
        homeMenuData: [],

      };
    case USER_LOGIN_STATUS:
      return {
        ...state,
        userLoginStatus: action.status,
      };
    default:
      return state;
  }
}

export default authWelcomeReducer;

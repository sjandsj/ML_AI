/* eslint no-underscore-dangle: 0 */

import {
  FORGOT_PASSWORD,
  PASSWORD_RECOVERY_CONFIRMATION,
  SECURITY_ANSWER_VERIFICATION,
  PASSWORD_RECOVERY_SUCCESS,
  RESET_LINK_CONFIRMATIONS,
  RESET_LINK_RECOVERY_SUCCESS,
  WELCOME,
} from '../../actions/authentication';
import { ForgotPasswordView } from '../../utils/enum';

const initialState = {
  currentForgotPasswordView: ForgotPasswordView.FORGOT_PASSWORD,
};

function forgotPasswordReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.FORGOT_PASSWORD,
      };

    case PASSWORD_RECOVERY_CONFIRMATION:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.PASSWORD_RECOVERY_CONFIRMATION,
      };

    case SECURITY_ANSWER_VERIFICATION:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.SECURITY_ANSWER_VERIFICATION,
      };

    case PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.PASSWORD_RECOVERY_SUCCESS,
      };

    case RESET_LINK_CONFIRMATIONS:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.RESET_LINK_CONFIRMATIONS,
      };

    case RESET_LINK_RECOVERY_SUCCESS:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.RESET_LINK_RECOVERY_SUCCESS,
      };

    case WELCOME:
      return {
        ...state,
        currentForgotPasswordView: ForgotPasswordView.WELCOME,
      };

    default:
      return state;
  }
}

export default forgotPasswordReducer;


import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  // SUBMIT_QUESTIONS_REQUEST,
  RSET_PASSWORD_LINK_REQUEST,
  // GET_USER_QUESTIONS_REQUEST,
  // userSecurityQuestionsSuccess,
  // userSecurityQuestionsFailed,
  openPasswordRecoverySuccessView,
  openResetLinkRecoverySuccessView,
  openForgotPasswordView,
  RESET_PASSWORD_MANUALLY_REQUEST,
} from '../../actions/authentication';
import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import {
  // getUserSecurityQuestionsUrl,
  // submitSecurityQuestionsUrl,
  resetPassword,
  resetPasswordLink,
} from '../../api/urls';
import { showPopupAlert } from '../../utils/showAlert';
import { authenticationLocalizedString } from '../../localization/authenticationLocalizeStrings';
import { isEmpty } from '../../utils/utils';
import Navigation from '../../utils/navigation';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
  showSuccessMessage,
} from '../APIHandler';

// Submit Reset Password Request
function* resetPasswordRequest(email) {
  const body = {
    email,
  };
  try {
    const response = yield call(
      apiCall,
      resetPassword,
      METHOD_TYPE.POST,
      JSON.stringify(body),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield put(openPasswordRecoverySuccessView());
    } else {
      showErrorMessage(response, parsedResponse);
    }
    yield put(hideLoader());
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

// Submit Reset Password Link Request
function* resetPasswordLinkRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      resetPasswordLink(action.email),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      showSuccessMessage(parsedResponse, authenticationLocalizedString.sentLinkToYourMail);
      yield put(openResetLinkRecoverySuccessView());
    } else {
      showErrorMessage(response, parsedResponse);
    }
    yield put(hideLoader());
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

// Submit Reset Password Request in app
function* resetPasswordInApp(actions) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      resetPassword,
      METHOD_TYPE.PATCH,
      actions.body,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      showPopupAlert(parsedResponse.message);
      Navigation.sharedInstance().popScreen();
    } else {
      showErrorMessage(response, parsedResponse);
    }
    yield put(hideLoader());
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

export default function* ForgotPasswordSaga() {
  yield all([
    takeLatest(RSET_PASSWORD_LINK_REQUEST, resetPasswordLinkRequest),
    takeLatest(RESET_PASSWORD_MANUALLY_REQUEST, resetPasswordInApp),
  ]);
}

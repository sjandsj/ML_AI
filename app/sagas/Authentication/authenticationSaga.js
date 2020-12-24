import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  GOOGLE_LOGIN_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  LOGOUT_REQUEST,
  logoutRequestSuccess,
  openLoginView,
  userLoginSucces,
  userLoginFailure,
  userLoginStatus,
} from '../../actions/authentication';

import { getProfileRequest, setProfileImage } from '../../actions/profile';

//
import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import {
  loginUserUrl,
  registerUserUrl,
  googleLoginUrl,
  facebookLoginUrl,
  userLogoutUrl,
} from '../../api/urls';

import { SCREENS } from '../../utils/av_constants';
import Navigation from '../../utils/navigation';
import constants from '../../utils/constants';
import { Storage } from '../../storage/storage';
import { UserData } from '../../utils/global';
import { logout } from '../../utils/utils_functions';

import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
  showSuccessMessage,
} from '../APIHandler';

// User Login Request
function setUserDetailsInPersitantStorage(parsedResponse) {
  const { user } = parsedResponse;
  Storage.setItemWithKeyAndValue(constants.APP_ACCESS_TOKEN, parsedResponse);
  Storage.setItemWithKeyAndValue(constants.USER_ID, user.id);
  Storage.setItemWithKeyAndValue(constants.USER_DISPLAY_NAME, user.username);
  Storage.setItemWithKeyAndValue(constants.USER_PROFILE_IMAGE_URL, user.profile_pic);
  Storage.setItemWithKeyAndValue(constants.USER_LIMIT, user.reality_check_limit);
}

function* loginRequestSuccess(parsedResponse) {

  yield put(hideLoader());
  const { user } = parsedResponse;
  yield put(setProfileImage(user.profile_pic, user.username));
  yield call(setUserDetailsInPersitantStorage, parsedResponse);
  UserData.user = user;
  UserData.BearerToken = parsedResponse.access_token;
  // TODO: Will remove with dashboard refactor code.
  yield put(userLoginSucces(parsedResponse));
  yield put(userLoginStatus(true));
  yield put(getProfileRequest());
  // Navigation.sharedInstance().pushToScreen('HomeScreen', { });
  const screen = 'DrawerStackAfterLogin';
  Navigation.sharedInstance().resetRouteName(
    screen,
    {
      isPortrait: true,
      // screenOrientation: screenProps.orientation,
    },
  );
}

function* loginRequestFailed(response, parsedResponse) {
  yield call(showErrorMessage, response, parsedResponse);
  yield put(hideLoader());
  yield put(userLoginStatus(false));
}

function* loginRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      loginUserUrl,
      METHOD_TYPE.POST,
      action.body,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      // TODO put response in user
      // UserData.user = parsedResponse;
      UserData.BearerToken = parsedResponse.access_token;
      yield call(loginRequestSuccess, parsedResponse);
    } else {
      yield put(userLoginFailure(parsedResponse));
      yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(userLoginFailure());
    showExceptionErrorMessage();
    yield put(userLoginStatus(false));
  }
}

// User Register Request
function* registerRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      registerUserUrl,
      METHOD_TYPE.POST,
      action.body,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      showSuccessMessage(parsedResponse);
      yield put(openLoginView());
    } else {
      showErrorMessage(response, parsedResponse);
    }
    yield put(hideLoader());
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

// Google Login
function* googleSigninRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      googleLoginUrl(action.accessToken),
      METHOD_TYPE.POST,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield call(loginRequestSuccess, parsedResponse);
    } else {
      yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

// Google Login
function* facebookLoginRequest(action) {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      facebookLoginUrl(action.accessToken),
      METHOD_TYPE.POST,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield call(loginRequestSuccess, parsedResponse);
    } else {
      yield call(loginRequestFailed, response, parsedResponse);
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}


function userLogoutRequestSuccess() {
  logout();
}

// User logout request
function* userLogoutRequest() {
  yield put(showLoader());
  try {
    const response = yield call(
      apiCall,
      userLogoutUrl,
      METHOD_TYPE.DELETE,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield call(userLogoutRequestSuccess);
      yield put(logoutRequestSuccess());
    } else {
      showErrorMessage(response, parsedResponse);
    }
    yield put(hideLoader());
  } catch (error) {
    showExceptionErrorMessage();
    yield put(hideLoader());
  }
}

export default function* AuthenticationSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginRequest),
    takeLatest(REGISTER_REQUEST, registerRequest),
    takeLatest(GOOGLE_LOGIN_REQUEST, googleSigninRequest),
    takeLatest(FACEBOOK_LOGIN_REQUEST, facebookLoginRequest),
    takeLatest(LOGOUT_REQUEST, userLogoutRequest),
  ]);
}

import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  GET_USER_LIMIT_REQUEST,
  getUserLimitSuccess,
  getUserLimitFailed,
  SET_USER_LIMIT_REQUEST,
  setUserLimitSuccess,
  setUserLimitFailed,
  GET_SETTINGS_REQUEST,
  getSettingsSuccess,
  getSettingsFailed,
} from '../../actions/responsibleGambling';
import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import { 
  logoutRequest,
} from '../../actions/authentication';
import { getUserLimitUrl, getSettingsUrl } from '../../api/urls';
import { showAlertWithPromiseHasSingleButton } from '../../utils/showAlert';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { logoutReason } from '../../utils/av_constants';
import { UserData } from '../../utils/global';

// Fetch Pool listing.
function* getUserLimit() {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getUserLimitUrl,
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    yield put(hideLoader());
    if (isSuccessAPI(response) && parsedResponse) {
      let poolResponse = [];
      if (!isEmpty(parsedResponse)) {
        poolResponse = parsedResponse;
      }
      yield put(getUserLimitSuccess(poolResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getUserLimitFailed(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getUserLimitFailed());
  }
}


function* setUserLimit(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getUserLimitUrl,
      METHOD_TYPE.PATCH,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    yield put(hideLoader());
    if (isSuccessAPI(response) && parsedResponse) {
      let poolResponse = [];
      if (!isEmpty(parsedResponse)) {
        poolResponse = parsedResponse;
      }
      // if (poolResponse.message.limit_type === 'timeout_limit') {
      //   // yield call(logoutFromApp);
      // } else {
      // showPopupAlertWithTitle('Alert!', poolResponse.message.description);
      const confirm = yield call(showAlertWithPromiseHasSingleButton, 'Alert!', poolResponse.message.description, 'Ok');
      if (confirm === 'ok') {
        if (poolResponse.message.limit_type === 'timeout_limit') {
          yield put(logoutRequest(logoutReason.SELF_EXCLUSION));
        } else {
          yield call(getUserLimit);
        }
      }
      yield put(setUserLimitSuccess(poolResponse));
      // }
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(setUserLimitFailed(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(setUserLimitFailed());
  }
}

function* getSettings() {
  try {
    // yield put(showLoader());
    const response = yield call(
      apiCall,
      getSettingsUrl,
      METHOD_TYPE.GET,
    );
    // yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let settingsResponse = {};
      if (!isEmpty(parsedResponse)) {
        settingsResponse = parsedResponse;
        UserData.UpdateOddsInterval = parsedResponse.message.odds_update_interval;
      }
      yield put(getSettingsSuccess(settingsResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getSettingsFailed(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getSettingsFailed());
  }
}

export default function* UserLimitSaga() {
  yield all([
    takeLatest(GET_USER_LIMIT_REQUEST, getUserLimit),
    takeLatest(SET_USER_LIMIT_REQUEST, setUserLimit),
    takeLatest(GET_SETTINGS_REQUEST, getSettings),
  ]);
}

import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall, apiCallWithMultipartContent } from '../../api/apiInterface';

import { isEmpty } from '../../utils/utils';
import { showPopupAlertWithTitle, showAlertWithPromise } from '../../utils/showAlert';

import {
  GET_PROFILE_REQUEST,
  getProfileSuccess,
  getProfileFailure,
  RESET_POFILE_REQUEST,
  resetProfileSuccess,
  resetProfileFailure,
  UPLOAD_KYC_IMAGE_REQUEST,
  uploadKycImageSuccess,
  uploadKycImageFailure,
} from '../../actions/profile';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';

import {
  getProfileUrl,
  updateProfileUrl,
  uploadKycImagesUrl,
} from '../../api/urls';

// import { SCREENS } from '../../utils/av_constants';
// import Navigation from '../../utils/navigation';
// import constants from '../../utils/constants';
// import { Storage } from '../../storage/storage';
// import { UserData } from '../../utils/global';

import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';

// edit profile
function* resetProfile(action) {
  try {
    const response = yield call(
      apiCall,
      updateProfileUrl,
      METHOD_TYPE.PATCH,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      showPopupAlertWithTitle('Success!', dataResponse.message);
      yield put(resetProfileSuccess(dataResponse));
    } else {
      yield put(resetProfileFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(resetProfileFailure());
  }
}

// upload kyc document
function* uploadKycImage(action) {
  try {
    const response = yield call(
      apiCallWithMultipartContent,
      uploadKycImagesUrl,
      METHOD_TYPE.POST,
      action.data,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(uploadKycImageSuccess(dataResponse));
    } else {
      yield put(uploadKycImageFailure(parsedResponse));
      showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(uploadKycImageFailure());
  }
}

// get profile
function* getProfile() {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getProfileUrl,
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getProfileSuccess(dataResponse));
    } else {
      yield put(getProfileFailure(parsedResponse));
      // showErrorMessage(response, parsedResponse);
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getProfileFailure());
  }
}

export default function* ProfileSaga() {
  yield all([
    takeLatest(GET_PROFILE_REQUEST, getProfile),
    takeLatest(RESET_POFILE_REQUEST, resetProfile),
    takeLatest(UPLOAD_KYC_IMAGE_REQUEST, uploadKycImage),
  ]);
}

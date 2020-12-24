import { call, takeLatest, put, all } from 'redux-saga/effects';
import _ from 'lodash';
import { apiCall } from '../../api/apiInterface';
import Navigation from '../../utils/navigation';

import { getCasinoUrl, getCasinoGameSessionUrl } from '../../api/urls';

import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlertWithTitle, showAlertWithPromise } from '../../utils/showAlert';
import {
  GET_LIVE_CASINO_REQUEST,
  getLiveCasinoSuccess,
  getLiveCasinoFailure,
  GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST,
  getLiveCasinoInitGameSessionSuccess,
  getLiveCasinoInitGameSessionFailure,
} from '../../actions/liveCasinoActions';
import { SCREENS } from '../../utils/av_constants';
import { encodeData } from '../../utils/utils_functions';

function* getLiveCasino(action) {
  try {
    const query = encodeData(action.data);
    const url = getCasinoUrl(query);
    yield put(showLoader());
    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getLiveCasinoSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getLiveCasinoFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getLiveCasinoFailure());
  }
}

function* getLiveCasinoInitGameSession(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getCasinoGameSessionUrl(action.uuid),
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = {};
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
        const gameUrl = dataResponse.url;
        if (gameUrl) {
          Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: gameUrl } });
        } else {
          showPopupAlertWithTitle('Error', 'Something went wrong. please try again later');
        }
        // this.props.navigation.navigate('WebViewScreen', { data: { url: dataResponse.url } });
      }
      yield put(getLiveCasinoInitGameSessionSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getLiveCasinoInitGameSessionFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getLiveCasinoInitGameSessionFailure());
  }
}


export default function* LiveCasinoSaga() {
  yield all([
    takeLatest(GET_LIVE_CASINO_REQUEST, getLiveCasino),
    takeLatest(GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST, getLiveCasinoInitGameSession),
  ]);
}

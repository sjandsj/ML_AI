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
import { showPopupAlertWithTitle, showAlertWithPromise, showPopupAlert } from '../../utils/showAlert';
import {
  GET_CASINO_REQUEST,
  getCasinoSuccess,
  getCasinoFailure,
  GET_CASINO_INIT_GAME_SESSION_REQUEST,
  getCasinoInitGameSessionSuccess,
  getCasinoInitGameSessionFailure,
} from '../../actions/casinoAction';
import { SCREENS } from '../../utils/av_constants';
import { encodeData } from '../../utils/utils_functions';

function* getCasino(action) {
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
      yield put(getCasinoSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getCasinoFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getCasinoFailure());
  }
}

function* getCasinoInitGameSession(action) {
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
      yield put(getCasinoInitGameSessionSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getCasinoInitGameSessionFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getCasinoInitGameSessionFailure());
  }
}


export default function* CasinoSaga() {
  yield all([
    takeLatest(GET_CASINO_REQUEST, getCasino),
    takeLatest(GET_CASINO_INIT_GAME_SESSION_REQUEST, getCasinoInitGameSession),
  ]);
}

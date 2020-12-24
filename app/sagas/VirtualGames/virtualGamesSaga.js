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
  GET_VIRTUAL_GAMES_REQUEST,
  getVirtualGamesSuccess,
  getVirtualGamesFailure,
  GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST,
  getVirtualGamesInitGameSessionSuccess,
  getVirtualGamesInitGameSessionFailure,
} from '../../actions/virtualGamesAction';
import { SCREENS } from '../../utils/av_constants';
import { encodeData } from '../../utils/utils_functions';

function* getVirtualGames(action) {
  try {
    const query = encodeData(action.data);
    const url = getCasinoUrl(action.data);
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
      yield put(getVirtualGamesSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getVirtualGamesFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getVirtualGamesFailure());
  }
}

function* getVirtualGamesInitGameSession(action) {
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
      yield put(getVirtualGamesInitGameSessionSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getVirtualGamesInitGameSessionFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getVirtualGamesInitGameSessionFailure());
  }
}


export default function* VirtualGamesSaga() {
  yield all([
    takeLatest(GET_VIRTUAL_GAMES_REQUEST, getVirtualGames),
    takeLatest(GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST, getVirtualGamesInitGameSession),
  ]);
}

import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  GET_LIVE_MATCHES_REQUEST,
  getLiveMatchesSuccess,
  getLiveMatchesFailure,
  ADD_TO_MY_FAVORITES_REQUEST,
  addToMyFavoritesSuccess,
  addToMyFavoritesFailure,
  REMOVE_FROM_MY_FAVORITES_REQUEST,
  removeFromMyFavoritesSuccess,
  removeFromMyFavoritesFailure,
  GET_MY_FAVORITES_REQUEST,
  getMyFavoritesSuccess,
  getMyFavoritesFailure,
  getLiveMatchesRequest,
  getMyFavoritesRequest,
} from '../../actions/liveBetting';

import {
  getLiveMatchesUrl,
  getFavoritesUrl,
  addToFavoritesUrl,
  removeFromFavoritesUrl,
} from '../../api/urls';
import { isEmpty } from '../../utils/utils';
import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlert, showPopupAlertWithTitle } from '../../utils/showAlert';

// Live MAtches

function* getLiveMatches(action) {
  try {
    if (!action.hideLoader) {
      yield put(showLoader());
    }
    const response = yield call(
      apiCall,
      getLiveMatchesUrl,
      METHOD_TYPE.GET,
    );
    if (!action.hideLoader) {
      yield put(hideLoader());
    }
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getLiveMatchesSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getLiveMatchesFailure(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getLiveMatchesFailure());
  }
}

// add to fav
function* addToFavorite(action) {
  try {
    if (!action.hideLoader) {
      yield put(showLoader());
    }
    const response = yield call(
      apiCall,
      addToFavoritesUrl(action.data.matchId),
      METHOD_TYPE.POST,
    );
    if (!action.hideLoader) {
      yield put(hideLoader());
    }
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      
      }
      yield put(addToMyFavoritesSuccess(dataResponse));
      yield put(getLiveMatchesRequest(true));
      yield put(getMyFavoritesRequest());
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(addToMyFavoritesFailure(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(addToMyFavoritesFailure());
  }
}

// remove from fav
function* removeFromFavaroite(action) {
  try {
    if (!action.hideLoader) {
      yield put(showLoader());
    }
    const response = yield call(
      apiCall,
      removeFromFavoritesUrl(action.data.matchId),
      METHOD_TYPE.DELETE,
    );
    if (!action.hideLoader) {
      yield put(hideLoader());
    }
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(removeFromMyFavoritesSuccess(dataResponse));
      yield put(getLiveMatchesRequest(true));
      yield put(getMyFavoritesRequest());
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(removeFromMyFavoritesFailure(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(removeFromMyFavoritesFailure());
  }
}

// get fav

function* getFavaroiteMatches(action) {
  try {
    if (!action.hideLoader) {
      yield put(showLoader());
    }
    const response = yield call(
      apiCall,
      getFavoritesUrl,
      METHOD_TYPE.GET,
    );
    if (!action.hideLoader) {
      yield put(hideLoader());
    }
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getMyFavoritesSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getMyFavoritesFailure(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getMyFavoritesFailure());
  }
}

export default function* LiveMatchesSaga() {
  yield all([
    takeLatest(GET_LIVE_MATCHES_REQUEST, getLiveMatches),
    takeLatest(ADD_TO_MY_FAVORITES_REQUEST, addToFavorite),
    takeLatest(REMOVE_FROM_MY_FAVORITES_REQUEST, removeFromFavaroite),
    takeLatest(GET_MY_FAVORITES_REQUEST, getFavaroiteMatches),
  ]);
}

import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  GET_COUNTRY_LIST_REQUEST,
  getCountryListSuccess,
  getCountryListFailure,
  GET_TOURNAMENT_LIST_REQUEST,
  getTournamentListSuccess,
  getTournamentListFailure,
  GET_MATCH_LIST_REQUEST,
  getMatchListSuccess,
  getMatchListFailure,
  GET_ALL_MARKETS_REQUEST,
  getAllMarketsSuccess,
  getAllMarketsFailure,
  GET_ALL_SPORTS_REQUEST,
  getAllSportsSuccess,
  getAllSportsFailure,
} from '../../actions/listsAction';
import { countryListUrl, getTournamentsInCountryUrl, getTournamentMatchesUrl, allMarketsUrl, getAllSportsUrl } from '../../api/urls';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlert, showPopupAlertWithTitle } from '../../utils/showAlert';

// sports list
function* getAllSports(action) {
  try {
    const response = yield call(
      apiCall,
      getAllSportsUrl,
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getAllSportsSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getAllSportsFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getAllSportsFailure());
  }
}

// country list

function* getCountryList(action) {
  try {
    const response = yield call(
      apiCall,
      countryListUrl(action.data.sportsId),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getCountryListSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getCountryListFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getCountryListFailure());
  }
}

// Get tournaments
function* getTournamentList(action) {
  try {
    const response = yield call(
      apiCall,
      getTournamentsInCountryUrl(action.data.countryId, action.data.sportsId),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getTournamentListSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTournamentListFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getTournamentListFailure());
  }
}
// get matches

function* getMatchesList(action) {
  try {
    const response = yield call(
      apiCall,
      getTournamentMatchesUrl(action.data.page, action.data.perPage, action.data.tournamentId, action.data.countryId, action.data.marketId),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getMatchListSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getMatchListFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getMatchListFailure());
  }
}

// Get all markets
function* getMarketsList(action) {
  try {
    const response = yield call(
      apiCall,
      allMarketsUrl,
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getAllMarketsSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getAllMarketsFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getAllMarketsFailure());
  }
}

export default function* ListSaga() {
  yield all([
    takeLatest(GET_ALL_SPORTS_REQUEST, getAllSports),
    takeLatest(GET_COUNTRY_LIST_REQUEST, getCountryList),
    takeLatest(GET_TOURNAMENT_LIST_REQUEST, getTournamentList),
    takeLatest(GET_MATCH_LIST_REQUEST, getMatchesList),
    takeLatest(GET_ALL_MARKETS_REQUEST, getMarketsList),
  ]);
}

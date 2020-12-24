import { call, takeLatest, put, all } from 'redux-saga/effects';
import _ from 'lodash';
import { apiCall } from '../../api/apiInterface';
import {
  GET_ACCOUNT_REQUEST,
  getAccountFundsRequest,
  getAccountFundsSuccess,
  getAccountFundsFailed,
} from '../../actions/dashboard';
import {
  showLoader,
  hideLoader,
} from '../../actions/loaderActions';
import { getProfileRequest } from '../../actions/profile';
import { getBetsRequest } from '../../actions/mainGamePlayAction';
import { getPendingComboBets } from '../../actions/dashboard';
import {
  getMarketsForMatchUrl,
  getMatchMarketsUrl,
  placeBetslipsUrl,
  getAccoundsFunds,
  getSportsUrl,
  getSportsHavingTournamentUrl,
  getSportsHavingTournamentInPlayUrl,
  getMyBetsUrl,
  getSingleBetsUrl,
  postCashoutUrl,
  getSportsHavingTournamentTodayUrl,
} from '../../api/urls';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlertWithTitle, showOptionAlert, showPopupAlert } from '../../utils/showAlert';
import {
  GET_SPORTS_REQUEST,
  GET_TOURNAMENTS_WITH_MATCHES_REQUEST,
  GET_TOURNAMENTS_WITH_MATCHES_INPLAY_REQUEST,
  getTournamentsWithMatchesInPlaySuccess,
  getTournamentsWithMatchesInPlayFailure,
  getSportsSuccess,
  getSportsFailure,
  getTournamentsWithMatchesSuccess,
  getTournamentsWithMatchesFailure,
  GET_MARKETS_FOR_SELECTED_MATCH_REQUEST,
  getMarketsForSelectedMatchSuccess,
  getMarketsForSelectedMatchFailure,
  POST_BETSLIP_REQUEST,
  postBetSlipsSuccess,
  postBetSlipsFailed,
  GET_BETS_REQUEST,
  getBetsSuccess,
  getBetsFailed,
  GET_MY_BETS_REQUEST,
  getMyBetsSuccess,
  getMyBetsFailed,
  onSelectSport,
  onBetSlipOddsChange,
  POST_CASHOUT_BET_REQUEST,
  postCashoutBetSuccess,
  postCashoutBetFailed,
  cashoutMismatchError,
  GET_TOURNAMENTS_WITH_MATCHES_TODAY_REQUEST,
  getTournamentsWithMatchesTodaySuccess,
  getTournamentsWithMatchesTodayFailure,
} from '../../actions/mainGamePlayAction';
import { marketDataUpdated } from '../../parser/marketParser';
import { currentAppVersion } from '../../config/appConfig';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import { updateApp } from '../../utils/utils_functions';
import { mainGAmePlayLocalizeString } from '../../localization/mainGamePlayLocalizeString';
import { UserData } from '../../utils/global';

// Post bet slip
function* postBetSlips(action) {
  try {
    const response = yield call(
      apiCall,
      placeBetslipsUrl(),
      METHOD_TYPE.POST,
      JSON.stringify(action.betsData),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      // yield put(getAccountFundsRequest());
      yield put(postBetSlipsSuccess(dataResponse));
      yield put(getProfileRequest());
      const data = {
        page: 0,
        perPage: 20,
        scope: 'pending',
      };
      yield put(getBetsRequest(data));
      const { accessToken } = UserData;
      const dataCombo = {
        page: 0,
        perPage: 20,
      };
      yield put(getPendingComboBets(
        accessToken,
        dataCombo,
      ));
      showPopupAlertWithTitle('Success!', dataResponse.message);
    } else {
      yield put(postBetSlipsFailed(parsedResponse));
      if (parsedResponse.reload_bet_slips) {
        if (parsedResponse.errors && typeof parsedResponse.errors === 'object') {
          showPopupAlertWithTitle('Error!', parsedResponse.errors[0]);
        }
        if (parsedResponse.errors && typeof parsedResponse.errors === 'string') {
          showPopupAlertWithTitle('Error!', parsedResponse.errors);
        }
        yield put(onBetSlipOddsChange());
      } else if (parsedResponse.message && typeof parsedResponse.message === 'object') {
        showPopupAlertWithTitle('Error!', parsedResponse.message[0].errors[0]);
      } else if (parsedResponse.message && typeof parsedResponse.message === 'object') {
        showPopupAlertWithTitle('Error!', parsedResponse.message[0][0].errors[0]);
      } else if (parsedResponse.message) {
        showPopupAlertWithTitle('Error!', parsedResponse.message);
      } else {
        showErrorMessage(response, parsedResponse);
      }
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(postBetSlipsFailed());
  }
}

// post Cashout Bet
function* postCashoutBet(action) {
  try {
    const response = yield call(
      apiCall,
      postCashoutUrl,
      METHOD_TYPE.POST,
      JSON.stringify(action.data),
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      showPopupAlertWithTitle('Success!', dataResponse.message);
      yield put(postCashoutBetSuccess(dataResponse, action.betType, action.data));
      yield put(getProfileRequest());
    } else {
      yield put(postCashoutBetFailed(parsedResponse));
      if (parsedResponse.errors === 'cashoutable_mismatch_error') {
        yield put(cashoutMismatchError(parsedResponse, action.betType, action.data));
      }
      showPopupAlertWithTitle('Error!', parsedResponse.message);
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(postCashoutBetFailed());
  }
}

// Fetch Account fund
function* getAccountFunds() {
  try {
    const response = yield call(
      apiCall,
      getAccoundsFunds,
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getAccountFundsSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getAccountFundsFailed(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getAccountFundsFailed());
  }
}

// Fetch Bets list
function* getBets(action) {
  try {
    const response = yield call(
      apiCall,
      getSingleBetsUrl(action.data.page, action.data.perPage, action.scope),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield put(getBetsSuccess(parsedResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getBetsFailed(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getBetsFailed());
  }
}

// Fetch My Bets list
function* getMyBets(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getMyBetsUrl(action.data.page, action.data.perPage),
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      yield put(getMyBetsSuccess(parsedResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getMyBetsFailed(parsedResponse));
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getMyBetsFailed());
  }
}

function* getTournamentWithMatches(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getSportsHavingTournamentUrl(action.sportID),
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse.tournaments;
      }
      yield put(getTournamentsWithMatchesSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTournamentsWithMatchesFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getTournamentsWithMatchesFailure());
  }
}

function* getTournamentWithMatchesToday(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getSportsHavingTournamentTodayUrl(action.sportID),
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse.tournaments;
      }
      yield put(getTournamentsWithMatchesTodaySuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTournamentsWithMatchesTodayFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getTournamentsWithMatchesTodayFailure());
  }
}

function* getTournamentWithMatchesInPlay(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getSportsHavingTournamentInPlayUrl(action.sportID, action.scope),
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse.tournaments;
      }
      yield put(getTournamentsWithMatchesInPlaySuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTournamentsWithMatchesInPlayFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getTournamentsWithMatchesInPlayFailure());
  }
}

function* getSports() {
  try {
    yield put(showLoader());
    const response = yield call(
      apiCall,
      getSportsUrl,
      METHOD_TYPE.GET,
    );
    yield put(hideLoader());
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      if (parsedResponse.latest_apk_version && currentAppVersion !== parsedResponse.latest_apk_version) {
        showOptionAlert(
          commonLocalizeStrings.alert,
          commonLocalizeStrings.pleaseUpdate,
          commonLocalizeStrings.update,
          commonLocalizeStrings.cancel,
          text => text === 0 && updateApp(parsedResponse.parsedResponse),
        );
      }
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse.sports;
        const sport = _.first(dataResponse);
        yield put(onSelectSport(sport));
        yield call(getTournamentWithMatches, { sportID: 1 });
      }
      yield put(getSportsSuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getSportsFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getSportsFailure());
  }
}

function* getMarketsForMatch(action) {
  try {
    const url = getMatchMarketsUrl(action.matchID);
    // if (!action.hideLoader) {
    //   yield put(showLoader());
    // }
    yield put(showLoader());

    const response = yield call(
      apiCall,
      url,
      METHOD_TYPE.GET,
    );
    // if (!action.hideLoader) {
    // }
    yield put(hideLoader());

    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      const updatedMarket = marketDataUpdated(parsedResponse.markets);
      yield put(getMarketsForSelectedMatchSuccess({
        markets: updatedMarket,
        match_status: parsedResponse.match_status,
        running_score: parsedResponse.running_score,
        running_time: parsedResponse.running_time,
      }));
      if (parsedResponse.match_status === 'ended') {
        showPopupAlert(commonLocalizeStrings.matchFinshed);
      }
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getMarketsForSelectedMatchFailure());
    }
  } catch (error) {
    yield put(hideLoader());
    showExceptionErrorMessage();
    yield put(getMarketsForSelectedMatchFailure());
  }
}

export default function* DashboardSaga() {
  yield all([
    takeLatest(POST_BETSLIP_REQUEST, postBetSlips),
    takeLatest(POST_CASHOUT_BET_REQUEST, postCashoutBet),
    takeLatest(GET_ACCOUNT_REQUEST, getAccountFunds),
    takeLatest(GET_BETS_REQUEST, getBets),
    takeLatest(GET_MY_BETS_REQUEST, getMyBets),
    takeLatest(GET_SPORTS_REQUEST, getSports),
    takeLatest(GET_TOURNAMENTS_WITH_MATCHES_REQUEST, getTournamentWithMatches),
    takeLatest(GET_TOURNAMENTS_WITH_MATCHES_INPLAY_REQUEST, getTournamentWithMatchesInPlay),
    takeLatest(GET_TOURNAMENTS_WITH_MATCHES_TODAY_REQUEST, getTournamentWithMatchesToday),
    takeLatest(GET_MARKETS_FOR_SELECTED_MATCH_REQUEST, getMarketsForMatch),
  ]);
}

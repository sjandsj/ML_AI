import {
  getPendingBetsUrl,
  getResolvedBetsUrl,
  getPendingComboBetsUrl,
  getResolvedComboBetsUrl,
  getCashoutComboBetsUrl,
} from '../api/urls';
import { getApiAction } from '../api/actions/apiActions';

export const GET_SPORTS_REQUEST = 'GET_SPORTS_REQUEST';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'GET_SPORTS_FAILURE';

export const RESET_GET_SPORTS = 'RESET_GET_SPORTS';

export const GET_COUNTRY_REQUEST = 'GET_COUNTRY_REQUEST';
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE';

export const RESET_GET_COUNTRY = 'RESET_GET_COUNTRY';

export const GET_TOURNAMENT_REQUEST = 'GET_TOURNAMENT_REQUEST';
export const GET_TOURNAMENT_SUCCESS = 'GET_TOURNAMENT_SUCCESS';
export const GET_TOURNAMENT_FAILURE = 'GET_TOURNAMENT_FAILURE';

export const RESET_GET_TOURNAMENT = 'RESET_GET_TOURNAMENT';

export const MATCH_MARKET_REQUEST = 'MATCH_MARKET_REQUEST';
export const MATCH_MARKET_SUCCESS = 'MATCH_MARKET_SUCCESS';
export const MATCH_MARKET_FAILURE = 'MATCH_MARKET_FAILURE';

export const RESET_MATCH_MARKET = 'RESET_MATCH_MARKET';

export const GET_MATCHES_REQUEST = 'GET_MATCHES_REQUEST';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';

export const RESET_GET_MATCHES = 'RESET_GET_MATCHES';
export const RESET_GET_MATCHES_PROPS = 'RESET_GET_MATCHES_PROPS';

export const GET_SELECTED_MATCH_TEAM_REQUEST = 'GET_SELECTED_MATCH_TEAM_REQUEST';
export const GET_SELECTED_MATCH_TEAM_SUCCESS = 'GET_SELECTED_MATCH_TEAM_SUCCESS';
export const GET_SELECTED_MATCH_TEAM_FAILURE = 'GET_SELECTED_MATCH_TEAM_FAILURE';

export const RESET_GET_SELECTED_MATCH_TEAM = 'RESET_GET_SELECTED_MATCH_TEAM';

export const GET_MARKET_TYPE_FILTER_REQUEST = 'GET_MARKET_TYPE_FILTER_REQUEST';
export const GET_MARKET_TYPE_FILTER_SUCCESS = 'GET_MARKET_TYPE_FILTER_SUCCESS';
export const GET_MARKET_TYPE_FILTER_FAILURE = 'GET_MARKET_TYPE_FILTER_FAILURE';

export const RESET_GET_MARKET_TYPE_FILTER = 'RESET_GET_MARKET_TYPE_FILTER';

export const POST_BETSLIP_REQUEST = 'POST_BETSLIP_REQUEST';
export const POST_BETSLIP_SUCCESS = 'POST_BETSLIP_SUCCESS';
export const POST_BETSLIP_FAILURE = 'POST_BETSLIP_FAILURE';

export const RESET_POST_BETSLIP = 'RESET_POST_BETSLIP';

export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE';

export const RESET_GET_ACCOUNT = 'RESET_GET_ACCOUNT';

export const GET_BETS_REQUEST = 'GET_BETS_REQUEST';
export const GET_BETS_SUCCESS = 'GET_BETS_SUCCESS';
export const GET_BETS_FAILURE = 'GET_BETS_FAILURE';

export const RESET_GET_BETS = 'RESET_GET_BETS';
export const RESET_PERIOD_TYPE = 'RESET_PERIOD_TYPE';

export const GET_CASHOUT_COMBO_BETS_REQUEST = 'GET_CASHOUT_COMBO_BETS_REQUEST';
export const GET_CASHOUT_COMBO_BETS_SUCCESS = 'GET_CASHOUT_COMBO_BETS_SUCCESS';
export const GET_CASHOUT_COMBO_BETS_FAILURE = 'GET_CASHOUT_COMBO_BETS_FAILURE';

export const GET_PENDING_BETS_REQUEST = 'GET_PENDING_BETS_REQUEST';
export const GET_PENDING_BETS_SUCCESS = 'GET_PENDING_BETS_SUCCESS';
export const GET_PENDING_BETS_FAILURE = 'GET_PENDING_BETS_FAILURE';

export const GET_PENDING_COMBO_BETS_REQUEST = 'GET_PENDING_COMBO_BETS_REQUEST';
export const GET_PENDING_COMBO_BETS_SUCCESS = 'GET_PENDING_COMBO_BETS_SUCCESS';
export const GET_PENDING_COMBO_BETS_FAILURE = 'GET_PENDING_COMBO_BETS_FAILURE';

export const RESET_PENDING_BETS = 'RESET_PENDING_BETS';

export const GET_RESOLVED_BETS_REQUEST = 'GET_RESOLVED_BETS_REQUEST';
export const GET_RESOLVED_BETS_SUCCESS = 'GET_RESOLVED_BETS_SUCCESS';
export const GET_RESOLVED_BETS_FAILURE = 'GET_RESOLVED_BETS_FAILURE';

export const GET_RESOLVED_COMBO_BETS_REQUEST = 'GET_RESOLVED_COMBO_BETS_REQUEST';
export const GET_RESOLVED_COMBO_BETS_SUCCESS = 'GET_RESOLVED_COMBO_BETS_SUCCESS';
export const GET_RESOLVED_COMBO_BETS_FAILURE = 'GET_RESOLVED_COMBO_BETS_FAILURE';

export const RESET_RESOLVED_BETS = 'RESET_RESOLVED_BETS';

export const GET_LEADERBOARD_REQUEST = 'GET_LEADERBOARD_REQUEST';
export const GET_LEADERBOARD_SUCCESS = 'GET_LEADERBOARD_SUCCESS';
export const GET_LEADERBOARD_FAILURE = 'GET_LEADERBOARD_FAILURE';

export const RESET_GET_LEADERBOARD = 'RESET_GET_LEADERBOARD';

export const GET_LEADERBOARD_MATCH_REQUEST = 'GET_LEADERBOARD_MATCH_REQUEST';
export const GET_LEADERBOARD_MATCH_SUCCESS = 'GET_LEADERBOARD_MATCH_SUCCESS';
export const GET_LEADERBOARD_MATCH_FAILURE = 'GET_LEADERBOARD_MATCH_FAILURE';

export const RESET_GET_LEADERBOARD_MATCH = 'RESET_GET_LEADERBOARD_MATCH';

export const RESET_PROFILE_TOURNAMENT = 'RESET_PROFILE_TOURNAMENT';

export const POST_HOLD_BETSLIP_REQUEST = 'POST_HOLD_BETSLIP_REQUEST';
export const POST_HOLD_BETSLIP_SUCCESS = 'POST_HOLD_BETSLIP_SUCCESS';
export const POST_HOLD_BETSLIP_FAILURE = 'POST_HOLD_BETSLIP_FAILURE';

export const RESET_POST_HOLD_BETSLIP = 'RESET_POST_HOLD_BETSLIP';

// fetch tournament data
export const getTournamentsRequest = () => ({
  type: GET_TOURNAMENT_REQUEST,
});

export const getTournamentSuccess = response => ({
  type: GET_TOURNAMENT_SUCCESS,
  data: response,
});

export const getTournamentFailed = () => ({
  type: GET_TOURNAMENT_FAILURE,
});

export const postBetSlipsRequest = betsData => ({
  type: POST_BETSLIP_REQUEST,
  betsData,
});

export const postBetSlipsSuccess = response => ({
  type: POST_BETSLIP_SUCCESS,
  data: response,
});

export const postBetSlipsFailed = () => ({
  type: POST_BETSLIP_FAILURE,
});

// Fetch Account fund
export const getAccountFundsRequest = () => ({
  type: GET_ACCOUNT_REQUEST,
});

export const getAccountFundsSuccess = response => ({
  type: GET_ACCOUNT_SUCCESS,
  data: response,
});

export const getAccountFundsFailed = () => ({
  type: GET_ACCOUNT_FAILURE,
});

// Fetch Account fund
export const getBetsRequest = () => ({
  type: GET_BETS_REQUEST,
});

export const getBetsSuccess = response => ({
  type: GET_BETS_SUCCESS,
  data: response,
});

export const getBetsFailed = () => ({
  type: GET_BETS_FAILURE,
});

export const getPendingBets = (accessToken) => {
  const header = `bearer ${accessToken}`;
  return getApiAction({
    types: [GET_PENDING_BETS_REQUEST, GET_PENDING_BETS_SUCCESS, GET_PENDING_BETS_FAILURE],
    url: getPendingBetsUrl,
    header,
  });
};

export const getPendingComboBets = (accessToken, data) => {
  const header = `bearer ${accessToken}`;
  return getApiAction({
    types: [GET_PENDING_COMBO_BETS_REQUEST, GET_PENDING_COMBO_BETS_SUCCESS, GET_PENDING_COMBO_BETS_FAILURE],
    url: getPendingComboBetsUrl(data.page, data.perPage),
    header,
  });
};

export const getCashoutComboBets = (accessToken, data) => {
  const header = `bearer ${accessToken}`;
  return getApiAction({
    types: [GET_CASHOUT_COMBO_BETS_REQUEST, GET_CASHOUT_COMBO_BETS_SUCCESS, GET_CASHOUT_COMBO_BETS_FAILURE],
    url: getCashoutComboBetsUrl(data.page, data.perPage),
    header,
  });
};

export const resetPendingBets = () => ({
  type: RESET_PENDING_BETS,
});

export const getResolvedBets = (accessToken, data) => {
  const header = `bearer ${accessToken}`;
  return getApiAction({
    types: [GET_RESOLVED_BETS_REQUEST, GET_RESOLVED_BETS_SUCCESS, GET_RESOLVED_BETS_FAILURE],
    url: getResolvedBetsUrl(data.page, data.perPage),
    header,
  });
};

export const getResolvedComboBets = (accessToken, data) => {
  const header = `bearer ${accessToken}`;
  return getApiAction({
    types: [GET_RESOLVED_COMBO_BETS_REQUEST, GET_RESOLVED_COMBO_BETS_SUCCESS, GET_RESOLVED_COMBO_BETS_FAILURE],
    url: getResolvedComboBetsUrl(data.page, data.perPage),
    header,
  });
};

export const resetResolvedBets = () => ({
  type: RESET_RESOLVED_BETS,
});

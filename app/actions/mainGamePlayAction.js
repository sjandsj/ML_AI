export const GET_SPORTS_REQUEST = 'GET_SPORTS_REQUEST';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'GET_SPORTS_FAILURE';

export const GET_TOURNAMENTS_WITH_MATCHES_REQUEST = 'GET_TOURNAMENTS_WITH_MATCHES_REQUEST';
export const GET_TOURNAMENTS_WITH_MATCHES_SUCCESS = 'GET_TOURNAMENTS_WITH_MATCHES_SUCCESS';
export const GET_TOURNAMENTS_WITH_MATCHES_FAILURE = 'GET_TOURNAMENTS_WITH_MATCHES_FAILURE';

export const GET_TOURNAMENTS_WITH_MATCHES_INPLAY_REQUEST = 'GET_TOURNAMENTS_WITH_MATCHES_INPLAY_REQUEST';
export const GET_TOURNAMENTS_WITH_MATCHES_INPLAY_SUCCESS = 'GET_TOURNAMENTS_WITH_MATCHES_INPLAY_SUCCESS';
export const GET_TOURNAMENTS_WITH_MATCHES_INPLAY_FAILURE = 'GET_TOURNAMENTS_WITH_MATCHES_INPLAY_FAILURE';

export const GET_TOURNAMENTS_WITH_MATCHES_TODAY_REQUEST = 'GET_TOURNAMENTS_WITH_MATCHES_TODAY_REQUEST';
export const GET_TOURNAMENTS_WITH_MATCHES_TODAY_SUCCESS = 'GET_TOURNAMENTS_WITH_MATCHES_TODAY_SUCCESS';
export const GET_TOURNAMENTS_WITH_MATCHES_TODAY_FAILURE = 'GET_TOURNAMENTS_WITH_MATCHES_TODAY_FAILURE';

export const GET_MARKETS_FOR_SELECTED_MATCH_REQUEST = 'GET_MARKETS_FOR_SELECTED_MATCH_REQUEST';
export const GET_MARKETS_FOR_SELECTED_MATCH_SUCCESS = 'GET_MARKETS_FOR_SELECTED_MATCH_SUCCESS';
export const GET_MARKETS_FOR_SELECTED_MATCH_FAILURE = 'GET_MARKETS_FOR_SELECTED_MATCH_FAILURE';

export const POST_BETSLIP_REQUEST = 'POST_BETSLIP_REQUEST';
export const POST_BETSLIP_SUCCESS = 'POST_BETSLIP_SUCCESS';
export const POST_BETSLIP_FAILURE = 'POST_BETSLIP_FAILURE';

export const POST_CASHOUT_BET_REQUEST = 'POST_CASHOUT_BET_REQUEST';
export const POST_CASHOUT_BET_SUCCESS = 'POST_CASHOUT_BET_SUCCESS';
export const POST_CASHOUT_BET_FAILURE = 'POST_CASHOUT_BET_FAILURE';

export const CASHOUT_MISMATCH_ERROR = 'CASHOUT_MISMATCH_ERROR';

export const GET_BETS_REQUEST = 'GET_BETS_REQUEST';
export const GET_BETS_SUCCESS = 'GET_BETS_SUCCESS';
export const GET_BETS_FAILURE = 'GET_BETS_FAILURE';

export const GET_MY_BETS_REQUEST = 'GET_MY_BETS_REQUEST';
export const GET_MY_BETS_SUCCESS = 'GET_MY_BETS_SUCCESS';
export const GET_MY_BETS_FAILURE = 'GET_MY_BETS_FAILURE';

export const UPDATE_MARKETS = 'UPDATE_MARKETS';
export const UPDATE_SELECTED_MATCH_SCORE_AND_TIME = 'UPDATE_SELECTED_MATCH_SCORE_AND_TIME';

export const ON_MATCH_PRESS = 'ON_MATCH_PRESS';
export const ON_SELECT_SPORT = 'ON_SELECT_SPORT';
export const SET_BET_SLIPS = 'SET_BET_SLIPS';
export const DELETE_BET_SLIPS = 'DELETE_BET_SLIPS';
export const CLEAR_ALL_BET_SLIPS = 'CLEAR_ALL_BET_SLIPS';
export const SET_BET_SLIP_CONTAINER_VISIBILITY = 'SET_BET_SLIP_CONTAINER_VISIBILITY';
export const SET_TOURNAMENTS_FILTER_TYPE = 'SET_TOURNAMENTS_FILTER_TYPE';
export const SET_ENTER_STAKE_VALUE_IN_BET_SLIP = 'SET_ENTER_STAKE_VALUE_IN_BET_SLIP';
export const UPDATE_BET_SLIPS = 'UPDATE_BET_SLIPS';
export const ON_PLACED_BET_PRESSED = 'ON_PLACED_BET_PRESSED';
export const ON_BETSLIP_ODDS_CHANGE = 'ON_BETSLIP_ODDS_CHANGE';

export const getBetsRequest = data => ({
  type: GET_BETS_REQUEST,
  data,
  scope: data.scope ? data.scope : '',
});

export const getBetsSuccess = data => ({
  type: GET_BETS_SUCCESS,
  data,
});

export const getBetsFailed = () => ({
  type: GET_BETS_FAILURE,
});

export const getMyBetsRequest = data => ({
  type: GET_MY_BETS_REQUEST,
  data,
});

export const getMyBetsSuccess = data => ({
  type: GET_MY_BETS_SUCCESS,
  data,
});

export const getMyBetsFailed = () => ({
  type: GET_MY_BETS_FAILURE,
});

export const onPlacedBetPressed = () => ({
  type: ON_PLACED_BET_PRESSED,
});

export const postBetSlipsRequest = betsData => ({
  type: POST_BETSLIP_REQUEST,
  betsData,
});

export const postBetSlipsSuccess = response => ({
  type: POST_BETSLIP_SUCCESS,
  data: response,
});

export const postBetSlipsFailed = response => ({
  type: POST_BETSLIP_FAILURE,
  data: response,
});

export const postCashoutBetRequest = (data, betType) => ({
  type: POST_CASHOUT_BET_REQUEST,
  data,
  betType,
});

export const postCashoutBetSuccess = (response, betType, bet) => ({
  type: POST_CASHOUT_BET_SUCCESS,
  data: response,
  betType,
  bet,
});

export const postCashoutBetFailed = response => ({
  type: POST_CASHOUT_BET_FAILURE,
  data: response,
});

export const cashoutMismatchError = (response, betType, bet) => ({
  type: CASHOUT_MISMATCH_ERROR,
  data: response,
  betType,
  bet,
});

export const updateBetSlips = betSlips => ({
  type: UPDATE_BET_SLIPS,
  betSlips,
});

export const setEnterStakeValueInBetSlipVisiblity = isEnterStakeShow => ({
  type: SET_ENTER_STAKE_VALUE_IN_BET_SLIP,
  isEnterStakeShow,
});

export const setBetSlipContainerVisiblity = option => ({
  type: SET_BET_SLIP_CONTAINER_VISIBILITY,
  option,
});

export const setTournamentsFilterType = option => ({
  type: SET_TOURNAMENTS_FILTER_TYPE,
  option,
});


export const setBetSlips = betSlip => ({
  type: SET_BET_SLIPS,
  betSlip,
});

export const deleteBetSlips = betSlip => ({
  type: DELETE_BET_SLIPS,
  betSlip,
});

export const clearAllBetSlips = () => ({
  type: CLEAR_ALL_BET_SLIPS,
});

export const onPressMatch = (selectedMatch, selectedTournament) => ({
  type: ON_MATCH_PRESS,
  selectedMatch,
  selectedTournament,
});

export const onSelectSport = selectedSport => ({
  type: ON_SELECT_SPORT,
  selectedSport,
});

export const getSportsRequest = () => ({
  type: GET_SPORTS_REQUEST,
});

export const getSportsSuccess = data => ({
  type: GET_SPORTS_SUCCESS,
  data,
});

export const getSportsFailure = () => ({
  type: GET_SPORTS_FAILURE,
});

export const getTournamentsWithMatchesRequest = sportID => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_REQUEST,
  sportID,
});

export const getTournamentsWithMatchesSuccess = data => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_SUCCESS,
  data,
});

export const getTournamentsWithMatchesFailure = () => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_FAILURE,
});

export const getTournamentsWithMatchesInPlayRequest = (sportID, scope) => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_INPLAY_REQUEST,
  sportID,
  scope,
});

export const getTournamentsWithMatchesInPlaySuccess = data => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_INPLAY_SUCCESS,
  data,
});

export const getTournamentsWithMatchesInPlayFailure = () => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_INPLAY_FAILURE,
});

export const getTournamentsWithMatchesTodayRequest = (sportID, scope) => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_TODAY_REQUEST,
  sportID,
  scope,
});

export const getTournamentsWithMatchesTodaySuccess = data => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_TODAY_SUCCESS,
  data,
});

export const getTournamentsWithMatchesTodayFailure = () => ({
  type: GET_TOURNAMENTS_WITH_MATCHES_TODAY_FAILURE,
});

export const getMarketsForSelectedMatchRequest = (matchID, hideLoader) => (
  {
    type: GET_MARKETS_FOR_SELECTED_MATCH_REQUEST,
    matchID,
    hideLoader,
  });

export const getMarketsForSelectedMatchSuccess = data => ({
  type: GET_MARKETS_FOR_SELECTED_MATCH_SUCCESS,
  data,
});

export const getMarketsForSelectedMatchFailure = () => ({
  type: GET_MARKETS_FOR_SELECTED_MATCH_FAILURE,
});

export const updateMarkets = data => ({
  type: UPDATE_MARKETS,
  data,
});

export const updateSelectedMatchScoreAndTime = (score, time) => ({
  type: UPDATE_SELECTED_MATCH_SCORE_AND_TIME,
  score,
  time,
});

export const onBetSlipOddsChange = () => ({
  type: ON_BETSLIP_ODDS_CHANGE,
});

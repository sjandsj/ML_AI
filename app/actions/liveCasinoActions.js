export const GET_LIVE_CASINO_REQUEST = 'GET_LIVE_CASINO_REQUEST';
export const GET_LIVE_CASINO_SUCCESS = 'GET_LIVE_CASINO_SUCCESS';
export const GET_LIVE_CASINO_FAILURE = 'GET_LIVE_CASINO_FAILURE';
export const GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST = 'GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST';
export const GET_LIVE_CASINO_INIT_GAME_SESSION_SUCCESS = 'GET_LIVE_CASINO_INIT_GAME_SESSION_SUCCESS';
export const GET_LIVE_CASINO_INIT_GAME_SESSION_FAILURE = 'GET_LIVE_CASINO_INIT_GAME_SESSION_FAILURE';

export const LIVE_CASINO_ON_TAB_SELECT = 'LIVE_CASINO_ON_TAB_SELECT';
export const ON_LIVE_FREE_SPIN_SELECT = ' ON_LIVE_FREE_SPIN_SELECT';
export const ON_LIVE_LOBBY_SELECT = 'ON_LIVE_LOBBY_SELECT';
export const ON_LIVE_MOBILE_SELECT = 'ON_LIVE_MOBILE_SELECT';
export const SET_LIVE_PROVIDERS_SELECT = 'SET_LIVE_PROVIDERS_SELECT';


export const getLiveCasinoRequest = data => ({
  type: GET_LIVE_CASINO_REQUEST,
  data,
});

export const getLiveCasinoSuccess = data => ({
  type: GET_LIVE_CASINO_SUCCESS,
  data,
});

export const getLiveCasinoFailure = () => ({
  type: GET_LIVE_CASINO_FAILURE,
});

export const getLiveCasinoInitGameSessionRequest = uuid => ({
  type: GET_LIVE_CASINO_INIT_GAME_SESSION_REQUEST,
  uuid,
});

export const getLiveCasinoInitGameSessionSuccess = data => ({
  type: GET_LIVE_CASINO_INIT_GAME_SESSION_SUCCESS,
  data,
});

export const getLiveCasinoInitGameSessionFailure = () => ({
  type: GET_LIVE_CASINO_INIT_GAME_SESSION_FAILURE,
});

export const liveCasinoOnTabSelect = tab => ({
  type: LIVE_CASINO_ON_TAB_SELECT,
  tab,
});

export const onLiveFreeSpinSelect = () => ({
  type: ON_LIVE_FREE_SPIN_SELECT,
});

export const onLiveLobbySelect = () => ({
  type: ON_LIVE_LOBBY_SELECT,
});

export const onLiveMobileSelect = () => ({
  type: ON_LIVE_MOBILE_SELECT,
});

export const setLiveProvidersSelect = providersList => ({
  type: SET_LIVE_PROVIDERS_SELECT,
  providersList,
});
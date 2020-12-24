export const GET_CASINO_REQUEST = 'GET_CASINO_REQUEST';
export const GET_CASINO_SUCCESS = 'GET_CASINO_SUCCESS';
export const GET_CASINO_FAILURE = 'GET_CASINO_FAILURE';
export const GET_CASINO_INIT_GAME_SESSION_REQUEST = 'GET_CASINO_INIT_GAME_SESSION_REQUEST';
export const GET_CASINO_INIT_GAME_SESSION_SUCCESS = 'GET_CASINO_INIT_GAME_SESSION_SUCCESS';
export const GET_CASINO_INIT_GAME_SESSION_FAILURE = 'GET_CASINO_INIT_GAME_SESSION_FAILURE';
export const ON_TAB_SELECT = 'ON_TAB_SELECT';
export const ON_FREE_SPIN_SELECT = 'ON_FREE_SPIN_SELECT';
export const ON_LOBBY_SELECT = 'ON_LOBBY_SELECT';
export const ON_MOBILE_SELECT = 'ON_MOBILE_SELECT';
export const SET_PROVIDERS_SELECT = 'SET_PROVIDERS_SELECT';

export const getCasinoRequest = data => ({
  type: GET_CASINO_REQUEST,
  data,
});

export const getCasinoSuccess = data => ({
  type: GET_CASINO_SUCCESS,
  data,
});

export const getCasinoFailure = () => ({
  type: GET_CASINO_FAILURE,
});

export const getCasinoInitGameSessionRequest = uuid => ({
  type: GET_CASINO_INIT_GAME_SESSION_REQUEST,
  uuid,
});

export const getCasinoInitGameSessionSuccess = data => ({
  type: GET_CASINO_INIT_GAME_SESSION_SUCCESS,
  data,
});

export const getCasinoInitGameSessionFailure = () => ({
  type: GET_CASINO_INIT_GAME_SESSION_FAILURE,
});

export const onTabSelect = tab => ({
  type: ON_TAB_SELECT,
  tab,
});

export const onFreeSpinSelect = () => ({
  type: ON_FREE_SPIN_SELECT,
});

export const onLobbySelect = () => ({
  type: ON_LOBBY_SELECT,
});

export const onMobileSelect = () => ({
  type: ON_MOBILE_SELECT,
});

export const setProvidersSelect = providersList => ({
  type: SET_PROVIDERS_SELECT,
  providersList,
});

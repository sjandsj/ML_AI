export const GET_VIRTUAL_GAMES_REQUEST = 'GET_VIRTUAL_GAMES_REQUEST';
export const GET_VIRTUAL_GAMES_SUCCESS = 'GET_VIRTUAL_GAMES_SUCCESS';
export const GET_VIRTUAL_GAMES_FAILURE = 'GET_VIRTUAL_GAMES_FAILURE';
export const GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST = 'GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST';
export const GET_VIRTUAL_GAMES_INIT_GAME_SESSION_SUCCESS = 'GET_VIRTUAL_GAMES_INIT_GAME_SESSION_SUCCESS';
export const GET_VIRTUAL_GAMES_INIT_GAME_SESSION_FAILURE = 'GET_VIRTUAL_GAMES_INIT_GAME_SESSION_FAILURE';
export const ON_VIRTUAL_GAMES_TAB_SELECT = 'ON_VIRTUAL_GAMES_TAB_SELECT';
export const ON_VIRTUAL_GAMES_FREE_SPIN_SELECT = 'ON_VIRTUAL_GAMES_FREE_SPIN_SELECT';
export const ON_VIRTUAL_GAMES_LOBBY_SELECT = 'ON_VIRTUAL_GAMES_LOBBY_SELECT';
export const ON_VIRTUAL_GAMES_MOBILE_SELECT = 'ON_VIRTUAL_GAMES_MOBILE_SELECT';
export const SET_VIRTUAL_GAMES_PROVIDERS_SELECT = 'SET_VIRTUAL_GAMES_PROVIDERS_SELECT';

export const getVirtualGamesRequest = data => ({
  type: GET_VIRTUAL_GAMES_REQUEST,
  data,
});

export const getVirtualGamesSuccess = data => ({
  type: GET_VIRTUAL_GAMES_SUCCESS,
  data,
});

export const getVirtualGamesFailure = () => ({
  type: GET_VIRTUAL_GAMES_FAILURE,
});

export const getVirtualGamesInitGameSessionRequest = uuid => ({
  type: GET_VIRTUAL_GAMES_INIT_GAME_SESSION_REQUEST,
  uuid,
});

export const getVirtualGamesInitGameSessionSuccess = data => ({
  type: GET_VIRTUAL_GAMES_INIT_GAME_SESSION_SUCCESS,
  data,
});

export const getVirtualGamesInitGameSessionFailure = () => ({
  type: GET_VIRTUAL_GAMES_INIT_GAME_SESSION_FAILURE,
});

export const onVirtualGamesTabSelect = tab => ({
  type: ON_VIRTUAL_GAMES_TAB_SELECT,
  tab,
});

export const onVirtualGamesFreeSpinSelect = () => ({
  type: ON_VIRTUAL_GAMES_FREE_SPIN_SELECT,
});

export const onVirtualGamesLobbySelect = () => ({
  type: ON_VIRTUAL_GAMES_LOBBY_SELECT,
});

export const onVirtualGamesMobileSelect = () => ({
  type: ON_VIRTUAL_GAMES_MOBILE_SELECT,
});

export const setVirtualGamesProvidersSelect = providersList => ({
  type: SET_VIRTUAL_GAMES_PROVIDERS_SELECT,
  providersList,
});

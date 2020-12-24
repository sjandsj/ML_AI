export const GET_COUNTRY_LIST_REQUEST = 'GET_COUNTRY_LIST_REQUEST';
export const GET_COUNTRY_LIST_SUCCESS = 'GET_COUNTRY_LIST_SUCCESS';
export const GET_COUNTRY_LIST_FAILURE = 'GET_COUNTRY_LIST_FAILURE';

export const GET_TOURNAMENT_LIST_REQUEST = 'GET_TOURNAMENT_LIST_REQUEST';
export const GET_TOURNAMENT_LIST_SUCCESS = 'GET_TOURNAMENT_LIST_SUCCESS';
export const GET_TOURNAMENT_LIST_FAILURE = 'GET_TOURNAMENT_LIST_FAILURE';

export const GET_MATCH_LIST_REQUEST = 'GET_MATCH_LIST_REQUEST';
export const GET_MATCH_LIST_SUCCESS = 'GET_MATCH_LIST_SUCCESS';
export const GET_MATCH_LIST_FAILURE = 'GET_MATCH_LIST_FAILURE';

export const GET_ALL_MARKETS_REQUEST = 'GET_ALL_MARKETS_REQUEST';
export const GET_ALL_MARKETS_SUCCESS = 'GET_ALL_MARKETS_SUCCESS';
export const GET_ALL_MARKETS_FAILURE = 'GET_ALL_MARKETS_FAILURE';

export const  GET_ALL_SPORTS_REQUEST = 'GET_ALL_SPORTS_REQUEST';
export const  GET_ALL_SPORTS_SUCCESS= 'GET_ALL_SPORTS_SUCCESS';
export const  GET_ALL_SPORTS_FAILURE = 'GET_ALL_SPORTS_FAILURE';

export const getCountryListRequest = data => ({
  type: GET_COUNTRY_LIST_REQUEST,
  data,
});

export const getCountryListSuccess = data => ({
  type: GET_COUNTRY_LIST_SUCCESS,
  data,
});

export const getCountryListFailure = data => ({
  type: GET_COUNTRY_LIST_FAILURE,
  data,
});

export const getTournamentListRequest = data => ({
  type: GET_TOURNAMENT_LIST_REQUEST,
  data,
});

export const getTournamentListSuccess = data => ({
  type: GET_TOURNAMENT_LIST_SUCCESS,
  data,
});

export const getTournamentListFailure = data => ({
  type: GET_TOURNAMENT_LIST_FAILURE,
  data,
});

export const getMatchListRequest = data => ({
  type: GET_MATCH_LIST_REQUEST,
  data,
});

export const getMatchListSuccess = data => ({
  type: GET_MATCH_LIST_SUCCESS,
  data,
});

export const getMatchListFailure = data => ({
  type: GET_MATCH_LIST_FAILURE,
  data,
});

export const getAllMarketsRequest = () => ({
  type: GET_ALL_MARKETS_REQUEST,
});

export const getAllMarketsSuccess = data => ({
  type: GET_ALL_MARKETS_SUCCESS,
  data,
});

export const getAllMarketsFailure = data => ({
  type: GET_ALL_MARKETS_FAILURE,
  data,
});

export const getAllSportsRequest = () => ({
  type: GET_ALL_SPORTS_REQUEST,
});

export const getAllSportsSuccess = data => ({
  type: GET_ALL_SPORTS_SUCCESS,
  data,
});

export const getAllSportsFailure = data => ({
  type: GET_ALL_SPORTS_FAILURE,
  data,
});
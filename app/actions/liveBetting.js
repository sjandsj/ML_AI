export const GET_LIVE_MATCHES_REQUEST = 'GET_LIVE_MATCHES_REQUEST';
export const GET_LIVE_MATCHES_SUCCESS = 'GET_LIVE_MATCHES_SUCCESS';
export const GET_LIVE_MATCHES_FAILURE = 'GET_LIVE_MATCHES_FAILURE';

export const ADD_TO_MY_FAVORITES_REQUEST = 'ADD_TO_MY_FAVORITES_REQUEST';
export const ADD_TO_MY_FAVORITES_SUCCESS = 'ADD_TO_MY_FAVORITES_SUCCESS';
export const ADD_TO_MY_FAVORITES_FAILURE = 'ADD_TO_MY_FAVORITES_FAILURE';

export const REMOVE_FROM_MY_FAVORITES_REQUEST = 'REMOVE_FROM_MY_FAVORITES_REQUEST';
export const REMOVE_FROM_MY_FAVORITES_SUCCESS = 'REMOVE_FROM_MY_FAVORITES_SUCCESS';
export const REMOVE_FROM_MY_FAVORITES_FAILURE = 'REMOVE_FROM_MY_FAVORITES_FAILURE';

export const GET_MY_FAVORITES_REQUEST = 'GET_MY_FAVORITES_REQUEST';
export const GET_MY_FAVORITES_SUCCESS = 'GET_MY_FAVORITES_SUCCESS';
export const GET_MY_FAVORITES_FAILURE = 'GET_MY_FAVORITES_FAILURE';

export const getLiveMatchesRequest = hideLoader => ({
  type: GET_LIVE_MATCHES_REQUEST,
  hideLoader,
});

export const getLiveMatchesSuccess = data => ({
  type: GET_LIVE_MATCHES_SUCCESS,
  data,
});

export const getLiveMatchesFailure = data => ({
  type: GET_LIVE_MATCHES_FAILURE,
  data,
});

export const addToMyFavoritesRequest = data => ({
  type: ADD_TO_MY_FAVORITES_REQUEST,
  data,
});

export const addToMyFavoritesSuccess = data => ({
  type: ADD_TO_MY_FAVORITES_SUCCESS,
  data,
});

export const addToMyFavoritesFailure = data => ({
  type: ADD_TO_MY_FAVORITES_FAILURE,
  data,
});

export const removeFromMyFavoritesRequest = data => ({
  type: REMOVE_FROM_MY_FAVORITES_REQUEST,
  data,
});

export const removeFromMyFavoritesSuccess = data => ({
  type: REMOVE_FROM_MY_FAVORITES_SUCCESS,
  data,
});

export const removeFromMyFavoritesFailure = data => ({
  type: REMOVE_FROM_MY_FAVORITES_FAILURE,
  data,
});

export const getMyFavoritesRequest = () => ({
  type: GET_MY_FAVORITES_REQUEST,
});

export const getMyFavoritesSuccess = data => ({
  type: GET_MY_FAVORITES_SUCCESS,
  data,
});

export const getMyFavoritesFailure = data => ({
  type: GET_MY_FAVORITES_FAILURE,
  data,
});


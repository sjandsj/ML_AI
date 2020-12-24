export const GET_TODAY_REQUEST = 'GET_TODAY_REQUEST';
export const GET_TODAY_SUCCESS = 'GET_TODAY_SUCCESS';
export const GET_TODAY_FAILURE = 'GET_TODAY_FAILURE';

export const getTodayRequest = data => ({
  type: GET_TODAY_REQUEST,
  data,
});

export const getTodaySuccess = data => ({
  type: GET_TODAY_SUCCESS,
  data,
});

export const getTodayFailure = data => ({
  type: GET_TODAY_FAILURE,
  data,
});

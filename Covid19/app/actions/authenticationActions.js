
export const GET_SPORTS_REQUEST = 'GET_SPORTS_REQUEST';
export const GET_SPORTS_SUCCESS = 'GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'GET_SPORTS_FAILURE';

// GET SPORTS LIST
export const getSportsRequest = () => {
  return {
    type: GET_SPORTS_REQUEST,
  };
};

export const getSportsSuccess = (data) => ({
  type: GET_SPORTS_SUCCESS,
  data,
});

export const getSportsFailure = () => ({
  type: GET_SPORTS_FAILURE,
});


import {
  // Comapany List
  GET_SPORTS_SUCCESS,
  GET_SPORTS_FAILURE,

} from '../actions/authenticationActions';

const initialState = {
  getSportsResponse: {},
};

function getSportsReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case GET_SPORTS_SUCCESS:
      return {
        ...state,
        getSportsResponse: action.data,
      };
    case GET_SPORTS_FAILURE:
      return {
        ...state,
        getSportsResponse: {},
      };

    default:
      return state;
  }
}

export default getSportsReducer;

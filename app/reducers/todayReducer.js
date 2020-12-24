import _ from 'lodash';
import {
  GET_TODAY_REQUEST,
  GET_TODAY_SUCCESS,
  GET_TODAY_FAILURE,
} from '../actions/todayAction';

const initialState = {
  isLoadingLBoard: false,
  todayMatches: [],
};

function todayMatchReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
   
    case GET_TODAY_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_TODAY_SUCCESS:
      const matches = action.data.matches;
      return {
        ...state,
        isLoadingLBoard: false,
        todayMatches: matches,
      };
    case GET_TODAY_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    default:
      return state;
  }
}

export default todayMatchReducer;

/* eslint no-underscore-dangle: 0 */

import {
  SET_USER_LIMIT_REQUEST,
  SET_USER_LIMIT_SUCCESS,
  SET_USER_LIMIT_FAILURE,
} from '../actions/responsibleGambling';

const initialState = {
  isLoading: false,
  setUserLimitResponse: {},
};

function setUserLimit(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case SET_USER_LIMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        setUserLimitResponse: {},
      };

    case SET_USER_LIMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        setUserLimitResponse: action.data,
      };
    case SET_USER_LIMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        setUserLimitResponse: action.data,
      };

    default:
      return state;
  }
}

export default setUserLimit;

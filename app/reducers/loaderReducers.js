/* eslint no-underscore-dangle: 0 */

import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../actions/loaderActions';

const initialState = {
  isLoading: false,
};

function loaderReducers(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };

    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default loaderReducers;


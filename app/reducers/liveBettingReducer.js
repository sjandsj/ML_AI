import _ from 'lodash';
import {
  GET_LIVE_MATCHES_REQUEST,
  GET_LIVE_MATCHES_SUCCESS,
  GET_LIVE_MATCHES_FAILURE,
  ADD_TO_MY_FAVORITES_REQUEST,
  ADD_TO_MY_FAVORITES_SUCCESS,
  ADD_TO_MY_FAVORITES_FAILURE,
  REMOVE_FROM_MY_FAVORITES_REQUEST,
  REMOVE_FROM_MY_FAVORITES_SUCCESS,
  REMOVE_FROM_MY_FAVORITES_FAILURE,
  GET_MY_FAVORITES_REQUEST,
  GET_MY_FAVORITES_SUCCESS,
  GET_MY_FAVORITES_FAILURE,
} from '../actions/liveBetting';

const initialState = {
  isLoadingLBoard: false,
  liveMatches: [],
  myFavorites: [],
  prevLiveMatches: [],
  isLoading: false,
};

function liveBettingReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_LIVE_MATCHES_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_LIVE_MATCHES_SUCCESS:
      const matchList = action.data.data;
      return {
        ...state,
        isLoadingLBoard: false,
        prevLiveMatches: state.liveMatches,
        liveMatches: matchList,
      };
    case GET_LIVE_MATCHES_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case ADD_TO_MY_FAVORITES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TO_MY_FAVORITES_SUCCESS:
      alert('Added To Favorites');
      return {
        ...state,
        isLoading: false,
      };
    case ADD_TO_MY_FAVORITES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case REMOVE_FROM_MY_FAVORITES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REMOVE_FROM_MY_FAVORITES_SUCCESS:
      alert('Removed From Favorites');
      return {
        ...state,
        isLoading: false,
      };
    case REMOVE_FROM_MY_FAVORITES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GET_MY_FAVORITES_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_MY_FAVORITES_SUCCESS:
      const list = action.data.data;
      return {
        ...state,
        isLoadingLBoard: false,
        myFavorites: list,
      };
    case GET_MY_FAVORITES_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    default:
      return state;
  }
}

export default liveBettingReducer;

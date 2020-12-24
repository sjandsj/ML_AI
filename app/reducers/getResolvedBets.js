/* eslint no-underscore-dangle: 0 */

import {
  GET_RESOLVED_BETS_REQUEST,
  GET_RESOLVED_BETS_SUCCESS,
  GET_RESOLVED_BETS_FAILURE,
  GET_RESOLVED_COMBO_BETS_REQUEST,
  GET_RESOLVED_COMBO_BETS_SUCCESS,
  GET_RESOLVED_COMBO_BETS_FAILURE,
  RESET_RESOLVED_BETS,
} from '../actions/dashboard';

const initialState = {
  isLoading: false,
  isResolvedBetsLoading: false,
  getResolvedBetsResponse: {},
  isLoadingResolvedCombo: false,
  getResolvedComboBetsResponse: {},
};

function getResolvedBets(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case RESET_RESOLVED_BETS:
      return {
        ...state,
        isLoading: false,
        getResolvedBetsResponse: {},
      };

    case GET_RESOLVED_BETS_REQUEST:
      return {
        ...state,
        isResolvedBetsLoading: true,
        isLoading: true,
        getResolvedBetsResponse: {},
      };

    // eslint-disable-next-line no-case-declarations
    case GET_RESOLVED_BETS_SUCCESS:
      const { meta, bets } = action.data.response;
      const list = meta.current_page === 1 ? bets : [...state.resolvedBets, ...bets];
      return {
        ...state,
        isResolvedBetsLoading: false,
        isLoading: false,
        resolvedBets: list,
        meta,
        getResolvedBetsResponse: action.data,
      };
    case GET_RESOLVED_BETS_FAILURE:
      return {
        ...state,
        isResolvedBetsLoading: false,
        isLoading: false,
        getResolvedBetsResponse: action.data,
      };

    case GET_RESOLVED_COMBO_BETS_REQUEST:
      return {
        ...state,
        isResolvedBetsLoading: true,
        isLoading: true,
        getResolvedBetsComboResponse: {},
      };

    // eslint-disable-next-line no-case-declarations
    case GET_RESOLVED_COMBO_BETS_SUCCESS:
      const resolvedComboMeta = action.data.response.meta;
      const resolvedComboBets = action.data.response.combo_bets;
      const resolvedComboList = resolvedComboMeta.current_page === 1 ? resolvedComboBets : [...state.resolvedComboBets, ...resolvedComboBets];
      return {
        ...state,
        isResolvedBetsLoading: false,
        isLoading: false,
        resolvedComboBets: resolvedComboList,
        resolvedComboMeta,
        getResolvedBetsComboResponse: action.data,
      };
    case GET_RESOLVED_COMBO_BETS_FAILURE:
      return {
        ...state,
        isResolvedBetsLoading: false,
        isLoading: false,
        getResolvedBetsComboResponse: action.data,
      };

    default:
      return state;
  }
}

export default getResolvedBets;

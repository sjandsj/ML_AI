/* eslint no-underscore-dangle: 0 */

import _ from 'lodash';

import {
  GET_PENDING_BETS_REQUEST,
  GET_PENDING_BETS_SUCCESS,
  GET_PENDING_BETS_FAILURE,
  GET_PENDING_COMBO_BETS_REQUEST,
  GET_PENDING_COMBO_BETS_FAILURE,
  GET_PENDING_COMBO_BETS_SUCCESS,
  GET_CASHOUT_COMBO_BETS_REQUEST,
  GET_CASHOUT_COMBO_BETS_SUCCESS,
  GET_CASHOUT_COMBO_BETS_FAILURE,
  RESET_PENDING_BETS,
} from '../actions/dashboard';
import { POST_CASHOUT_BET_SUCCESS, POST_CASHOUT_BET_FAILURE, POST_CASHOUT_BET_REQUEST, CASHOUT_MISMATCH_ERROR } from '../actions/mainGamePlayAction';

const initialState = {
  isLoading: false,
  getPendingBetsResponse: {},
  isLoadingPendingCombo: false,
  getPendingComboBetsResponse: {},
  getCashoutBetsResponse: {},
  isLoadingCashoutCombo: false,
  getCashoutComboBetsResponse: {},
};

function getPendingBets(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case RESET_PENDING_BETS:
      return {
        ...state,
        isLoading: false,
        getPendingBetsResponse: {},
      };

    case GET_PENDING_BETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        getPendingBetsResponse: {},
      };
    case GET_PENDING_BETS_SUCCESS:
    case GET_PENDING_BETS_FAILURE:
      return {
        ...state,
        isLoading: false,
        getPendingBetsResponse: action.data,
      };
    case GET_PENDING_COMBO_BETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        getPendingComboBetsResponse: {},
      };
    // eslint-disable-next-line no-case-declarations
    case GET_PENDING_COMBO_BETS_SUCCESS:
      const pendingComboMeta = action.data.response.meta;
      const pendingComboBets = action.data.response.combo_bets;
      const pendingComboList = pendingComboMeta.current_page === 1 ? pendingComboBets : [...state.pendingComboBets, ...pendingComboBets];
      return {
        ...state,
        isLoading: false,
        getPendingComboBetsResponse: action.data,
        pendingComboBets: pendingComboList,
        pendingComboMeta,
      };
    case GET_PENDING_COMBO_BETS_FAILURE:
      return {
        ...state,
        isLoading: false,
        getPendingComboBetsResponse: action.data,
      };
    case GET_CASHOUT_COMBO_BETS_REQUEST:
      return {
        ...state,
        isLoadingcashoutCombo: true,
        getcashoutComboBetsResponse: {},
      };
    // eslint-disable-next-line no-case-declarations
    case GET_CASHOUT_COMBO_BETS_SUCCESS:
      const cashoutComboMeta = action.data.response.meta;
      const cashoutComboBets = action.data.response.combo_bets;
      const cashoutComboList = cashoutComboMeta.current_page === 1 ? cashoutComboBets : [...state.cashoutComboBets, ...cashoutComboBets];
      return {
        ...state,
        isLoadingcashoutCombo: false,
        getcashoutComboBetsResponse: action.data,
        cashoutComboBets: cashoutComboList,
        cashoutComboMeta,
      };
    case GET_CASHOUT_COMBO_BETS_FAILURE:
      return {
        ...state,
        isLoadingCashoutCombo: false,
        getCashoutComboBetsResponse: action.data,
      };
    case POST_CASHOUT_BET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
      // eslint-disable-next-line no-case-declarations
    case POST_CASHOUT_BET_SUCCESS:
      let updatedComboPendingBets;
      if (action.betType === 'combo') {
        updatedComboPendingBets = _.assign([], state.pendingComboBets);
        _.remove(updatedComboPendingBets, bet =>
          (bet.id === action.bet.combo_id));
      }
      return {
        ...state,
        isLoading: false,
        pendingComboBets: action.betType === 'combo' ? updatedComboPendingBets : state.pendingComboBets,
      };
    case POST_CASHOUT_BET_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // eslint-disable-next-line no-case-declarations
    case CASHOUT_MISMATCH_ERROR:
      let updatedComboPendingBet;
      let betToUpdate;
      if (action.betType === 'combo') {
        updatedComboPendingBet = _.assign([], state.pendingComboBets);
        betToUpdate = _.find(updatedComboPendingBet, bet =>
          (bet.id === action.bet.combo_id));
        betToUpdate.cashoutable = action.data.cashoutable.cashoutable;
      }
      return {
        ...state,
        pendingComboBets: action.betType === 'combo' ? updatedComboPendingBet : state.pendingComboBets,
      };
    default:
      return state;
  }
}

export default getPendingBets;

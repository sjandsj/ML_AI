import _ from 'lodash';
import {
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  POST_TRANSFER_AMOUNT_REQUEST,
  POST_TRANSFER_AMOUNT_SUCCESS,
  POST_TRANSFER_AMOUNT_FAILURE,
  GET_TRANSACTION_HISTORY_REQUEST,
  GET_TRANSACTION_HISTORY_SUCCESS,
  GET_TRANSACTION_HISTORY_FAILURE,
} from '../actions/fundTransferAction';

const initialState = {
  isLoadingLBoard: false,
  payTo: {},
  transactionHistory: [],
};

function fundsTransferReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
        payTo: {},
      };
    case GET_USER_DETAILS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const userData = action.data.payee;
      return {
        ...state,
        isLoadingLBoard: false,
        payTo: userData,
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
        payTo: {},
      };
    case POST_TRANSFER_AMOUNT_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case POST_TRANSFER_AMOUNT_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case POST_TRANSFER_AMOUNT_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    case GET_TRANSACTION_HISTORY_REQUEST:
      return {
        ...state,
        isLoadingLBoard: true,
      };
    case GET_TRANSACTION_HISTORY_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const transactionList = action.data.ledgers;
      return {
        ...state,
        transactionHistory: transactionList,
        isLoadingLBoard: false,
      };
    case GET_TRANSACTION_HISTORY_FAILURE:
      return {
        ...state,
        isLoadingLBoard: false,
      };
    default:
      return state;
  }
}

export default fundsTransferReducer;

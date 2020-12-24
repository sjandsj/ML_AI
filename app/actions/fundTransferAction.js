export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE';

export const POST_TRANSFER_AMOUNT_REQUEST = 'POST_TRANSFER_AMOUNT_REQUEST';
export const POST_TRANSFER_AMOUNT_SUCCESS = 'POST_TRANSFER_AMOUNT_SUCCESS';
export const POST_TRANSFER_AMOUNT_FAILURE = 'POST_TRANSFER_AMOUNT_FAILURE';

export const GET_TRANSACTION_HISTORY_REQUEST = 'GET_TRANSACTION_HISTORY_REQUEST';
export const GET_TRANSACTION_HISTORY_SUCCESS = 'GET_TRANSACTION_HISTORY_SUCCESS';
export const GET_TRANSACTION_HISTORY_FAILURE = 'GET_TRANSACTION_HISTORY_FAILURE';

export const getUserDetailsRequest = data => ({
  type: GET_USER_DETAILS_REQUEST,
  data,
});

export const getUserDetailsSuccess = data => ({
  type: GET_USER_DETAILS_SUCCESS,
  data,
});

export const getUserDetailsFailure = data => ({
  type: GET_USER_DETAILS_FAILURE,
  data,
});

export const postTransferAmountRequest = data => ({
  type: POST_TRANSFER_AMOUNT_REQUEST,
  data,
});

export const postTransferAmountSuccess = data => ({
  type: POST_TRANSFER_AMOUNT_SUCCESS,
  data,
});

export const postTransferAmountFailure = data => ({
  type: POST_TRANSFER_AMOUNT_FAILURE,
  data,
});


export const getTransactionHistoryRequest = data => ({
  type: GET_TRANSACTION_HISTORY_REQUEST,
  data,
});

export const getTransactionHistorySuccess = data => ({
  type: GET_TRANSACTION_HISTORY_SUCCESS,
  data,
});

export const getTransactionHistoryFailure = data => ({
  type: GET_TRANSACTION_HISTORY_FAILURE,
  data,
});

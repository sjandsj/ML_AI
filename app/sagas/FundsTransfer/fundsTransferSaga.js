import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  GET_USER_DETAILS_REQUEST,
  getUserDetailsSuccess,
  getUserDetailsFailure,
  POST_TRANSFER_AMOUNT_REQUEST,
  postTransferAmountSuccess,
  postTransferAmountFailure,
  GET_TRANSACTION_HISTORY_REQUEST,
  getTransactionHistorySuccess,
  getTransactionHistoryFailure,
} from '../../actions/fundTransferAction';
import { getProfileRequest } from '../../actions/profile';
import { getUserDetailsUrl, postTransferAmountUrl, getTransactionHistoryUrl } from '../../api/urls';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlert, showPopupAlertWithTitle } from '../../utils/showAlert';

// user details

function* getUserDetails(action) {
  try {
    const response = yield call(
      apiCall,
      getUserDetailsUrl(action.data),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        if (parsedResponse.errors && typeof parsedResponse.errors === 'object') {
          showPopupAlertWithTitle('Error!', parsedResponse.errors[0]);
          yield put(getUserDetailsFailure(parsedResponse));
        } else {
          dataResponse = parsedResponse;
          yield put(getUserDetailsSuccess(dataResponse));
        }
      }
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getUserDetailsFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getUserDetailsFailure());
  }
}

// Transfer amount
function* transferAmount(action) {
  try {
    const response = yield call(
      apiCall,
      postTransferAmountUrl(action.data.userId, action.data.amount),
      METHOD_TYPE.POST,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);

    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        if (parsedResponse.errors && typeof parsedResponse.errors === 'object') {
          showPopupAlertWithTitle('Error!', parsedResponse.errors[0]);
          yield put(postTransferAmountFailure(parsedResponse));
        } else {
          dataResponse = parsedResponse;
          showPopupAlertWithTitle('Success!', dataResponse.message);
          yield put(postTransferAmountSuccess(dataResponse));
          yield put(getUserDetailsSuccess(dataResponse));
          yield put(getProfileRequest());
        }
      }
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(postTransferAmountFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(postTransferAmountFailure());
  }
}
// get transaction history

function* getTransactionHistory(action) {
  try {
    const response = yield call(
      apiCall,
      getTransactionHistoryUrl(action.data.category, action.data.min_date, action.data.max_date),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getTransactionHistorySuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTransactionHistoryFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getTransactionHistoryFailure());
  }
}

export default function* TransferFunds() {
  yield all([
    takeLatest(GET_USER_DETAILS_REQUEST, getUserDetails),
    takeLatest(POST_TRANSFER_AMOUNT_REQUEST, transferAmount),
    takeLatest(GET_TRANSACTION_HISTORY_REQUEST, getTransactionHistory),
  ]);
}

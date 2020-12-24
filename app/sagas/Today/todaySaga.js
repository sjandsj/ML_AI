import { call, takeLatest, put, all } from 'redux-saga/effects';
import { apiCall } from '../../api/apiInterface';
import {
  GET_TODAY_REQUEST,
  getTodaySuccess,
  getTodayFailure,
} from '../../actions/todayAction';
import { getTodayUrl } from '../../api/urls';
import { isEmpty } from '../../utils/utils';
import {
  METHOD_TYPE,
  isSuccessAPI,
  parsedAPIResponse,
  showErrorMessage,
  showExceptionErrorMessage,
} from '../APIHandler';
import { showPopupAlert, showPopupAlertWithTitle } from '../../utils/showAlert';

// today or highlights

function* getTodayMatches(action) {
  try {
    const response = yield call(
      apiCall,
      getTodayUrl(action.data),
      METHOD_TYPE.GET,
    );
    const parsedResponse = yield call(parsedAPIResponse, response);
    if (isSuccessAPI(response) && parsedResponse) {
      let dataResponse = [];
      if (!isEmpty(parsedResponse)) {
        dataResponse = parsedResponse;
      }
      yield put(getTodaySuccess(dataResponse));
    } else {
      showErrorMessage(response, parsedResponse);
      yield put(getTodayFailure(parsedResponse));
    }
  } catch (error) {
    showExceptionErrorMessage();
    yield put(getTodayFailure());
  }
}

export default function* LiveMatchesSaga() {
  yield all([
    takeLatest(GET_TODAY_REQUEST, getTodayMatches),
  ]);
}

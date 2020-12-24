import { call, put, takeEvery } from 'redux-saga/effects';
import { apiCall } from '../apiInterface';
import { API_ACTION } from '../actions/apiActions';
import { constant } from '../../config/appConfig';

function* manageResponseData(action, response) {
  try {
    const parsedResponse = yield response.json();
    const successResponse = {
      response: parsedResponse,
      status: response.status,
    };
    yield put({ type: action.types[1], data: successResponse });
  } catch (error) {
    const unParsedResponse = {
      response: { message: `${constant.SERVER_ERROR_MESSAGE}` },
      status: response.status,
    };
    yield put({ type: action.types[2], data: unParsedResponse });
  }
}

function* apiInterface(action) {
  try {
    yield put({ type: action.types[0] });
    const response = yield call(
      apiCall, action.url, action.method,
      action.body, action.headers,
    );
    yield call(manageResponseData, action, response);
  } catch (e) {
    const exceptionObject = {
      response: { message: `${constant.SERVER_ERROR_MESSAGE}` },
      error: e,
      status: 500,
    };
    yield put({ type: action.types[2], data: exceptionObject });
  }
}

export default function* watchApi() {
  yield takeEvery(API_ACTION, apiInterface);
}

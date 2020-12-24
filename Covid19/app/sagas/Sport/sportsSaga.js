import {
    call, takeLatest, put, all,
  } from 'redux-saga/effects';
  import { apiCall } from '../../api/apiInterface';
  
  import {
    GET_SPORTS_REQUEST,
    getSportsSuccess,
    getSportsFailure,
  } from '../../actions/authenticationActions';

  import {
    showLoader,
    hideLoader,
  } from '../../actions/loaderActions';

  import {
    getSportsUrl,
  } from '../../api/urls';
  
  import {
    METHOD_TYPE,
    isSuccessAPI,
    parsedAPIResponse,
    showErrorMessage,
    showExceptionErrorMessage,
  } from '../APIHandler';
  
  // get SportsList
  function* getSportsList(action) {
    try {
      yield put(showLoader());
      const url = getSportsUrl;
      const response = yield call(
        apiCall,
        url,
        METHOD_TYPE.GET,
      );
      yield put(hideLoader());
      const parsedResponse = yield call(parsedAPIResponse, response);
      if (isSuccessAPI(response) && parsedResponse) {
        let dataResponse = {};
        dataResponse = parsedResponse;
        yield put(getSportsSuccess(dataResponse));
      } else {
        yield put(getSportsFailure(parsedResponse));
        showErrorMessage(response, parsedResponse);
      }
    } catch (error) {
      yield put(hideLoader());
      showExceptionErrorMessage();
      yield put(getSportsFailure());
    }
  }
  
  export default function* sportsSaga() {
    yield all([
      takeLatest(GET_SPORTS_REQUEST, getSportsList),
    ]);
  }
  
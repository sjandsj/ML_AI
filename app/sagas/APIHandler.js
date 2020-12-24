import { commonLocalizeStrings } from '../localization/commonLocalizeStrings';
import { showPopupAlert, showPopupAlertWithTitle, showUpdateAlert } from '../utils/showAlert';
import { logout } from '../utils/utils_functions';

export const HTTP_STATUS_CODE = {
  SUCCESS_OK: 200,
  REDIRECTION: 300,
  CLIENT_ERROR: 400,
  SESSION_EXPIRE_ERROR: 401,
  SERVER_ERROR: 500,
};

export const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const isSuccessAPI = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status
      && apiResponse.status >= HTTP_STATUS_CODE.SUCCESS_OK
      && apiResponse.status <= HTTP_STATUS_CODE.REDIRECTION) {
      return true;
    }
  }
  return false;
};

export const isInternalServerError = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status && apiResponse.status >= HTTP_STATUS_CODE.SERVER_ERROR) {
      return true;
    }
  }
  return false;
};

export const isSessionTimeoutError = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status && apiResponse.status === HTTP_STATUS_CODE.SESSION_EXPIRE_ERROR) {
      return true;
    }
  }
  return false;
};

const isJSON = (apiResponse) => {
  const contentType = apiResponse.headers.get('content-type');
  const isValid = contentType && contentType.indexOf('application/json') !== -1;
  return isValid;
};

export const parsedAPIResponse = (apiResponse) => {
  if (apiResponse) {
    const parsedResponse = isJSON(apiResponse) ? apiResponse.json() : apiResponse;
    if (parsedResponse) {
      return parsedResponse;
    }
  }
  return null;
};

export const isValidAPIResponse = (parsedResponse) => {
  if (parsedResponse
    && parsedResponse.message
    && typeof parsedResponse.message === 'string') {
    return true;
  }
  return false;
};

export const serverMessage = (parsedResponse) => {
  let parsedServerMessage = '';
  if (parsedResponse && parsedResponse.message) {
    if (typeof parsedResponse.message === 'string') {
      parsedServerMessage = parsedResponse.message;
    } else if (typeof parsedResponse.message === 'object') {
      for (let i = 0; i < parsedResponse.message.length; i += 1) {
        if (i === parsedResponse.message.length - 1) {
          parsedServerMessage += `${parsedResponse.message[i]}`;
        } else {
          parsedServerMessage += `${parsedResponse.message[i]}\n`;
        }
      }
    }
  }
  return parsedServerMessage;
};

export const showErrorMessage = (response, parsedResponse) => {
  let errorMessage = commonLocalizeStrings.serverErrorMessage;

  console.log('parsed', parsedResponse);
  if (isSessionTimeoutError(response)) {
    errorMessage = commonLocalizeStrings.sessionErrorMessage;
    showPopupAlertWithTitle('Alert!', errorMessage, () => {
      logout();
    });
    return;
  }
  if (isInternalServerError(response)) {
    errorMessage = commonLocalizeStrings.internalServerErrorMessage;
  } else {
    const message = serverMessage(parsedResponse);
    if (message) {
      errorMessage = message;
    }
    if (parsedResponse.url != null) {
      showUpdateAlert(message, parsedResponse.url);
      return;
    }
    
  }
  if(errorMessage !== commonLocalizeStrings.serverErrorMessage) {
    showPopupAlert(errorMessage);
  }
  
};

export const showSuccessMessage = (parsedResponse, defaultMessage) => {
  let successMessage = defaultMessage;
  const message = serverMessage(parsedResponse);
  if (message) {
    successMessage = message;
  }
  showPopupAlert(successMessage);
};

export const showExceptionErrorMessage = () => {
  // showPopupAlert(commonLocalizeStrings.serverErrorMessage);
};

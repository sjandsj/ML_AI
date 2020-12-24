import { Component } from 'react';
import _ from 'lodash';
import { AsyncStorage, NetInfo, Dimensions, Platform } from 'react-native';
import { showPopupAlert } from './showAlert';
import { ORIENTATION } from './enum';

const sizeDenominator = 850;

export function windowSize() {
  return Dimensions.get('window');
}

export function responsiveSize(fontSize) {
  const { width, height } = windowSize();
  return (Math.sqrt((height * height) + (width * width)) * (fontSize / sizeDenominator));
}

export const navigationHeight = Platform.OS === 'ios' ? responsiveSize(54) : responsiveSize(54);

export function isNetworkConnected(action) {
  NetInfo.isConnected.fetch().then((isConnected) => {
    action(isConnected);
  });
}

export function isEmpty(object) {
  if (object
     && Object.keys(object).length > 0) {
    return false;
  }
  return true;
}

export function isLandscape(currentDeviceOrientation) {
  return currentDeviceOrientation === ORIENTATION.LANDSCAPE;
}

export function isPortrait(currentDeviceOrientation) {
  return currentDeviceOrientation === ORIENTATION.PORTRAIT;
}

export function formateData(data, numColumns) {
  if (_.isEmpty(data)) {
    return [];
  }
  let numberOfElementsLastRow = data.length % numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({});
    numberOfElementsLastRow += 1;
  }
  return data;
}

export function sizeWithCurrentOrientation(currentDeviceOrientation) {
  const { width, height } = windowSize();
  let screenHeight = height;
  let screenWidth = width;
  const isLandscapeView = isLandscape(currentDeviceOrientation);
  if ((isLandscapeView && width < height) || (!isLandscapeView && width > height)) {
    screenHeight = width;
    screenWidth = height;
  }
  return {
    screenHeight,
    screenWidth,
  };
}

// TODO: Static function will be convert into export function
class Utils extends Component {
  static formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct',
      'Nov', 'Dec',
    ];
    const day = date.getDate() < 10 ? ['0', date.getDate()].join('') : date.getDate();
    const monthIndex = date.getMonth();
    const dateArray = [day, monthNames[monthIndex]];
    const finalDate = dateArray.join(' ');
    return finalDate.toString();
  }

  static formatTime(dateString) {
    const date = new Date(dateString);
    const finalHour = date.getHours().toString().length < 2 ? `0${date.getHours()}` : date.getHours();
    const finalMinutes = date.getMinutes().toString().length < 2 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${finalHour}:${finalMinutes}`;
  }

  static formatCurrency(amountToFormat) {
    const amount = parseFloat(amountToFormat);
    if (amount >= 1000 && amount < 1000000) {
      return `${(amount / 1000).toFixed(2)} K`;
    } else if (amount >= 1000000 && amount < 1000000000) {
      return `${(amount / 1000000).toFixed(2)} M`;
    } else if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(2)} B`;
    }

    if (Number.isNaN(amount)) {
      return 0;
    }

    if (amount < 1000) {
      return amount;
    }
    return parseFloat(amount).toFixed(2);
  }


  constructor() {
    super();
    this.state = {};
  }

  async getItemWithKey(key, action) {
    try {
      const data = await AsyncStorage.getItem(key);
      const parsedData = JSON.parse(data);
      action(parsedData);
    } catch (error) {
      action(null);
    }
  }

  async setItemWithKeyAndValue(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('error', error);
    }
  }

  checkInternetConnectivity(action) {
    NetInfo.isConnected.fetch().then((isConnected) => {
      action(isConnected);
    });
  }

  /* isSuccessAPICall: To check server api call is success or not, using server response
  isLoading: API call is finished or in-progress
  serverResponse: server response
  resetDataInStore: for reseting the data in store corresponding reducer
  */
  isStatusAPICall(isLoading, serverResponse, resetDataInStore) {
    const APIStatus = {
      SUCCESS: 1,
      FAILED: 0,
      LOADING: -1,
    };
    let apiStatus = APIStatus.LOADING;
    if (!isLoading
      && serverResponse
      && serverResponse.response
      && serverResponse.status
      && serverResponse.status >= 200
      && serverResponse.status <= 300) {
      apiStatus = APIStatus.SUCCESS;
    }
    if (!isLoading
      && serverResponse
      && serverResponse.response
      && serverResponse.status
      && serverResponse.status >= 400) {
      if (serverResponse.response.message
        && typeof serverResponse.response.message === 'string') {
        showPopupAlert(serverResponse.response.message);
        if (resetDataInStore !== undefined) {
          resetDataInStore();
        }
        apiStatus = APIStatus.FAILED;
      } else {
        if (resetDataInStore !== undefined) {
          resetDataInStore();
        }
        apiStatus = APIStatus.FAILED;
      }
    }
    return apiStatus;
  }

  fetchSportCode(sportList, selectedSport) {
    let code = '';

    for (let i = 0; i < sportList.length; i += 1) {
      if (sportList[i].name === selectedSport) {
        code = sportList[i].id;
      }
    }
    return code;
  }
}

export default Utils;

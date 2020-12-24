import Moment from 'moment';
import _ from 'lodash';
import { NavigationActions, StackActions } from 'react-navigation';
import { Dimensions, Linking } from 'react-native';
import constants from './constants';
import { showPopupAlertWithTitle, ERROR, no_internet } from './showAlert';
import { UserData } from './global';

import Navigation from './navigation';
import Utils from './utils';


const { width, height } = Dimensions.get('window');
let i = 0;
/**
* @param {any} navigation
* @param {string} screenName
*/


export function encodeData(data) {
  if (data) {
    console.log('=========encoding data', data)
    const y = Object.keys(data).map(key => [key, data[key]].map(encodeURIComponent).join('=')).join('&');
    console.log('=============maping', y)
    return y
  }
  return '';
}

export const resetRoute = (props) => {
  const { navigation, screenName, params } = props;
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: screenName, params }),
    ],
    key: null,
  });
  navigation.dispatch(resetAction);
};

export const logout = () => {
  const utils = new Utils();
  utils.getItemWithKey(constants.APP_ACCESS_TOKEN, (response) => {
    if (response && response.access_token) {
      utils.deleteItem(constants.APP_ACCESS_TOKEN);
      UserData.BearerToken = '';
      Navigation.sharedInstance().resetRouteName('Splash');
    } else {
      showPopupAlertWithTitle(ERROR, no_internet);
    }
  });
};

export const getTimeDifferenceInDays = (date) => {
  if (_.isEmpty(date)) return date;
  const currentDate = Moment(new Date());
  const previousDate = Moment(date);
  const duration = Moment.duration(currentDate.diff(previousDate));
  const day = duration.asDays();
  return day;
};

/**
* @param {object} apiResponse
* @returns {boolean}
*/
export const isResponseValid = (apiResponse) => {
  if (apiResponse !== undefined) {
    if (apiResponse.status && apiResponse.status >= 200 && apiResponse.status <= 300) {
      return true;
    }
  }
  return false;
};

/**
* @param {object} apiResponse
* @returns {boolean}
*/
export const isResponseValidated = (apiResponse) => {
  if (apiResponse.status !== undefined && apiResponse.response !== undefined) {
    return true;
  }
  return false;
};

/**
* @param {object} apiResponse
* @returns {boolean}
*/
export const isResponseSuccess = (apiResponse) => {
  if (apiResponse.status &&
    apiResponse.status >= 200 &&
    apiResponse.status <= 300 &&
    apiResponse.response !== undefined) {
    return true;
  }
  return false;
};

export const responsiveFontSize = (f) => {
  return (Math.sqrt((height * height) + (width * width)) * (f / 850));
};

export const FONT_18 = responsiveFontSize(18);

export const FONT_16 = responsiveFontSize(16);

export const FONT_14 = responsiveFontSize(14);

export const FONT_13 = responsiveFontSize(12);

export const textfieldHeight = () => {
  if (width === 320 || height === 568 || width === 568 || height === 320) {
    return 30;
  }
  return 38;
};


const calculateStakes = (i) => {
  if (i > 1000 && i <= 10000) {
    return i + 10;
  }
  else if (i > 10000 && i < 100000) {
    return i + 100;
  }
  else if (i > 100000 && i < 1000000) {
    return i + 1000;
  }
  else if (i > 1000000 && i < 10000000) {
    return i + 10000;
  }
  else if (i > 10000000) {
    return i + 100000;
  }
  return i + 5;
}

export const getStakeValues = (totalStakeValue) => {
  const stakeValues = [];
  let j = 1;

  if (totalStakeValue !== 0) {
    for (let i = 10, j = 1; i < totalStakeValue; i = calculateStakes(i), j++) {
      stakeValues.push({
        id: j.toString(),
        name: i.toString(),
      });
    }
    stakeValues.push({
      id: (j + 1).toString(),
      name: totalStakeValue.toString(),
    });
  }

  if (totalStakeValue === 0) {
    stakeValues.push({
      id: '-1',
      name: '0',
    });
  }
  return stakeValues;
};

// eslint-disable-next-line radix
export const toFixTwoDigitAfterDecimal = num => parseFloat(num).toFixed(2);
export const toFixTwoDigitAfterDecimalWithoutRounding = num => parseFloat(num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);


export const getCurrentComboBetAndFolds = (betSlips) => {
  let netOddsForComboBet = 1;
  const matchUniqueId = [];
  _.forEach(betSlips, (e) => {
    if (!_.includes(matchUniqueId, e.matchID)) {
      matchUniqueId.push(e.matchID);
    }
    netOddsForComboBet *= e.odds;
  });
  return {
    netOddsForComboBet,
    foldsInBetSlip: matchUniqueId.length,
  };
};

export const getBetslipsAfterOddsChange = (currentBetslip, updatedBetSlip) => {
  const mainBetSlip = [...currentBetslip];

  _.forEach(updatedBetSlip, (slip) => {
    if (slip.odds_changed) {
      const slipToChange = _.find(mainBetSlip, { matchID: slip.match_id, marketID: slip.market_id, id: slip.outcome_id });
      slipToChange.isOddsChanged = true;
      slipToChange.odds = slip.odds;
    }
  });
  const currentComboOddsAndFolds = getCurrentComboBetAndFolds(mainBetSlip);
  return {
    netOddsForComboBet: currentComboOddsAndFolds.netOddsForComboBet,
    foldsInBetSlip: currentComboOddsAndFolds.foldsInBetSlip,
    mainBetSlip,
  };
};

export const updateApp = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

/* eslint no-underscore-dangle: 0 */

import {
  GET_USER_LIMIT_REQUEST,
  GET_USER_LIMIT_SUCCESS,
  GET_USER_LIMIT_FAILURE,
  SET_DEPOSIT_BET_AND_REMINDER_LIMIT,
  SET_TYPE_OF_LIMIT,
  SET_SELECTED_TAB,
  CANCEL_SELECTION,
  ON_SELECT_PICKER_VALUE,
} from '../actions/responsibleGambling';
import { getStakeValues } from '../utils/utils_functions';
// import { limits } from '../utils/enum';

const stake = getStakeValues(60);
const stakeAmount = getStakeValues(5000);

const initialState = {
  isLoading: false,
  userLimitData: {},
  selectedTab: 0,
  selectedIndex: 0,
  selectedStake: '10',
  isBetSelected: false,
  isDepositSelected: false,
  isSetTimeoutLimit: false,
  pickerAmount: stakeAmount,
  betLimit: {},
  depositLimit: {},
  reminderLimit: {},
  selectedLimitType: '',
};

function getUserLimit(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case GET_USER_LIMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        userLimitData: {},
      };

    // eslint-disable-next-line no-case-declarations
    case GET_USER_LIMIT_SUCCESS:
      let betLimit;
      let depositLimit;
      if (state.selectedTab === 0) {
        betLimit = action.data.bet_limit && action.data.bet_limit.daily;
        depositLimit = action.data.deposit_limit && action.data.deposit_limit.daily;
      } else if (state.selectedTab === 1) {
        betLimit = action.data.bet_limit && action.data.bet_limit.weekly;
        depositLimit = action.data.deposit_limit && action.data.deposit_limit.weekly;
      } else {
        betLimit = action.data.bet_limit && action.data.bet_limit.monthly;
        depositLimit = action.data.deposit_limit && action.data.deposit_limit.monthly;
      }
      return {
        ...state,
        isLoading: false,
        userLimitData: action.data,
        betLimit: betLimit,
        depositLimit: depositLimit,
        reminderLimit: action.data.reality_check_limit && action.data.reality_check_limit,
        selectedLimitType: '',
      };
    case GET_USER_LIMIT_FAILURE:
      return {
        ...state,
        isLoading: false,
        userLimitData: action.data,
      };
    case SET_DEPOSIT_BET_AND_REMINDER_LIMIT:
      return {
        ...state,
        depositLimit: action.deposit,
        betLimit: action.bet,
        reminderLimit: action.reminder,
      };
    case SET_TYPE_OF_LIMIT:
      return {
        ...state,
        selectedLimitType: action.limitType,
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    case CANCEL_SELECTION:
      return {
        ...state,
        selectedLimitType: '',
      };
    case ON_SELECT_PICKER_VALUE:
      return {
        ...state,
        selectedIndex: action.index,
        selectedStake: action.value,
      };
    default:
      return state;
  }
}

export default getUserLimit;

export const GET_USER_LIMIT_REQUEST = 'GET_USER_LIMIT_REQUEST';
export const GET_USER_LIMIT_SUCCESS = 'GET_USER_LIMIT_SUCCESS';
export const GET_USER_LIMIT_FAILURE = 'GET_USER_LIMIT_FAILURE';

export const SET_USER_LIMIT_REQUEST = 'SET_USER_LIMIT_REQUEST';
export const SET_USER_LIMIT_SUCCESS = 'SET_USER_LIMIT_SUCCESS';
export const SET_USER_LIMIT_FAILURE = 'SET_USER_LIMIT_FAILURE';

export const GET_USER_DEPOSIT_REQUEST = 'GET_USER_DEPOSIT_REQUEST';
export const GET_USER_DEPOSIT_SUCCESS = 'GET_USER_DEPOSIT_SUCCESS';
export const GET_USER_DEPOSIT_FAILURE = 'GET_USER_DEPOSIT_FAILURE';

export const SET_DEPOSIT_BET_AND_REMINDER_LIMIT = 'SET_DEPOSIT_BET_AND_REMINDER_LIMIT';
export const SET_TYPE_OF_LIMIT = 'SET_TYPE_OF_LIMIT';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const SELECT_VALUE = 'SELECT_VALUE';
export const CANCEL_SELECTION = 'CANCEL_SELECTION';
export const ON_SELECT_PICKER_VALUE = 'ON_SELECT_PICKER_VALUE';
export const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

// Get user account limits.
export const getUserLimitRequest = () => ({
  type: GET_USER_LIMIT_REQUEST,
});

export const getUserLimitSuccess = response => ({
  type: GET_USER_LIMIT_SUCCESS,
  data: response,
});

export const getUserLimitFailed = () => ({
  type: GET_USER_LIMIT_FAILURE,
});

// Set user account limits.
export const setUserLimitRequest = (data, selectedTab) => ({
  type: SET_USER_LIMIT_REQUEST,
  data,
  selectedTab,
});

export const setUserLimitSuccess = response => ({
  type: SET_USER_LIMIT_SUCCESS,
  data: response,
});

export const setUserLimitFailed = () => ({
  type: SET_USER_LIMIT_FAILURE,
});

// Get user account Deposit.
export const getUserDepositRequest = () => ({
  type: GET_USER_DEPOSIT_REQUEST,
});

export const getUserDepositSuccess = response => ({
  type: GET_USER_DEPOSIT_SUCCESS,
  data: response,
});

export const getUserDepositFailed = () => ({
  type: GET_USER_DEPOSIT_FAILURE,
});

export const setDepositBetAndReminderLimit = (deposit, bet, reminder) => ({
  type: SET_DEPOSIT_BET_AND_REMINDER_LIMIT,
  deposit,
  bet,
  reminder,
});

export const setTypeOfLimit = limitType => ({
  type: SET_TYPE_OF_LIMIT,
  limitType,
});

export const setSelectedTab = selectedTab => ({
  type: SET_SELECTED_TAB,
  selectedTab,
});

export const selectValue = selectedValue => ({
  type: SELECT_VALUE,
  selectedValue,
});

export const cancelSelection = () => ({
  type: CANCEL_SELECTION,
});

export const onSelectPickerValue = (index, value) => ({
  type: ON_SELECT_PICKER_VALUE,
  index,
  value,
});

export const getSettingsRequest = () => ({
  type: GET_SETTINGS_REQUEST,
});

export const getSettingsSuccess = response => ({
  type: GET_SETTINGS_SUCCESS,
  response,
});

export const getSettingsFailed = () => ({
  type: GET_SETTINGS_FAILURE,
});

// @flow
import { combineReducers } from 'redux';

// constants
import { LOGOUT_REQUEST_SUCCESS } from '../actions/authentication';

// reducers
import getPendingBets from './getPendingBets';
import getResolvedBets from './getResolvedBets';
import getProfile from './getProfile';
import loaderReducers from './loaderReducers';
import getCurrentOrientation from './getOrientation';
import forgotPasswordReducer from './Authentication/forgotPasswordReducer';
import authWelcomeReducer from './Authentication/authWelcomeReducer';
import mainGamePlay from './mainGamePlayReducer';
import getSettings from './getSettings';

// Pool Gaming
import getUserLimit from './getUserLimit';
import setUserLimit from './setUserLimit';

// casino
import casino from './casinoReducer';
import liveCasino from './liveCasinoReducer';
// country and tournament list
import listDataReducer from './listReducer';
// live betting
import liveBettingReducer from './liveBettingReducer';
// funds
import fundsTransferReducer from './fundsTransfer';
// todaqy
import todayMatchReducer from './todayReducer';
import virtualGamesReducer from './virtualGamesReducer';

const appReducer = combineReducers({
  getProfile,
  // getBets,
  // bets
  getPendingBets,
  getResolvedBets,
  loaderReducers,
  getCurrentOrientation,
  forgotPasswordReducer,
  authWelcomeReducer,
  // settings
  getSettings,
  mainGamePlay,
  getUserLimit,
  setUserLimit,
  casino,
  liveCasino,
  // country and tournament list
  listDataReducer,
  // live betting
  liveBettingReducer,
  // funds
  fundsTransferReducer,
  // today
  todayMatchReducer,
  virtualGamesReducer,
});

const initialState = appReducer(undefined, {});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST_SUCCESS) {
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;

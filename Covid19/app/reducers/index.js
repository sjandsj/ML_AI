// @flow
import { combineReducers } from 'redux';
import loaderReducers from './loaderReducers';
import getSportsReducers from './getSportsReducers';

const appReducer = combineReducers({
  loaderReducers,
  getSportsReducers,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

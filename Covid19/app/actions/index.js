import { bindActionCreators } from 'redux';
import { store } from '../store';

import {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,

} from './authenticationActions';

const actions = {
  getSportsRequest,
  getSportsSuccess,
  getSportsFailure,
};

export default bindActionCreators(actions, store.dispatch);
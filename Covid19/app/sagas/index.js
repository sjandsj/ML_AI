import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import sportsSaga from './Sport/sportsSaga';

function* root() {
  yield fork(sportsSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;

import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
import watchApi from '../api/saga';
import authenticationSaga from './Authentication/authenticationSaga';
import forgotPasswordSaga from './ForgotPassword/forgotPasswordSaga';
import dashboardSaga from './Dashboard/dashboardSaga';
import StartupSaga from './startupSaga';
import UserLimitSaga from './UserLimit/userLimitSagas';
import ProfileSaga from './Profile/profileSaga';
import CasinoSaga from './Casino/casinoSaga';
import LiveCasinoSaga from './LiveCasino/liveCasinoSaga';
import ListSaga from './Lists/listSaga';
import LiveMatchesSaga from './LiveBetting/liveBettingSaga';
import TransferFunds from './FundsTransfer/fundsTransferSaga';
import TodaySaga from './Today/todaySaga';
import VirtualGamesSaga from './VirtualGames/virtualGamesSaga';

function* root() {
  yield fork(StartupSaga);
  yield fork(watchApi);
  yield fork(authenticationSaga);
  yield fork(forgotPasswordSaga);
  yield fork(dashboardSaga);
  yield fork(UserLimitSaga);
  yield fork(ProfileSaga);
  yield fork(CasinoSaga);
  yield fork(LiveCasinoSaga);
  yield fork(ListSaga);
  yield fork(LiveMatchesSaga);
  yield fork(TransferFunds);
  yield fork(TodaySaga);
  yield fork(VirtualGamesSaga);
}

const run = () => sagaMiddleware.run(root);

export default run;

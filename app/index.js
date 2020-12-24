import React, { Component } from 'react';
import { AsyncStorage, AppState } from 'react-native';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Navigator from './navigator';
import UserActions from './actions';
import timeConverterinSecond from './components/TimeConverterinSecond';
import { AlertRealityCheckOptions, showRealityCheckAlert } from './utils/showAlert';
import { asyncNames } from './utils/appconstant';
import constants from './utils/constants';
import { Storage } from './storage/storage';
import NavigationService from './navigator/NavigationService';
import { logoutReason, SCREENS } from './utils/av_constants';
import Utils, { isLandscape, isPortrait } from './utils/utils';
import { toFixTwoDigitAfterDecimal } from './utils/utils_functions';


let isAlertVisible = false;

const message = interval => `You have been playing since ${interval} minutes. Are you sure you want continue to play?`;

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      seconds: 0,
      savedTime: 0,
      realityTime: 30,
      // eslint-disable-next-line react/no-unused-state
      isPortraitView: isPortrait(Orientation.getInitialOrientation()) ? Boolean(true) : Boolean(false),
      // eslint-disable-next-line react/no-unused-state
      screenOrientation: Orientation.getInitialOrientation(),
      appState: AppState.currentState,
      isLoggedin: false,
    };
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
    AppState.addEventListener('change', this._handleAppStateChange);
    // this locks the view to Landscape Mode
    // Orientation.lockToLandscape();
    // this.props.getSettingsRequest();
  }

  getSessionBackgroundTimeDifference() {
    AsyncStorage.getItem(asyncNames.SET_BACKGROUND_TIME).then((value) => {
      // Get current time in timeStamp
      const date = new Date();
      const currentTimeStamp = date.getTime();

      // Get last background/close app time in timeStamp
      const val = JSON.parse(value);
      const expireTime = new Date(val);
      const timeStamp = expireTime.getTime();

      // time difference in timestamp
      const diff = currentTimeStamp - timeStamp;
      // convert Time into Minutes
      const sessionTime = diff / (1000 * 60);
      // Logout check if background time or close time is more then 30min.
      AsyncStorage.setItem(asyncNames.SET_BACKGROUND_TIME, '');
      if (!_.isEmpty(value) && sessionTime >= 30) {
        new Utils().getItemWithKey(constants.APP_ACCESS_TOKEN, (response) => {
          if (response && response.access_token) {
            this.props.logoutRequest(logoutReason.INACTIVITY);
          }
        });
      }
    }).done();
  }

  getUserActivityTimeInApp(time) {
    // Set user activity time in app. and last saved time in app.
    AsyncStorage.getItem(asyncNames.SET_ACTIVE_TIME).then((value) => {
      this.setState({
        seconds: JSON.parse(value),
        realityTime: time,
      }, () => this.timerStart(this.state.savedTime));
    }).done();
  }

  getSeconds = () => {
    this.setState({
      seconds: this.state.seconds + 1,
    }, () => {
      // store every seconds in storage.
      AsyncStorage.setItem(asyncNames.SET_ACTIVE_TIME, JSON.stringify(this.state.seconds));
      const timer = this.state.seconds / 60;
      // Reminder for 30 minutes alert reality check.
      if (timer % this.state.realityTime === 0) {
        if (isAlertVisible === false) {
          isAlertVisible = true;
          showRealityCheckAlert('Alert!', message(this.state.realityTime), (actionType) => {
            isAlertVisible = false;
            if (actionType === AlertRealityCheckOptions.logout) {
              this.props.logoutRequest(logoutReason.REALITY_CHECK);
            } else if (actionType === AlertRealityCheckOptions.navigate) {
              NavigationService.navigate(SCREENS.ACCOUNT);
            }
          });
        }
      }
    });
  }

  timerStart() {
    this.stopReminder();
    const timerID = setInterval(this.getSeconds, 1000); // take variable in global and reset when logout
    Storage.setItemWithKeyAndValue(asyncNames.TIMER_ID, timerID);
  }

  stopReminder() {
    Storage.getItemWithKey(asyncNames.TIMER_ID, (value) => {
      clearInterval(value);
    });
  }

  _orientationDidChange = (orientation) => {
    let isPortraitOrientation = true;
    if (isLandscape(orientation)) {
      isPortraitOrientation = false;
    }
    // Keyboard.dismiss();
    this.setState({
      isPortraitView: isPortraitOrientation,
      screenOrientation: orientation,
    });
  }

  _handleAppStateChange = (nextAppState) => {
    const { appState } = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      Orientation.getOrientation((err, orientation) => {
        this._orientationDidChange(orientation);
      });
    }
    this.setState({ appState: nextAppState });
  }

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
  }

  render() {
    const { isPortraitView, screenOrientation } = this.state;
    const { mainGamePlay } = this.props;
    const balance = this.props.getProfileState && this.props.getProfileState.walletAmount;
    const betSlipsData = mainGamePlay && mainGamePlay.betSlips;
    const netOddsForComboBet = mainGamePlay && mainGamePlay.netOddsForComboBet;

    return (
      <Navigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        screenProps={{
          isLoggedin: this.state.isLoggedin,
          betSlipCount: betSlipsData.length,
          betSlipOddCount: netOddsForComboBet.toFixed(2),
          onSuccessLogin: isLoggedin => this.setState({ isLoggedin }),
          balance: toFixTwoDigitAfterDecimal(balance),
          isPortrait: isPortraitView,
          orientation: screenOrientation,
          activeTimer: timeConverterinSecond(this.state.seconds),
          getUserActivityTimeInApp: time => this.getUserActivityTimeInApp(time),
          getSessionBackgroundTimeDifference: () => this.getSessionBackgroundTimeDifference(),
        }
        }
      />
    );
  }
}

AppWrapper.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  logoutRequest: PropTypes.func,
  getSettingsRequest: PropTypes.func,
};

AppWrapper.defaultProps = {
  navigation: {},
  logoutRequest: () => { },
  getSettingsRequest: () => { },
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  getProfileState: state.getProfile,

});

const mapDispatchToProps = () => UserActions;

const AppWrapperScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWrapper);

export default AppWrapperScreen;

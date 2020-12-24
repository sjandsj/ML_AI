import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  StatusBar,
  StyleSheet,
} from 'react-native';
import constants from '../../utils/constants';
import Navigation from '../../utils/navigation';
import { windowSize, responsiveSize } from '../../utils/utils';
import { Storage } from '../../storage/storage';
import { UserData } from '../../utils/global';
import SplashContainer from './components/SplashContainer';

const delayTime = 1000;
const splashTime = 100;
const parallelSplashTime = 300;
const splashPadding = 80;
const splashViewHeight = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Splash extends Component {
  constructor(props) {
    super(props);
    Navigation.sharedInstance().setAppNavigation(props.navigation);
    this.state = {
      fadeAnimation: new Animated.Value(1),
      splashWidth: new Animated.Value(responsiveSize(0)),
      splashHeight: new Animated.Value(responsiveSize(0)),
      showSecondIcon: false,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.startSplash();
  }

  navigateToCurrentScreen() {
    Storage.getItemWithKey(constants.APP_ACCESS_TOKEN, (response) => {
      let screen = 'DrawerStack';
      if (response && response.access_token) {
        UserData.BearerToken = response.access_token;
        const { onSuccessLogin } = this.props.screenProps; // LOGIN USER CODE
        onSuccessLogin(true);
        screen = 'DrawerStackAfterLogin';
      } else {
        const { onSuccessLogin } = this.props.screenProps; // LOGIN USER CODE
        onSuccessLogin(false);
        screen = 'DrawerStack';
      }
      this.goToScreen(screen);
    });
  }

  startSplash() {
    const { fadeAnimation, splashWidth, splashHeight } = this.state;
    Animated.delay(delayTime).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnimation, { toValue: 0, duration: splashTime }),
      ]).start(() => {
        this.setState({
          showSecondIcon: true,
        }, () => {
          Animated.parallel([
            Animated.timing(
              splashWidth,
              { toValue: windowSize.width - splashPadding, duration: parallelSplashTime },
            ),
            Animated.timing(
              splashHeight,
              { toValue: responsiveSize(splashViewHeight), duration: parallelSplashTime },
            ),
          ]).start(() => {
            Animated.delay(delayTime).start(() => {
              this.navigateToCurrentScreen();
            });
          });
        });
      });
    });
  }

  goToScreen(screenName) {
    const { screenProps } = this.props;
    Navigation.sharedInstance().resetRouteName(
      screenName,
      {
        isPortrait: true,
        screenOrientation: screenProps.orientation,
      },
    );
  }

  render() {
    const { showSecondIcon, splashWidth, splashHeight } = this.state;
    return (
      <View style={styles.container}>
        <SplashContainer
          splashHeight={Number(splashHeight)}
          splashWidth={Number(splashWidth)}
          showSecondIcon={showSecondIcon}
        />
      </View>
    );
  }
}

Splash.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  screenProps: PropTypes.objectOf(PropTypes.any),
};

Splash.defaultProps = {
  navigation: {},
  screenProps: {},
};

export default Splash;

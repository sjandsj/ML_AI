import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import Logo from '../../components/Navigation/Logo';
import Menu from "../../components/Navigation/Menu";
import { UIColors } from '../../utils/variables';
import Loader from '../../components/Loader';
import { AuthWelcomeView } from '../../utils/enum';
import { isIphoneX } from '../../utils/platformSpecific';
import {
  responsiveSize,
  sizeWithCurrentOrientation,
  navigationHeight,
} from '../../utils/utils';
import { SCREENS } from '../../utils/av_constants';
import Login from './Login';
import SignUp from './Signup';
import Footer from './Footer';
import { getPrivacyPolicyUrl, getTermOfUseUrl, getRulesUrl } from '../../api/urls';
import Navigation from '../../utils/navigation';
import { images } from '../../assets/images';
import { authenticationLocalizedString } from '../../localization/authenticationLocalizeStrings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  navigationView: {
    height: navigationHeight,
    alignItems: 'center',
    flexDirection: 'row',
  },
  componentView: {
    flex: 5,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  headerPortraitView: {
    flex: 9,
  },
  headerLandscapeView: {
    flex: 6,
  },
  introContainerPortrait: {
    flex: 8,
  },
  introContainerLandscape: {
    flex: 5.7,
    flexDirection: 'row',
  },
  introView: {
    flex: 3,
  },
  headerView: {
    flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    width: '100%',
  },
  blankSubNavigationView: {
    flex: 2,
  },
  logoSubNavigationView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonSubnavigationView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Authentication extends Component {

  // componentDidMount() {
  //   console.log('*********AUTH');

  // }

  openPrivacyPolicy() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getPrivacyPolicyUrl, name: authenticationLocalizedString.privacyPolicy } });
  }

  openTermOfUse() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getTermOfUseUrl, name: authenticationLocalizedString.termsOfUse } });
  }

  openRules() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getRulesUrl, name: authenticationLocalizedString.rules } });
  }

  openScreen(currentAuthWelcomeView) {
    const { openLoginView, openSignupView } = this.props;
    switch (currentAuthWelcomeView) {
      case AuthWelcomeView.AUTH_LOGIN:
        return (openLoginView());
      case AuthWelcomeView.AUTH_SIGNUP:
        return (openSignupView());
      default:
        return (openLoginView());
    }
  }

  rightButtonAction() {
    Navigation.sharedInstance().popScreen();
    this.props.openLoginView();
  }

  renderLogin = () => {
    const { screenProps } = this.props;
    return (
      <Login
        onPressSignUp={() => this.openScreen(AuthWelcomeView.AUTH_SIGNUP)}
        screenOrientation={screenProps.orientation}
        screenProps={screenProps}
      />
    );
  }

  renderSignup = () => {
    const { screenProps } = this.props;
    return (
      <SignUp
        screenOrientation={screenProps.orientation}
        onPressSignIn={() => this.openScreen(AuthWelcomeView.AUTH_LOGIN)}
      />);
  }

  renderCurrentView = (currentAuthWelcomeView) => {
    switch (currentAuthWelcomeView) {
      case AuthWelcomeView.AUTH_LOGIN:
        return (this.renderLogin());
      case AuthWelcomeView.AUTH_SIGNUP:
        return (this.renderSignup());
      default:
        return (this.renderLogin());
    }
  }

  render() {
    const {
      currentAuthWelcomeView, screenProps, isLoading,
    } = this.props;
    const { screenHeight } = sizeWithCurrentOrientation(screenProps.orientation);
    
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          extraHeight={responsiveSize(100)}
          keyboardShouldPersistTaps="handled"
          enableAutoAutomaticScroll
          enableOnAndroid
        >
          <View style={[styles.headerView, { height: screenHeight }]}
          >
            <View style={[styles.navigationView, (isIphoneX && screenProps.orientation !== 'LANDSCAPE') && { marginTop: 40 }]}>
              <View style={[styles.blankSubNavigationView, { height: navigationHeight }]} />
              <View style={[styles.logoSubNavigationView, { height: navigationHeight }]}>
                <Logo />
              </View>
              <View style={[styles.cancelButtonSubnavigationView, { height: navigationHeight }]}>
                {/* <Menu
                  rightButtonAction={() => this.rightButtonAction()}
                  rightButtonImage={images.yellowCross}
                /> */}
              </View>
            </View>
            <View style={styles.componentView}>
              {this.renderCurrentView(currentAuthWelcomeView)}
            </View>
            <Footer
              openPrivacyPolicy={this.openPrivacyPolicy}
              openTermOfUse={this.openTermOfUse}
              openRules={this.openRules}
            />
          </View>
        </KeyboardAwareScrollView>
        {isLoading && <Loader isAnimating={isLoading} />}
      </View>
    );
  }
}

Authentication.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  screenProps: PropTypes.objectOf(PropTypes.any),
  currentAuthWelcomeView: PropTypes.number,
  isLoading: PropTypes.bool,
  openAuthForgotPasswordView: PropTypes.func,
  openForgotPasswordView: PropTypes.func,
  openLoginView: PropTypes.func,
  openSignupView: PropTypes.func,
  openAuthWelcomeView: PropTypes.func,
  resetFetchLeaderboard: PropTypes.func,
};

Authentication.defaultProps = {
  navigation: {},
  screenProps: {},
  currentAuthWelcomeView: AuthWelcomeView.AUTH_WELCOME,
  isLoading: false,
  openAuthForgotPasswordView: () => {},
  openForgotPasswordView: () => {},
  openLoginView: () => {},
  openSignupView: () => {},
  openAuthWelcomeView: () => {},
  resetFetchLeaderboard: () => {},
};

const mapStateToProps = state => ({
  currentAuthWelcomeView: state.authWelcomeReducer.currentAuthWelcomeView,
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;
const AuthenticationScreen = connect(mapStateToProps, mapDispatchToProps)(Authentication);
export default AuthenticationScreen;


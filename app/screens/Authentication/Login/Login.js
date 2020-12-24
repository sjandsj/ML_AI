import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../../../actions';
import { images } from '../../../assets/images';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import ToggleIcon from '../../../components/ToggleIcon';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { authenticationLocalizedString } from '../../../localization/authenticationLocalizeStrings';
import { isValidEmail, isValidPassword, isEmailText, isValidUsername } from '../../../utils/validators';
import { InputKey, ReturnKeyType, KeyboardType } from '../../../utils/constants';
import { showPopupAlert } from '../../../utils/showAlert';
import { isNetworkConnected } from '../../../utils/utils';
import { UIColors, fontName, itemSizes, spacing, fontSizes } from '../../../utils/variables';
import constants from '../../../utils/constants';
import { Storage } from '../../../storage/storage';
import Navigation from '../../../utils/navigation';

const inputWidth = '90%';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: 'red',
    margin: spacing.extraSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  subContainer: {
    // flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: spacing.large,
    borderRadius: 10,
    width: '95%',
    // maxWidth: 500,
  },
  emailIcon: {
    width: itemSizes.iconMedium,
    height: itemSizes.iconMedium,
    resizeMode: 'cover',
    marginRight: spacing.extraSmall,
    marginLeft: spacing.semiMedium,
  },
  inputMainView: {
    alignSelf: 'stretch',
    height: itemSizes.itemWidth,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  textInput: {
    height: itemSizes.itemWidth,
    fontSize: fontSizes.small,
    marginLeft: spacing.semiMedium,
    color: UIColors.secondaryText,
    borderBottomWidth: 1,
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    alignSelf: 'stretch',
    width: inputWidth,
  },
  forgotPasswordContainer: {
    alignSelf: 'stretch',
    height: itemSizes.defaultButtonHeight,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: spacing.mediumLarge,
  },
  forgotPasswordButton: {
    height: itemSizes.iconSmall,
    width: itemSizes.iconSmall,
    marginRight: spacing.extraSmall,
    tintColor: UIColors.newAppYellowColor,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginRight: spacing.small,
    color: UIColors.defaultBlack,
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  buttonFlex: {
    flexDirection: 'row',
    alignItems: 'flex-end',

  },
  authButton: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  loginButtonText: {
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
  },
  viewForSignUp: {
    flexDirection: 'row',
    marginTop: 15,
  },
  signUpButtonText: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.focused,
    fontSize: 18,
  },
  signUpMessage: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
    lineHeight: 25,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowPassword: false,
    };
  }

  // componentDidMount() {

  //   Storage.getItemWithKey(constants.APP_ACCESS_TOKEN, (response) => {
  //    console.log('*********LOGIN')
  //     if (response && response.access_token) {

  //     } else {
  //       const {onSuccessLogin} = this.props.screenProps; // LOGIN USER CODE
  //       onSuccessLogin(false);
  //     }
  //   });
  // }

  onChangeEmailText(email) {
    this.setState({ email });
  }

  onChangePasswordText(password) {
    this.setState({ password });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.email:
          this.passwordInput.focus();
          break;
        case InputKey.password:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(' error: ', error);
    }
  }

  getTextInputReference(key, reference) {
    switch (key) {
      case InputKey.email:
        this.emailInput = reference;
        break;
      case InputKey.password:
        this.passwordInput = reference;
        break;
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    const { email, password } = this.state;
    // Email or Username
    if (!email) {
      return commonLocalizeStrings.emptyEmailUsernameErrorMessage;
    }
    if (isEmailText(email)) {
      if (!isValidEmail(email)) {
        return commonLocalizeStrings.invalidEmailErrorMessage;
      }
    } else if (!isValidUsername(email)) {
      return commonLocalizeStrings.incorrectUsernameErrorMessage;
    }
    // Password
    if (!password) {
      return commonLocalizeStrings.emptyPasswordErrorMessage;
    }
    return null;
  }

  loginAction() {
    const { email, password } = this.state;
    const { userLoginRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      isNetworkConnected((isConnected) => {
        if (isConnected) {
          userLoginRequest(email, password);
        }
      });
    }
  }

  showPassowrdText() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  updateTabbar(screenProps) {
    screenProps.onSuccessLogin(true);
    
  }

  render() {
    const {
      screenOrientation,
      loginUserData,
      screenProps,
    } = this.props;
    const {
      email,
      password,
      isShowPassword,
    } = this.state;
    // eslint-disable-next-line no-lone-blocks
    {
      loginUserData.access_token &&
        this.updateTabbar(screenProps);
    }
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.inputMainView}>
              <Image style={styles.emailIcon} source={images.email} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={authenticationLocalizedString.loginText}
                inputKey={InputKey.email}
                getTextInputReference={(key, reference) =>
                  this.getTextInputReference(key, reference)}
                keyboardType={KeyboardType.emailAddress}
                value={email}
                returnKeyType={ReturnKeyType.next}
                onChangeText={value => this.onChangeEmailText(value)}
                onSubmitEditing={key => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputMainView}>
              <Image style={styles.emailIcon} source={images.passwordIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={StyleSheet.flatten(styles.textInputView)}
                placeholder={authenticationLocalizedString.password}
                placeholderTextColor={UIColors.defaultTextColor}
                inputKey={InputKey.password}
                secureTextEntry={!isShowPassword}
                getTextInputReference={(key, reference) =>
                  this.getTextInputReference(key, reference)}
                value={password}
                returnKeyType={ReturnKeyType.done}
                onChangeText={value => this.onChangePasswordText(value)}
                onSubmitEditing={key => this.onSubmitEditing(key)}
              />
              <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                screenOrientation={screenOrientation}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (isValidEmail(email)) {
                    this.props.resetPasswordLinkRequest(email);
                  } else {
                    alert(authenticationLocalizedString.invalidEmail);
                  }
                }}
                style={styles.buttonFlex}
              >
                <Image
                  source={images.questionIcon}
                  style={styles.forgotPasswordButton}
                />
                <Text style={styles.forgotPasswordText}>
                  {authenticationLocalizedString.forgotPassword}
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              buttonStyle={styles.authButton}
              onPress={() => this.loginAction()}
              buttonTitle={authenticationLocalizedString.login}
              textStyle={styles.loginButtonText}
            />
          </View>
          <View style={styles.viewForSignUp}>
            <Text style={styles.signUpMessage}>{authenticationLocalizedString.dontHaveAccount}</Text>
            <CustomButton
              buttonStyle={{}}
              textStyle={styles.signUpButtonText}
              onPress={this.props.onPressSignUp}
              buttonTitle={authenticationLocalizedString.signUp}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  openForgotPasswordScreen: PropTypes.func,
  userLoginRequest: PropTypes.func,
  facebookAction: PropTypes.func,
  googleAction: PropTypes.func,
  loginAction: PropTypes.func,
  screenOrientation: PropTypes.string,
  screenProps: PropTypes.objectOf(PropTypes.any),

};

Login.defaultProps = {
  openForgotPasswordScreen: () => { },
  userLoginRequest: () => { },
  facebookAction: () => { },
  googleAction: () => { },
  loginAction: () => { },
  screenOrientation: '',
  screenProps: {},

};

const mapDispatchToProps = () => UserActions;
const mapStateToProps = state => ({
  loginUserData: state.authWelcomeReducer.loginUserData,
  isLoading: state.loaderReducers.isLoading,
});

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginScreen;

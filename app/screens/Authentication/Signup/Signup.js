import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../../../actions';
import { images } from '../../../assets/images';
import CustomTextInput from '../../../components/CustomTextInput';
import AuthOptions from '../../../components/AuthOptions';
import ToggleIcon from '../../../components/ToggleIcon';
import { showPopupAlert } from '../../../utils/showAlert';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { isValidEmail, isValidPassword, isValidUsername } from '../../../utils/validators';
import { authenticationLocalizedString } from '../../../localization/authenticationLocalizeStrings';
import CustomButton from '../../../components/CustomButton';
import { InputKey, ReturnKeyType, KeyboardType } from '../../../utils/constants';
import {
  responsiveSize,
  isEmpty,
  isNetworkConnected,
} from '../../../utils/utils';
import { UIColors, fontName, itemSizes, spacing, fontSizes } from '../../../utils/variables';

const buttonWidth = responsiveSize(70);
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
  showOptionalButton: {
    width: buttonWidth,
    height: itemSizes.defaultSmallButtonHeight,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: spacing.extraExtraLarge,
  },
  changeQuestionText: {
    color: UIColors.focused,
    fontSize: fontSizes.extraExtraSmall,
    textAlign: 'right',
    paddingRight: spacing.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
  authButton: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    marginTop: spacing.large,
  },
  signInButtonView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  signInMessage: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
    lineHeight: 25,
  },
  registerButtonText: {
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
  },
  signInButtonText: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.focused,
    fontSize: 18,
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      isShowPassword: false,
    };
  }

  onChangeEmailText(email) {
    this.setState({ email });
  }
  onChangeUserNameText(username) {
    this.setState({ username });
  }
  onChangePasswordText(password) {
    this.setState({ password });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.email:
          this.usernameInput.focus();
          break;
        case InputKey.username:
          this.passwordInput.focus();
          break;
        case InputKey.password:
          this.securityQuestionInput.focus();
          break;
        case InputKey.securityQuestion:
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
      case InputKey.username:
        this.usernameInput = reference;
        break;
      case InputKey.password:
        this.passwordInput = reference;
        break;
      case InputKey.securityQuestion:
        this.securityQuestionInput = reference;
        break;
      default:
        break;
    }
  }

  getValidationErrorMessage() {
    const {
      email, username, password,
    } = this.state;
    // Email
    if (!email) {
      return commonLocalizeStrings.emptyEmailErrorMessage;
    }
    if (!isValidEmail(email)) {
      return commonLocalizeStrings.invalidEmailErrorMessage;
    }
    // Username
    if (!username) {
      return commonLocalizeStrings.emptyUsernameErrorMessage;
    }
    if (!isValidUsername(username)) {
      return commonLocalizeStrings.invalidUsernameErrorMessage;
    }
    // Password
    if (!password) {
      return commonLocalizeStrings.emptyPasswordErrorMessage;
    }
    // if (!isValidPassword(password)) {
    //   return commonLocalizeStrings.invalidPasswordErrorMessage;
    // }
    return null;
  }

  signupAction() {
    const {
      email, username, password,
      // securityAnswer,
    } = this.state;
    const { userRegisterRequest } = this.props;
    const errorMessage = this.getValidationErrorMessage();
    if (errorMessage) {
      showPopupAlert(errorMessage);
    } else {
      isNetworkConnected((isConnected) => {
        const paramsObject = {};
        paramsObject.email = email;
        paramsObject.username = username;
        paramsObject.password = password;
        if (isConnected) {
          userRegisterRequest(paramsObject);
        }
      });
    }
  }

  showPassowrdText() {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  }

  render() {
    const {
      screenOrientation,
      facebookAction,
      googleAction,
    } = this.props;
    const {
      email,
      username,
      password,
      isShowPassword,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.inputMainView}>
              <Image style={styles.emailIcon} source={images.emailIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={styles.textInputView}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={authenticationLocalizedString.emailAddress}
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
              <Image style={styles.emailIcon} source={images.userName} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={styles.textInputView}
                placeholderTextColor={UIColors.defaultTextColor}
                placeholder={authenticationLocalizedString.username}
                inputKey={InputKey.username}
                getTextInputReference={(key, reference) =>
                  this.getTextInputReference(key, reference)}
                value={username}
                returnKeyType={ReturnKeyType.next}
                onChangeText={value => this.onChangeUserNameText(value)}
                onSubmitEditing={key => this.onSubmitEditing(key)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputMainView}>
              <Image style={styles.emailIcon} source={images.passwordIcon} />
              <CustomTextInput
                textInput={StyleSheet.flatten(styles.textInput)}
                inputView={styles.textInputView}
                placeholder={authenticationLocalizedString.password}
                placeholderTextColor={UIColors.defaultTextColor}
                inputKey={InputKey.password}
                secureTextEntry={!isShowPassword}
                getTextInputReference={(key, reference) =>
                  this.getTextInputReference(key, reference)}
                value={password}
                returnKeyType={ReturnKeyType.next}
                onChangeText={value => this.onChangePasswordText(value)}
                onSubmitEditing={key => this.onSubmitEditing(key)}
              />
              <ToggleIcon
                isShowPassword={isShowPassword}
                showPassowrdText={() => this.showPassowrdText()}
                screenOrientation={screenOrientation}
              />
            </View>
            {/* <AuthOptions
            screenOrientation={screenOrientation.orientation}
            title={authenticationLocalizedString.continueWith}
            facebookAction={() => facebookAction()}
            googleAction={() => googleAction()}
            userAction={() => this.signupAction()}
            buttonTitle={authenticationLocalizedString.register}
          /> */}
            <CustomButton
              buttonStyle={styles.authButton}
              onPress={() => this.signupAction()}
              buttonTitle={authenticationLocalizedString.register}
              textStyle={styles.registerButtonText}
            />
          </View>

        </View>
        <View style={styles.signInButtonView}>
          <Text style={styles.signInMessage}>{authenticationLocalizedString.alreadyHaveAnAccount}</Text>
          <CustomButton
            buttonStyle={{}}
            textStyle={styles.signInButtonText}
            onPress={this.props.onPressSignIn}
            buttonTitle={authenticationLocalizedString.signIn}
          />
        </View>
      </SafeAreaView>
    );
  }
}

Signup.propTypes = {
  selectedQuestion: PropTypes.objectOf(PropTypes.any),
  onSecurityQuestionClicked: PropTypes.func,
  userRegisterRequest: PropTypes.func,
  facebookAction: PropTypes.func,
  googleAction: PropTypes.func,
  securityAnswer: PropTypes.string,
  selectedQuestionText: PropTypes.string,
  screenOrientation: PropTypes.objectOf(PropTypes.any),
};

Signup.defaultProps = {
  selectedQuestion: {},
  onSecurityQuestionClicked: () => {},
  userRegisterRequest: () => {},
  facebookAction: () => {},
  googleAction: () => {},
  securityAnswer: '',
  selectedQuestionText: '',
  screenOrientation: {},
};

const mapDispatchToProps = () => UserActions;
const SignupScreen = connect(null, mapDispatchToProps)(Signup);
export default SignupScreen;

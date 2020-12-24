import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { images } from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import CustomTextInput from '../../components/CustomTextInput';
import { FloatingTitleTextInputField } from '../../components/floating_title_text_input_field';

import { spacing, UIColors, fontSizes, fontName, itemSizes, fontWeights } from '../../utils/variables';
import { Localization } from '../../utils/localization';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constant';
import CustomButton from '../../components/CustomButton';
import LanguageHeader from '../../components/LanguageHeader';

const inputWidth = '90%';

const styles = StyleSheet.create({
  // mainContainer: {
  //   flex: 1,
  //   backgroundColor: UIColors.appBackGroundColor,
  // },
  // subContainer: {
  //   flex: 1,
  //   marginVertical: spacing.extraLarge,
  // },
  // loginText: {
  //   fontSize: fontSizes.extraLarge,
  //   color: UIColors.textTitle,
  //   // fontFamily: fontName.sourceSansProBold,
  //   textAlign: 'center',
  // },
  // textInputContainer: {
  //   flexDirection: 'row',
  //   marginHorizontal: spacing.large,
  //   height: itemSizes.defaultIosTextInputHeight,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   alignItems: 'center',
  // },
  // textInput: {
  //   height: itemSizes.defaultIosTextInputHeight,
  //   fontSize: fontSizes.small,
  //   color: UIColors.textTitle,
  //   borderLeftWidth: 1,
  //   paddingLeft: 5,
  //   borderLeftColor: 'gray',
  //   // fontFamily: fontName.sourceSansProRegular,
  // },
  // textInputView: {
  //   width: inputWidth,
  // },
  // emailIcon: {
  //   width: 20,
  //   height: 20,
  //   marginHorizontal: spacing.medium,
  //   resizeMode: 'cover',
  // },
  // forgotBtn: {
  //   marginLeft: spacing.large,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: spacing.small,
  // },
  // loginBtn: {
  //   marginTop: spacing.small,
  //   paddingVertical: spacing.small,
  //   width: itemSizes.largeWidth,
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // backgroundColor: UIColors.purpleButtonColor,
  // },
  // loginBtntxt: {
  //   color: UIColors.navigationTitle,
  //   // fontFamily: fontName.sourceSansProRegular,
  //   fontSize: fontSizes.extraSmall,
  // },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'black',
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

  _updateMasterState = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

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
  
  loginAction(){
    console.log('==========Login')
  }

  langDropdownAction(){
    console.log('==========Dropdown preeses')
  }

  getValidationErrorMessage() {
    const { email, password } = this.state;
    // Email or Username
    // if (!email) {
    //   return commonLocalizeStrings.emptyEmailUsernameErrorMessage;
    // }
    // if (isEmailText(email)) {
    //   if (!isValidEmail(email)) {
    //     return commonLocalizeStrings.invalidEmailErrorMessage;
    //   }
    // } else if (!isValidUsername(email)) {
    //   return commonLocalizeStrings.incorrectUsernameErrorMessage;
    // }
    // // Password
    // if (!password) {
    //   return commonLocalizeStrings.emptyPasswordErrorMessage;
    // }
    return null;
  }

  render() {
    const {
      email,
      password,
      isShowPassword,
    } = this.state;

    return (
      // <View style={styles.mainContainer}>
      //   <NavigationHeader />
        <View style={styles.container}>
          <LanguageHeader
            showLangDropdown
            langDropdownPressed={()=>this.langDropdownAction()}
          />
          <Text  style = {styles.headerText}>Its Amazing</Text>
          <FloatingTitleTextInputField
            attrName = 'firstName'
            title = 'First Name'
            isShowLeftIcon={true}
            value = {this.state.firstName}
            updateMasterState = {this._updateMasterState}
            textInputStyles = {{ // here you can add additional TextInput styles
              color: 'green',
              fontSize: 15,
              marginLeft: 15,
            }}
            otherTextInputProps = {{   // here you can add other TextInput props of your choice
              maxLength: 12,
            }}
          />
          <FloatingTitleTextInputField
            attrName = 'lastName'
            title = 'Last Name'
            value = {this.state.lastName}
            updateMasterState = {this._updateMasterState}
          />
          <CustomButton
            title='Login'
            buttonPressAction={()=>this.loginAction()}
          />
      </View>
      // </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;

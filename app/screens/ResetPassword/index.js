import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserActions from '../../actions';
import Header from '../../components/Header';
import Content from './components/Content';
import { UIColors } from '../../utils/variables';
import { authenticationLocalizedString } from '../../localization/authenticationLocalizeStrings';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import { InputKey } from '../../utils/constants';
import { showPopupAlert } from '../../utils/showAlert';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
  },
  keyboardView: {
    flex: 1,
  },
});

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      reEnterNewPassword: '',
      currentPasswordText: false,
      newPasswordText: false,
      confirmPasswordText: false,
    };
  }


  onSubmitEditing(key) {
    try {
      switch (key) {
        case InputKey.password:
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(commonLocalizeStrings.error, error);
    }
  }

  onChangeOldPasswordText(password) {
    this.setState({ oldPassword: password });
  }

  onChangeNewPasswordText(password) {
    this.setState({ newPassword: password });
  }

  onChangeReEnterPasswordText(password) {
    this.setState({ reEnterNewPassword: password });
  }

  getTextInputReference(key, reference) {

  }

  submitButtonPress() {
    if (_.isEmpty(this.state.oldPassword)) {
      showPopupAlert(authenticationLocalizedString.msgOldPassword);
    } else if (_.isEmpty(this.state.newPassword)) {
      showPopupAlert(authenticationLocalizedString.msgNewPassword);
    } else if (_.isEmpty(this.state.reEnterNewPassword)) {
      showPopupAlert(authenticationLocalizedString.msgConfirmPassword);
    } else if (this.state.newPassword !== this.state.reEnterNewPassword) {
      showPopupAlert(authenticationLocalizedString.msgNotMatchedPassword);
    } else {
      const data = {
        current_password: this.state.oldPassword,
        password: this.state.newPassword,
        password_confirmation: this.state.reEnterNewPassword,
      };
      this.props.resetPasswordInAppRequest(data);
    }
  }

  backButtonAction() {
    this.props.navigation.pop();
  }
  showCurrentPassowrdText() {
    this.setState({
      currentPasswordText: !this.state.currentPasswordText,
    });
  }
  showNewPassowrdText() {
    this.setState({
      newPasswordText: !this.state.newPasswordText,
    });
  }
  showConfirmPassowrdText() {
    this.setState({
      confirmPasswordText: !this.state.confirmPasswordText,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={authenticationLocalizedString.changePassword}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <SafeAreaView style={styles.keyboardView}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            enableAutoAutomaticScroll
            enableOnAndroid
          >
            <Content
              oldPassword={this.state.oldPassword}
              newPassword={this.state.newPassword}
              reEnterNewPassword={this.state.reEnterNewPassword}
              onChangeOldPasswordText={value => this.onChangeOldPasswordText(value)}
              onChangeNewPasswordText={value => this.onChangeNewPasswordText(value)}
              onChangeReEnterPasswordText={value => this.onChangeReEnterPasswordText(value)}
              onSubmitEditing={() => this.onSubmitEditing()}
              getTextInputReference={() => this.getTextInputReference()}
              submitButtonPress={() => this.submitButtonPress()}
              showCurrentPassowrdText={() => this.showCurrentPassowrdText()}
              showNewPassowrdText={() => this.showNewPassowrdText()}
              showConfirmPassowrdText={() => this.showConfirmPassowrdText()}
              currentPasswordText={this.state.currentPasswordText}
              newPasswordText={this.state.newPasswordText}
              confirmPasswordText={this.state.confirmPasswordText}
            />
          </KeyboardAwareScrollView>
        </SafeAreaView>
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  resetPasswordInAppRequest: PropTypes.func,
  isLoading: PropTypes.bool,
};

ResetPasswordScreen.defaultProps = {
  navigation: {},
  resetPasswordInAppRequest: () => {},
  isLoading: false,
};

const mapStateToProps = state => ({
  // getBetsResponse: state.getBets.getBetsResponse,
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;

const ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen);

export default ResetPassword;

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, itemSizes, fontName } from '../../../utils/variables';
import CustomTextInput from '../../../components/CustomTextInput';
import SaveButton from './SaveButton';
import { authenticationLocalizedString } from '../../../localization/authenticationLocalizeStrings';
import { images } from '../../../assets/images';
import ToggleIcon from '../../../components/ToggleIcon';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const topMargin = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
    justifyContent: 'center',
    marginTop: topMargin,
  },
  textStyle: {
    margin: spacing.large,
    color: UIColors.primaryText,
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  textInput: {
    height: itemSizes.defaultButtonHeight,
    fontSize: fontSizes.small,
    marginLeft: spacing.semiMedium,
    color: UIColors.primaryText,
    borderBottomWidth: 1,
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    // width: '60%',
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainView: {
    height: itemSizes.defaultButtonHeight,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: spacing.large,
  },
});

const Content = props => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <View style={styles.inputMainView}>
        <Image style={styles.emailIcon} source={images.passwordIcon} />
        <CustomTextInput
          textInput={StyleSheet.flatten(styles.textInput)}
          inputView={StyleSheet.flatten(styles.textInputView)}
          placeholder={authenticationLocalizedString.oldPassword}
          placeholderTextColor={UIColors.defaultTextColor}
          secureTextEntry={!props.currentPasswordText}
          value={props.oldPassword}
          onChangeText={value => props.onChangeOldPasswordText(value)}
          onSubmitEditing={key => props.onSubmitEditing(key)}
          getTextInputReference={(key, reference) =>
            props.getTextInputReference(key, reference)}
        />
        <ToggleIcon
          isShowPassword={props.currentPasswordText}
          showPassowrdText={() => props.showCurrentPassowrdText()}
        />
      </View>
      <View style={styles.inputMainView}>
        <Image style={styles.emailIcon} source={images.passwordIcon} />
        <CustomTextInput
          textInput={StyleSheet.flatten(styles.textInput)}
          inputView={StyleSheet.flatten(styles.textInputView)}
          placeholder={authenticationLocalizedString.newPassword}
          placeholderTextColor={UIColors.defaultTextColor}
          secureTextEntry={!props.newPasswordText}
          value={props.newPassword}
          onChangeText={value => props.onChangeNewPasswordText(value)}
          onSubmitEditing={key => props.onSubmitEditing(key)}
          getTextInputReference={(key, reference) =>
          props.getTextInputReference(key, reference)}
        />
        <ToggleIcon
          isShowPassword={props.newPasswordText}
          showPassowrdText={() => props.showNewPassowrdText()}
        />
      </View>
      <View style={styles.inputMainView}>
        <Image style={styles.emailIcon} source={images.passwordIcon} />
        <CustomTextInput
          textInput={StyleSheet.flatten(styles.textInput)}
          inputView={StyleSheet.flatten(styles.textInputView)}
          placeholder={authenticationLocalizedString.confirmPassword}
          placeholderTextColor={UIColors.defaultTextColor}
          secureTextEntry={!props.confirmPasswordText}
          value={props.reEnterNewPassword}
          onChangeText={value => props.onChangeReEnterPasswordText(value)}
          onSubmitEditing={key => props.onSubmitEditing(key)}
          getTextInputReference={(key, reference) =>
            props.getTextInputReference(key, reference)}
        />
        <ToggleIcon
          isShowPassword={props.confirmPasswordText}
          showPassowrdText={() => props.showConfirmPassowrdText()}
        />
      </View>
    </View>
    <SaveButton
      onPress={props.submitButtonPress}
      title={commonLocalizeStrings.save}
    />
  </View>
);

Content.propTypes = {
  getTextInputReference: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeReEnterPasswordText: PropTypes.func,
  onChangeNewPasswordText: PropTypes.func,
  onChangeOldPasswordText: PropTypes.func,
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  reEnterNewPassword: PropTypes.string,
  title: PropTypes.string,
  submitButtonPress: PropTypes.func,
};

Content.defaultProps = {
  getTextInputReference: () => {},
  onSubmitEditing: () => {},
  onChangeReEnterPasswordText: () => {},
  onChangeNewPasswordText: () => {},
  onChangeOldPasswordText: () => {},
  onPress: () => {},
  submitButtonPress: () => {},
  isDisabled: false,
  oldPassword: '',
  newPassword: '',
  reEnterNewPassword: '',
  title: '',
};


export default Content;

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { UIColors, fontName, fontSizes, spacing } from '../utils/variables';

const { width } = Dimensions.get('window');
const space = 80;

const styles = StyleSheet.create({
  inputView: {
    // width: (width / 3) * 2.5,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginTop: spacing.mediumLarge,
    left: spacing.semiMedium,
    // backgroundColor: UIColors.success,
  },
  inputTitle: {
    // color: UIColors.secondaryText,
    fontSize: fontSizes.small,
    textAlign: 'left',
    marginBottom: spacing.semiMedium,
    // fontFamily: fontName.SourceSansProSemiBold,
  },
  textInput: {
    // width: width - space,
    fontSize: fontSizes.small,
    marginLeft: spacing.semiMedium,
    // paddingBottom: spacing.extraSmall,
    marginTop: Platform.OS === 'ios' ? 5 : -8,
    // color: UIColors.primaryText,
    borderBottomWidth: 1,
    // borderBottomColor: UIColors.primaryText,
  },
});

const CustomTextInput = ({
  title,
  titleStyle,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  selectionColor,
  keyboardType,
  editable,
  secureTextEntry,
  returnKeyType,
  autoCapitalize,
  autoCorrect,
  onSubmitEditing,
  onFocus,
  inputKey,
  getTextInputReference,
  inputView,
  textInput,
  paddingRight,
  autoFocus,
  maxLength,
}) => (
  <View style={inputView}>
    {title !== '' && <Text style={[styles.inputTitle, titleStyle]}>{title}</Text>}
    <TextInput
      style={textInput}
      ref={(ref) => {
        getTextInputReference(inputKey, ref);
      }}
      autoFocus={autoFocus}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      keyboardType={keyboardType}
      underlineColorAndroid={UIColors.transparentColor}
      secureTextEntry={secureTextEntry}
      editable={editable}
      returnKeyType={returnKeyType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      onSubmitEditing={() => onSubmitEditing(inputKey)}
      onFocus={() => onFocus()}
      paddingRight={paddingRight}
      maxLength={maxLength}
    />
  </View>
);

CustomTextInput.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  value: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  selectionColor: PropTypes.string,
  keyboardType: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  returnKeyType: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  inputKey: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  getTextInputReference: PropTypes.func,
  onChangeText: PropTypes.func,
  paddingRight: PropTypes.number,
  inputView: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  textInput: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
};

CustomTextInput.defaultProps = {
  title: '',
  titleStyle: {},
  value: '',
  placeholder: '',
  placeholderTextColor: UIColors.primaryText,
  selectionColor: UIColors.secondaryText,
  keyboardType: 'default',
  editable: true,
  secureTextEntry: false,
  returnKeyType: 'done',
  autoCapitalize: 'none',
  autoCorrect: false,
  onSubmitEditing: () => {},
  onFocus: () => {},
  inputKey: '',
  getTextInputReference: () => {},
  onChangeText: () => {},
  inputView: {},
  paddingRight: 1,
  textInput: {},
  autoFocus: false,
  maxLength: 50,
};
export default CustomTextInput;

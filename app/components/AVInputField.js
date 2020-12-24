import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import colors from '../theme/colors';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    paddingBottom: 5,
    color: colors.fontYellowColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.seperatorColor,
  },
});

const AVInputField = ({
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
  paddingRight,
  maxLength,
  style,
}) => (
  <View style={styles.inputView}>
    <TextInput
      style={[styles.textInput, { marginLeft: style.fieldMarginLeft }]}
      ref={(ref) => {
          getTextInputReference(inputKey, ref);
        }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      keyboardType={keyboardType}
      underlineColorAndroid="transparent"
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

AVInputField.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  selectionColor: PropTypes.string,
  keyboardType: PropTypes.string,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  returnKeyType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  inputKey: PropTypes.string,
  getTextInputReference: PropTypes.func,
  onChangeText: PropTypes.func,
  paddingRight: PropTypes.number,
  inputView: PropTypes.objectOf(PropTypes.any),
  textInput: PropTypes.objectOf(PropTypes.any),
  style: PropTypes.objectOf(PropTypes.any),
  maxLength: PropTypes.number,
};

AVInputField.defaultProps = {
  title: '',
  titleStyle: {},
  value: '',
  placeholder: '',
  // placeholderTextColor: 'white',
  placeholderTextColor: UIColors.newAppFontBlackColor,
  // selectionColor: 'white',
  selectionColor: UIColors.newAppFontBlackColor,
  keyboardType: 'default',
  editable: true,
  secureTextEntry: false,
  returnKeyType: 'done',
  autoCapitalize: 'none',
  autoCorrect: false,
  onSubmitEditing: () => { },
  onFocus: () => { },
  inputKey: '',
  getTextInputReference: () => { },
  onChangeText: () => { },
  inputView: {},
  paddingRight: 1,
  textInput: {},
  style: {
    fieldMarginLeft: 0,
  },
  maxLength: 500,
};
export default AVInputField;

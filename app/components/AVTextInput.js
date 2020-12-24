import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import AVInputField from './AVInputField';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    paddingRight: 5,
    marginTop: 15,
    flex: 1,
  },
  inputTitle: {
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    paddingBottom: 5,
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
    borderBottomWidth: 1,
    // borderBottomColor: 'white',
    borderBottomColor: UIColors.newAppBlackBorderColor,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
  },
});

const AVTextInput = ({
  title,
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
  icon,
}) => {
  const isTitle = title.length > 0;
  const flexDirection = isTitle ? 'column' : 'row';
  const fieldMarginLeft = isTitle ? 35 : 5;
  const titleMarginLeft = isTitle ? 15 : 5;

  return (
    <View style={[styles.inputView, { flexDirection }]}>
      <View style={styles.iconView}>
        <Image source={icon} style={{ width: 18, height: 18 }} />
        <Text style={[styles.title, { marginLeft: titleMarginLeft }]}>{title}</Text>
      </View>
      <AVInputField
        style={{ fieldMarginLeft }}
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
      />
    </View>
  );
};

AVTextInput.propTypes = {
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
  icon: PropTypes.objectOf(PropTypes.any),
};

AVTextInput.defaultProps = {
  title: '',
  titleStyle: {},
  value: '',
  placeholder: '',
  // placeholderTextColor: 'white',
  // selectionColor: 'white',
  placeholderTextColor: UIColors.newAppFontBlackColor,
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
  icon: null,
};
export default AVTextInput;

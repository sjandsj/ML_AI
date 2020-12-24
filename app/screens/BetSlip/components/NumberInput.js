import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, spacing, fontWeights, fontSizes } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: spacing.largest,
    padding: 7,
    width: 300,
    backgroundColor: 'green',
    height: itemSizes.defaultHeight,

  },
  textInput: {
    // flex: 1,
    borderBottomColor: 'red',

    height: Platform.OS === 'android' ? itemSizes.itemSizes35 + 10 : itemSizes.itemSizes25 + 10,
    color: 'black',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.extraExtraSmall,
    // borderRadius: spacing.numbertextBorderRadius,
    // padding: spacing.largest,
  },
  input: {
    color: 'black',
    borderBottomColor: 'red',

    fontWeight: fontWeights.medium,
    fontSize: fontSizes.extraExtraSmall,
    // padding: 3,
    height: Platform.OS === 'android' ? itemSizes.itemSizes35 + 10 : itemSizes.itemSizes25 + 10,
  },

});

const NumberInput = (props) => (
  <View style={styles.container}>
    <TextInput
      style={[props.type === 'Reality' ? styles.input : styles.textInput]}
      value={props.value}
      defaultValue={props.defaultValue}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureText}
      autoCapitalize={'none'}
      spellCheck={false}
      onSubmitEditing={props.onSubmitText}
      placeholder={props.placeholder}
      placeholderTextColor={UIColors.appGreenColor}
      keyboardType={props.keyboardType}
      autoCorrect={false}
      // editable={props.locked}
    />
  </View>
);

NumberInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  secureText: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSubmitText: PropTypes.func,
};

NumberInput.defaultProps = {
  type: '',
  value: '',
  defaultValue: '',
  label: '',
  placeholder: '',
  keyboardType: 'default',
  secureText: false,
  onChangeText: () => { },
  onSubmitText: () => { },
};

export default NumberInput;

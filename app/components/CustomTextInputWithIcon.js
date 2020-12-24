import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import CustomTextInput from './CustomTextInput';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  emailIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginRight: 5,
    marginLeft: 10,
  },
  inputMainView: {
    alignSelf: 'stretch',
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    marginLeft: 10,
    // color: 'white',
    color: UIColors.newAppFontBlackColor,
    borderBottomWidth: 1,
  },
  textInputView: {
    alignSelf: 'stretch',
    width: '88%',
  },
});

const CustomText = props => (
  <View style={styles.inputMainView}>
    <Image style={styles.emailIcon} source={props.email} />
    <CustomTextInput
      textInput={StyleSheet.flatten(styles.textInput)}
      inputView={styles.textInputView}
      placeholderTextColor="gray"
      placeholder={'username or email'}
      inputKey="email"
      getTextInputReference={(key, reference) =>
        this.getTextInputReference(key, reference)}
      keyboardType="email-address"
      value={this.state.email}
      returnKeyType="next"
      onChangeText={email => this.onChangeEmailText(email)}
      onSubmitEditing={key => this.onSubmitEditing(key)}
      autoCapitalize="none"
    />
  </View>
);

CustomText.propTypes = {
  textStyle: PropTypes.object,
  title: PropTypes.string,
};

CustomText.defaultProps = {
  textStyle: {},
  title: '',
};


export default CustomText;

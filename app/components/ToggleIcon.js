import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../assets/images';
import { responsiveFontSize } from '../utils/utils_functions';
import { isPortrait } from '../utils/utils';

const styles = StyleSheet.create({
  showPasswordButton: {
    width: responsiveFontSize(35),
    height: responsiveFontSize(36),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  portraitMargin: {
    right: 5,
  },
  landscapeMargin: {
    right: 30,
  },
});

const ToggleIcon = (props) => {
  const imageSource = props.isShowPassword ? images.showPassowrd : images.hidePassowrd;
  const { screenOrientation } = props;
  const isPortraitView = isPortrait(screenOrientation);
  return (
    <TouchableOpacity
      style={[styles.showPasswordButton, isPortraitView ? styles.portraitMargin : styles.landscapeMargin]}
      onPress={() => props.showPassowrdText()}
    >
      <Image source={imageSource} />
    </TouchableOpacity>
  );
};

ToggleIcon.propTypes = {
  showPassowrdText: PropTypes.func,
  isShowPassword: PropTypes.bool,
};

ToggleIcon.defaultProps = {
  showPassowrdText: () => {},
  isShowPassword: Boolean(false),
};


export default ToggleIcon;

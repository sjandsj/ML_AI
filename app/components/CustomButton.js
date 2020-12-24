/* eslint-disable react/no-typos */
import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from './CustomText';

const CustomButton = ({
  buttonStyle,
  backgroundImage,
  onPress,
  textStyle,
  buttonTitle,
  imageStyle,
}) => (
  <TouchableOpacity
    style={buttonStyle}
    onPress={() => onPress()}
  >
    <ImageBackground
      source={backgroundImage}
      style={imageStyle}
    />
    <CustomText textStyle={textStyle} title={buttonTitle} />
  </TouchableOpacity>
);


CustomButton.propTypes = {
  buttonStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  imageIcon: PropTypes.string,
  backgroundImage: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  buttonTitle: PropTypes.string,
  imageStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
};

CustomButton.defaultProps = {
  buttonStyle: {},
  imageIcon: '',
  backgroundImage: {},
  onPress: () => {},
  textStyle: {},
  buttonTitle: '',
  imageStyle: {},
};


export default CustomButton;

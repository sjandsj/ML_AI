import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';


const CustomText = props => (
  <View>
    <Text
      adjustsFontSizeToFit={Boolean(true)}
      style={props.textStyle}
      textDecorationColor={'transparent'}
    >
      {props.title}
    </Text>
  </View>
);

CustomText.propTypes = {
  textStyle: PropTypes.oneOfType(PropTypes.number, PropTypes.object),
  title: PropTypes.string,
};

CustomText.defaultProps = {
  textStyle: {},
  title: '',
};


export default CustomText;

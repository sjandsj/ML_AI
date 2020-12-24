import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { UIColors, fontName, fontSizes } from '../utils/variables';
// import { images } from '../assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primaryText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: fontSizes.medium,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontFamily: fontName.sourceSansProSemiBold,
  },
});

const BackgroundMessage = props => (
  <View style={styles.container}>
    <Text style={styles.textStyle}>{props.title}</Text>
  </View>
);

BackgroundMessage.propTypes = {
  title: PropTypes.string,
};

BackgroundMessage.defaultProps = {
  title: '',
};

export default BackgroundMessage;

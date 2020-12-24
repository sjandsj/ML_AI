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
    backgroundColor: UIColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: fontSizes.medium,
    color: UIColors.focused,
    fontFamily: fontName.sourceSansProSemiBold,
  },
});

const BackgroundMessageNew = props => (
  <View style={props.styleView ? props.styleView : styles.container }>
    <Text style={props.titleStyle ? props.titleStyle : styles.textStyle}>{props.title}</Text>
  </View>
);

BackgroundMessageNew.propTypes = {
  title: PropTypes.string,
  styleView: PropTypes.object,
  titleStyle: PropTypes.object,
};

BackgroundMessageNew.defaultProps = {
  title: '',
  styleView: {},
  titleStyle: {},
};

export default BackgroundMessageNew;

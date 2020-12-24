import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { UIColors, fontSizes, fontWeights } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
});

const NavigationHeaderTitle = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.title}</Text>
  </View>
);

NavigationHeaderTitle.propTypes = {
  title: PropTypes.string,
};

NavigationHeaderTitle.defaultProps = {
  title: '',
};

export default NavigationHeaderTitle;

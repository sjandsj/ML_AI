import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { UIColors, spacing } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#00000060',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.large,
  },
  activityContainer: {
  },
});

const LoaderSize = 'large';

const PagingLoader = props => (
  <View style={styles.container}>
    <ActivityIndicator
      animating={props.isAnimating}
      style={styles.activityContainer}
      size={LoaderSize}
      color={props.color}
    />
  </View>
);

PagingLoader.propTypes = {
  isAnimating: PropTypes.bool,
  color: PropTypes.string,
};

PagingLoader.defaultProps = {
  isAnimating: false,
  // color: 'white',
  color: UIColors.newAppFontBlackColor,
};

export default PagingLoader;

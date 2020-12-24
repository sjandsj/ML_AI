import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#00000060',
    backgroundColor: UIColors.newAppLoaderWhiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  activityContainer: {
  },
});

const LoaderSize = 'large';

const Loader = props => (
  <View style={styles.container}>
    <ActivityIndicator
      animating={props.isAnimating}
      style={styles.activityContainer}
      size={LoaderSize}
      color={props.color}
    />
  </View>
);

Loader.propTypes = {
  isAnimating: PropTypes.bool,
  color: PropTypes.string,
};

Loader.defaultProps = {
  isAnimating: false,
  // color: 'white',
  color: UIColors.newAppFontBlackColor,
};

export default Loader;

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {
  itemSizes, UIColors, spacing,
} from '../utils/variables';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: UIColors.loderBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: spacing.large,
    position: 'absolute',
  },
  loaderbackgroundView: {
    padding: spacing.semiMedium,
    backgroundColor: '#EEEEEE',
    borderRadius: spacing.extraLarge,
  },
  loaderContainer: {
    width: itemSizes.defaultHeight,
    height: itemSizes.defaultWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  redView: {
    width: spacing.medium,
    height: spacing.medium,
    borderRadius: 12.5,
    backgroundColor: UIColors.navigationBar,
  },
  blueView: {
    width: spacing.medium,
    height: spacing.medium,
    borderRadius: 12.5,
    backgroundColor: UIColors.blueColor,
  },
});

const rotateAnimation = new Animated.Value(0);

const startAnimation = () => {
  Animated.timing(
    rotateAnimation,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    },
  ).start(() => {
    rotateAnimation.setValue(0);
    startAnimation();
  });
};

const Loader = () => {
  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
      <View style={styles.loaderbackgroundView}>
        <Animated.View style={[styles.loaderContainer, { transform: [{ rotate: spin }] }]}>
          <View style={styles.redView} />
          <View style={styles.blueView} />
        </Animated.View>
      </View>
    </View>
  );
};
startAnimation();

Loader.propTypes = {
};

Loader.defaultProps = {
};

export default Loader;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000060',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: spacing.large,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    borderRadius: spacing.medium,
    backgroundColor: '#FFFD56',
  },
  blueView: {
    width: spacing.medium,
    height: spacing.medium,
    borderRadius: spacing.medium,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
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

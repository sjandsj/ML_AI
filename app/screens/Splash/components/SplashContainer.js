import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../../../utils/variables';
import Logo from './Logo';
import Header from './Header';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  splashIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
});

const SplashContainer = props => (
  <View style={styles.backgroundImage}>
    <ImageBackground
      source={images.splash}
      style={styles.imageBg}
    >
      <View style={styles.splashIconView}>
        <Animated.View>
          { !props.showSecondIcon
          ? <Logo />
          : <Logo {...props} />
          }
        </Animated.View>
      </View>
    </ImageBackground>
  </View>
);

SplashContainer.propTypes = {
  showSecondIcon: PropTypes.bool,
};

SplashContainer.defaultProps = {
  showSecondIcon: false,
};

export default SplashContainer;

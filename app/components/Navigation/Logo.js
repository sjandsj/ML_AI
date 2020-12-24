/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { responsiveSize } from '../../utils/utils';
import { images } from '../../assets/images';
import { spacing } from '../../utils/variables';

const logoHeight = responsiveSize(50);
const logoWidth = responsiveSize(120);

const styles = StyleSheet.create({
  imageStyle: {
    // marginLeft: spacing.extraSmall,
    height: logoHeight,
    width: logoWidth,
  },
});

const Logo = () => (
  <View>
    <Image
      // source={images.appLogo}
      source={images.applicationLogo}
      style={styles.imageStyle}
      resizeMode="contain"
    />
  </View>
);

export default Logo;

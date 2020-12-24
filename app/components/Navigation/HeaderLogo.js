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

const headerImageWidth = responsiveSize(300);

const styles = StyleSheet.create({
  imageStyle: {
    height: spacing.large,
    width: headerImageWidth,
  },
});

const HeaderLogo = () => (
  <View>
    <Image
      source={images.applicationLogo}
      style={styles.imageStyle}
      resizeMode="contain"
    />
  </View>
);

export default HeaderLogo;

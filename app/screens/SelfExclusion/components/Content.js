import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import { selfExclusionLocalizeString } from '../../../localization/selfExclusionLocalizeString';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.secondary,
  },
  textStyle: {
    margin: spacing.large,
    color: UIColors.primaryText,
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
  },
});

const Content = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.textStyle}>
      {selfExclusionLocalizeString.selfExcludeIntro}
    </Text>
  </SafeAreaView>
);

export default Content;

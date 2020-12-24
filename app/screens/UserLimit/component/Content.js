import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { realityCheckLocalizeString } from '../../../localization/realityCheckLocalizeString';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';


const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.secondary,
  },
  textStyle: {
    color: UIColors.primaryText,
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProSemiBold,
    paddingTop: spacing.large,
    paddingHorizontal: spacing.large,
  },
});

const Content = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.textStyle}>
      {realityCheckLocalizeString.realityCheckPara1}
    </Text>
  </SafeAreaView>
);

Content.propTypes = {
  isPortraitView: PropTypes.bool,
};

Content.defaultProps = {
  isPortraitView: true,
};

export default Content;

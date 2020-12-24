import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { spacing, UIColors, fontName, fontSizes } from '../../../utils/variables';
import { userLimitConstants } from '../../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: UIColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTextStyle: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.defaultWhite,
    fontSize: fontSizes.medium,
    justifyContent: 'center',
  },
  headerBodyTextStyle: {
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.defaultTextColor,
    fontSize: fontSizes.small,
    paddingTop: spacing.extraSmall,
  },
  headerView: {
    backgroundColor: UIColors.secondary,
    flex: 1,
    alignItems: 'center',
  },
});

const LimitDetail = () => (
  <View style={styles.container}>
    <View style={styles.headerView}>
      <Text style={styles.headerTitleTextStyle}>{userLimitConstants.TITLE}</Text>
    </View>
  </View>
);

LimitDetail.propTypes = {
  screenOrientation: PropTypes.string,
};

LimitDetail.defaultProps = {
  screenOrientation: '',
};

export default LimitDetail;

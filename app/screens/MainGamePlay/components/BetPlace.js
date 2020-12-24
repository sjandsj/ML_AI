import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import { mainGAmePlayLocalizeString } from '../../../localization/mainGamePlayLocalizeString';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.defaultWhite,
  },
  upperHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.large,
    paddingTop: spacing.large,
    paddingBottom: spacing.semiMedium,
    alignItems: 'center',
  },
  marketTitle: {
    fontSize: fontSizes.large,
    color: UIColors.defaultBlack,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  outcomeTitle: {
    fontSize: fontSizes.small,
    color: UIColors.defaultBlack,
    fontFamily: fontName.sourceSansProRegular,
  },
  oddsTitle: {
    marginRight: spacing.large,
    padding: spacing.semiMedium,
    backgroundColor: UIColors.newAppGrayContentColor,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: itemSizes.defaultWidth,
    width: itemSizes.defaultWidth,
    right: 0,
    top: spacing.semiMedium,
  },
  closeTitle: {
    fontSize: fontSizes.large,
    color: UIColors.primary,
  },
  lowerPart: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  match: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: fontSizes.large,
  },
  stakeView: {
    flexDirection: 'row',
    paddingTop: spacing.large,
    paddingBottom: spacing.semiMedium,
  },
  stakeButton: {
    marginHorizontal: spacing.large,
    flex: 1,
    alignItems: 'center',
    backgroundColor: UIColors.newAppGrayContentColor,
    padding: spacing.semiMedium,
  },
  stakeAmount: {
    backgroundColor: UIColors.newAppGrayContentColor,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
  },
  winAmount: {
    marginHorizontal: spacing.large,
    flex: 1,
    textAlign: 'center',
    backgroundColor: UIColors.newAppGrayContentColor,
    padding: spacing.semiMedium,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
  },
});

const BetPlace = props => (
  <View style={styles.container}>
    <View style={styles.upperHead}>
      <View>
        <Text style={styles.marketTitle}>
          {props.slip.marketName}
        </Text>
        <Text style={styles.outcomeTitle}>
          {props.slip.name}
        </Text>
      </View>
      <Text style={styles.oddsTitle}>
        {props.slip.odds}
      </Text>
      {/* <TouchableOpacity style={styles.closeButton} onPress={() => props.onPressRemove(props.slip)}>
        <Text style={styles.closeTitle}>X</Text>
      </TouchableOpacity> */}
    </View>
    <View style={styles.lowerPart}>
      <Text style={styles.match}>{mainGAmePlayLocalizeString.ostVsBro}</Text>
      <View style={styles.stakeView}>
        <TouchableOpacity
          style={styles.stakeButton}
          onPress={() => props.onPressStakeButton(props.slip)}
        >
          <Text style={styles.stakeAmount}>
            {mainGAmePlayLocalizeString.hundred}
          </Text>
        </TouchableOpacity>
        <Text style={styles.winAmount}>
          {100 * props.slip.odds}
        </Text>
      </View>
    </View>
  </View>
);

BetPlace.propTypes = {
  slip: PropTypes.object,
  onPressRemove: PropTypes.func,
  onPressStakeButton: PropTypes.func,
};

BetPlace.defaultProps = {
  slip: { },
  onPressRemove: () => {},
  onPressStakeButton: () => {},
};

export default BetPlace;

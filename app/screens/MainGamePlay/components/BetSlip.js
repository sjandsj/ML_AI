import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.defaultWhite,
  },
  subContainer: {
    flex: 1,
  },
  upperHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.large,
    paddingTop: spacing.large,
    paddingBottom: spacing.semiMedium,
    alignItems: 'flex-start',
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
    flex: 1,
    textAlign: 'center',
    backgroundColor: UIColors.newAppGrayContentColor,
    padding: spacing.semiMedium,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
  },
  placeholderText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
  stakeContainer: {
    flex: 1,
    marginLeft: spacing.large,
    marginRight: spacing.small,
  },
  toWinContainer: {
    flex: 1,
    marginRight: spacing.large,
    marginLeft: spacing.small,
  },
});

const BetSlip = props => (
  <View style={styles.container}>
    <View style={styles.upperHead}>
      <View style={styles.subContainer}>
        <Text style={styles.marketTitle}>
          {props.slip.marketName}
        </Text>
        <Text style={styles.outcomeTitle}>
          {props.showOddsSpecifierName(props.slip.marketUID, props.slip)}
        </Text>
      </View>
      <Text style={[styles.oddsTitle, props.slip.isOddsChanged && { backgroundColor: UIColors.newAppButtonGreenBackgroundColor }]}>
        {props.slip.odds}
      </Text>
      <TouchableOpacity style={styles.closeButton} onPress={() => props.onPressRemove(props.slip)}>
        <Text style={styles.closeTitle}>X</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.lowerPart}>
      <Text style={styles.match}>{props.slip.matchName}</Text>
      {props.totalSlips === 1 &&
        <View style={styles.stakeView}>
          <View style={styles.stakeContainer}>
            <Text style={styles.placeholderText}>{commonLocalizeStrings.enterStake}</Text>
            <TouchableOpacity
              style={styles.stakeButton}
              onPress={() => props.onPressStakeButton(props.slip.id)}
            >
              <Text style={styles.stakeAmount}>
                {props.slip.stake}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toWinContainer}>
            <Text style={styles.placeholderText}>{commonLocalizeStrings.toWin}</Text>
            <Text style={styles.winAmount}>
              {props.slip.toWin}
            </Text>
          </View>
        </View>}
    </View>
  </View>
);

BetSlip.propTypes = {
  slip: PropTypes.object,
  onPressRemove: PropTypes.func,
  onPressStakeButton: PropTypes.func,
  showOddsSpecifierName: PropTypes.func,
  totalSlips: PropTypes.number,
};

BetSlip.defaultProps = {
  slip: { },
  onPressRemove: () => {},
  onPressStakeButton: () => {},
  showOddsSpecifierName: () => {},
  totalSlips: 0,
};

export default BetSlip;

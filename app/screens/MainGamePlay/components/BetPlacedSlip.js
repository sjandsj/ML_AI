import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { toFixTwoDigitAfterDecimalWithoutRounding } from '../../../utils/utils_functions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.defaultWhite,
    marginHorizontal: spacing.large,
    marginBottom: spacing.semiMedium,
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
    fontSize: fontSizes.medium,
    color: UIColors.placeholderText,
    fontFamily: fontName.sourceSansProRegular,
  },
  outcomeTitle: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.placeholderText,
    fontFamily: fontName.sourceSansProRegular,
  },
  oddsTitle: {
    padding: spacing.semiMedium,
    backgroundColor: '#EDDA74',
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.defaultWhite,
    textAlign: 'center',
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
    color: UIColors.defaultBlack,
    paddingLeft: spacing.large,
    fontSize: fontSizes.medium,
    alignSelf: 'flex-start',
  },
  comboTitle: {
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.defaultBlack,
    paddingLeft: spacing.large,
    fontSize: fontSizes.small,
    alignSelf: 'flex-start',
  },
  stakeView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spacing.large,
    paddingBottom: spacing.semiMedium,
    justifyContent: 'center',
  },
  stakeButton: {
    flex: 1,
    alignItems: 'center',
  },
  stakeAmount: {
    flex: 1,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.placeholderText,
  },
  winAmount: {
    flex: 1,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.placeholderText,
  },
  statusText: {
    flex: 1,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    color: UIColors.newAppButtonGreenBackgroundColor,
  },
  placeholderText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
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
  betSlipType: {
    flex: 1,
  },
});

const BetPlacedSlip = props => (
  <View style={styles.container}>
    <View style={styles.upperHead}>
      <View style={styles.betSlipType}>
        <Text style={styles.marketTitle}>
          {props.slip.market_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.outcomeTitle}>
            {props.slip.outcome_name}
          </Text>
          {/* <Text style={styles.outcomeTitle}>
            {` | odds: ${props.slip.odds}`}
          </Text> */}
        </View>
      </View>
      <Text style={[styles.oddsTitle,
        props.slip.status === 'won' && { backgroundColor: UIColors.newAppButtonGreenBackgroundColor },
        props.slip.status === 'lost' && { backgroundColor: UIColors.appRedColor }]}
      >
        {props.slip.status === 'won' && 'WON'}
        {props.slip.status === 'lost' && 'LOST'}
        {props.slip.status === 'pending' && 'PENDING'}
      </Text>
    </View>
    <View style={styles.lowerPart}>
      <Text style={styles.match}>{props.slip.match_title}</Text>
      <Text style={styles.comboTitle}>{props.slip.combo_bet_id ? `Combo Bet # ${props.slip.combo_bet_id}` : '' }</Text>
      <View style={styles.stakeView}>
        <View style={styles.stakeContainer}>
          <Text style={styles.placeholderText}>{commonLocalizeStrings.stake}</Text>
          <Text style={styles.stakeAmount}>
            {props.slip.combo_bet_id ? props.slip.combo_bet_stake : props.slip.stake}
          </Text>
        </View>
        {props.slip.status === 'lost' &&
        <View style={styles.toWinContainer}>
          <Text style={styles.placeholderText}>{commonLocalizeStrings.lostAmount}</Text>
          <Text style={styles.winAmount}>
            {props.slip.combo_bet_id ?
              props.slip.combo_bet_stake
            : props.slip.stake}
          </Text>
        </View>}
        {props.slip.status === 'won' &&
        <View style={styles.toWinContainer}>
          <Text style={styles.placeholderText}>{commonLocalizeStrings.winAmount}</Text>
          <Text style={styles.winAmount}>
            {props.slip.combo_bet_id ?
              toFixTwoDigitAfterDecimalWithoutRounding(props.slip.combo_bet_odd * props.slip.combo_bet_stake)
            : toFixTwoDigitAfterDecimalWithoutRounding(props.slip.odds * props.slip.stake)}
          </Text>
        </View>}
        {props.slip.status === 'pending' &&
        <View style={styles.toWinContainer}>
          <Text style={styles.placeholderText}>{commonLocalizeStrings.toWin}</Text>
          <Text style={styles.winAmount}>
            {props.slip.combo_bet_id ?
              toFixTwoDigitAfterDecimalWithoutRounding(props.slip.combo_bet_odd * props.slip.combo_bet_stake)
            : toFixTwoDigitAfterDecimalWithoutRounding(props.slip.odds * props.slip.stake)}
          </Text>
        </View>}
        <View style={[styles.toWinContainer]}>
          <Text style={styles.placeholderText}>{commonLocalizeStrings.odds}</Text>
          <Text style={styles.winAmount}>
            {props.slip.combo_bet_id ? props.slip.combo_bet_odd : props.slip.odds}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

BetPlacedSlip.propTypes = {
  slip: PropTypes.object,
  onPressRemove: PropTypes.func,
  onPressStakeButton: PropTypes.func,
};

BetPlacedSlip.defaultProps = {
  slip: { },
  onPressRemove: () => {},
  onPressStakeButton: () => {},
};

export default BetPlacedSlip;

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, fontName, itemSizes } from '../../../utils/variables';
import { toFixTwoDigitAfterDecimal } from '../../../utils/utils_functions';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';


const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.defaultWhite,
    marginVertical: 2,
    borderRadius: 5,
  },
  upperHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.semiMedium,
    paddingTop: spacing.semiMedium,
    paddingBottom: spacing.small,
    alignItems: 'flex-start',
  },
  subUpperHead: {
    flex: 1,
  },
  dateTitle: {
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultBlack,
    fontFamily: fontName.sourceSansProRegular,
  },
  lowerPart: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  match: {
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: fontSizes.medium,
  },
  stakeView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spacing.semiMedium,
    justifyContent: 'space-around',
  },
  stakeAmount: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultBlack,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
  stakeContainer: {
    flex: 1,
  },
  toWinContainer: {
    flex: 1,
  },
  dateAndOddsView: {
    flexDirection: 'row',
  },
  cashoutButton: {
    backgroundColor: UIColors.newAppHeaderColorGreen,
    padding: 5,
    marginVertical: spacing.medium,
    // marginBottom: spacing.small,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
  },
  cashoutTitle: {
    color: UIColors.focused,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
  disableCashoutText: {
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
    backgroundColor: UIColors.primary,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
    padding: 5,
    marginVertical: spacing.medium,
    // marginBottom: spacing.small,
  },
});

const PendingBetView = (props) => {
  const { isPortrait } = props;
  const { item } = props.item;
  const odds = Number(item.odds);
  return (
    <View style={styles.container}>
      <View style={styles.upperHead}>
        <View style={styles.subUpperHead}>
          <Text style={[styles.match, { textAlign: isPortrait ? 'left' : 'center' }]}>{item.match_title}</Text>
          <View style={styles.dateAndOddsView}>
            <Text style={styles.dateTitle}>{`Date: ${item.date}`}</Text>
            <Text style={styles.dateTitle}>{` | Odds: ${odds}`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lowerPart}>
        <View style={styles.stakeView}>
          <View style={styles.stakeContainer}>
            <Text style={styles.placeholderText}>{commonLocalizeStrings.outcome}</Text>
            <Text style={styles.stakeAmount}>{item.outcome_name}</Text>
          </View>
          <View style={styles.stakeContainer}>
            <Text style={styles.placeholderText}>{commonLocalizeStrings.amount}</Text>
            <Text style={styles.stakeAmount}>
              {item.stake}
            </Text>
          </View>
          <View style={styles.toWinContainer}>
            <Text style={styles.placeholderText}>{commonLocalizeStrings.cashoutableAmt}</Text>
            <Text style={styles.stakeAmount}>
              {toFixTwoDigitAfterDecimal(item.cashed_out_amount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

PendingBetView.propTypes = {
  item: PropTypes.object,
  isPortrait: PropTypes.bool,
};

PendingBetView.defaultProps = {
  item: { },
  isPortrait: true,
};

export default PendingBetView;

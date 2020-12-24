import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';


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
    fontSize: fontSizes.small,
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
    paddingTop: spacing.extraSmall,
  },
});

const PendingComboBetView = (props) => {
  const { isPortrait } = props;
  const item = props.item;
  const odds = Number(item.odds);
  return (
    <View style={styles.container}>
      <View style={styles.upperHead}>
        <View style={styles.subUpperHead}>
          <Text style={[styles.match, { textAlign: isPortrait ? 'left' : 'center' }]}>{item.match_title}</Text>
          <View style={styles.dateAndOddsView}>
            <Text style={styles.dateTitle}>{`Date: ${item.date}`}</Text>
            <Text style={styles.dateTitle}>{` | Odds: ${odds}`}</Text>
            <Text style={styles.dateTitle}>{` | Outcome: ${item.outcome_name}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

PendingComboBetView.propTypes = {
  item: PropTypes.object,
  isPortrait: PropTypes.bool,
};

PendingComboBetView.defaultProps = {
  item: { },
  isPortrait: true,
};

export default PendingComboBetView;

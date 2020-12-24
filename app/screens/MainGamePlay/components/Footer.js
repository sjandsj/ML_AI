import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, spacing, fontName, fontSizes } from '../../../utils/variables';
import BetButton from './BetButton';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { toFixTwoDigitAfterDecimalWithoutRounding } from '../../../utils/utils_functions';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  container: {
    height: itemSizes.defaultHeight,
  },
  betTabs: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: UIColors.newAppGrayContentColor,
  },
  fullBetSlipView: {
    flex: 1,
    backgroundColor: UIColors.lightGrayBackgroundColor,
    flexDirection: 'row',
    paddingLeft: spacing.small,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betCountTextStyle: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    color: UIColors.primaryText,
    textAlign: 'center',
  },
  betCountView: {
    borderRadius: 15, height: 30, width: 30, backgroundColor: UIColors.newAppButtonGreenBackgroundColor, alignItems: 'center', justifyContent: 'center',
  },
  title: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
    color: UIColors.secondaryText,
    paddingLeft: spacing.extraExtraSmall,
  },
  foldText: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraExtraSmall,
    color: UIColors.placeholderText,
    paddingRight: spacing.small,
  },
});

const Footer = props => (
  <View style={styles.container}>
    {(props.showBottomFullBetSlipView && props.slipCount >= 1)
    ?
      <TouchableOpacity style={styles.fullBetSlipView} onPress={props.onBetSlipPressed}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.betCountView}>
            <Text style={styles.betCountTextStyle}>{props.slipCount}</Text>
          </View>
          <Text style={styles.title}>Bet Slip</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.foldText}> {props.foldsInBetSlip} Folds</Text>
          <Text style={[styles.title, { color: UIColors.newAppButtonGreenBackgroundColor }]}>{ toFixTwoDigitAfterDecimalWithoutRounding(props.netOddsForComboBet)}</Text>
          <TouchableOpacity style={{ paddingHorizontal: spacing.small }} onPress={() => props.closeBottomBetSlipView()}>
            <Image source={images.closeButton} style={{ tintColor: UIColors.defaultBlack }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    :
      <View style={styles.betTabs}>
        <BetButton
          style={{
            title: {
              color: props.slipCount === 0 ? UIColors.newAppYellowDisabledColor : UIColors.focused,
            },
            view: {
              backgroundColor: props.slipCount === 0
                ? UIColors.newAppButtonGreenBackgroundColorDisabled
                : UIColors.newAppButtonGreenBackgroundColor,
            },
          }}
          disabled={props.slipCount === 0}
          title={props.slipCount > 0 ? `Bet Slips (${props.slipCount})` : 'Bet Slips'}
          onPress={props.onBetSlipPressed}
        />
        <BetButton
          style={{
            title: {
              color: UIColors.defaultWhite,
            },
            view: {
              backgroundColor: UIColors.primary,
            },
          }}
          title={commonLocalizeStrings.myBets}
          onPress={props.onBetPlacedPressed}
        />
      </View>
    }
  </View>
);

Footer.propTypes = {
  onBetSlipPressed: PropTypes.func,
  onBetPlacedPressed: PropTypes.func,
  slipCount: PropTypes.number,
};

Footer.defaultProps = {
  onBetSlipPressed: () => {},
  onBetPlacedPressed: () => {},
  slipCount: 0,
};

export default Footer;

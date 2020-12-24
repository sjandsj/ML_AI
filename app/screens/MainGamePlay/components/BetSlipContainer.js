import React from 'react';
import { View, FlatList, StyleSheet, TouchableHighlight, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, spacing, fontSizes, itemSizes, fontName } from '../../../utils/variables';
import BetSlip from './BetSlip';
import { images } from '../../../assets/images';
import Loader from '../../../components/Loader';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { mainGAmePlayLocalizeString } from '../../../localization/mainGamePlayLocalizeString';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { toFixTwoDigitAfterDecimalWithoutRounding } from '../../../utils/utils_functions';
import { responsiveSize } from '../../../utils/utils';

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '80%',
    bottom: 0,
    zIndex: 999,
  },
  containerLandscape: {
    flex: 1,
    position: 'absolute',
    width: '80%',
    height: '100%',
    right: 0,
    zIndex: 999,
  },
  subContainerPortrait: {
    flex: 1,
    marginTop: 30,
    paddingVertical: spacing.large,
    backgroundColor: UIColors.newAppBetSlipContainerColor,
  },
  subContainerLandscape: {
    flex: 1,
    marginLeft: 30,
    paddingHorizontal: spacing.large,
    backgroundColor: UIColors.newAppBetSlipContainerColor,
  },
  innerView: {
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.semiMedium,
  },
  submitButton: {
    backgroundColor: UIColors.newAppHeaderColorGreen,
    padding: 5,
    marginTop: spacing.medium,
    width: itemSizes.largeWidth,
    alignSelf: 'center',
  },
  submitTitle: {
    color: UIColors.focused,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
  downArrowButtonPortrait: {
    position: 'absolute',
    alignSelf: 'center',
    height: 50,
    width: 80,
    top: 10,
    zIndex: 9999,
    borderRadius: 30,
    backgroundColor: UIColors.newAppBetSlipContainerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrowButtonLandscape: {
    position: 'absolute',
    height: 80,
    width: 50,
    top: '40%',
    left: 10,
    zIndex: 9999,
    borderRadius: 30,
    backgroundColor: UIColors.newAppBetSlipContainerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.medium,
    color: UIColors.focused,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
  },
  comboBetDetailContainer: {
    backgroundColor: UIColors.lightGrayBackgroundColor,
    paddingLeft: spacing.extraSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakeButton: {
    width: responsiveSize(80),
    height: responsiveSize(30),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.defaultWhite,
    marginLeft: spacing.extraExtraSmall,
  },
  textComboBet: {
    color: UIColors.secondaryText,
    paddingTop: spacing.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraSmall,
  },
  returnText: {
    color: UIColors.placeholderText,
    paddingVertical: spacing.small,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.extraExtraSmall,
    textAlign: 'center',
  },
});
// onClose

const BetSlipContainer = props => (
  <View style={props.isPortrait ? styles.containerPortrait : styles.containerLandscape}>
    <TouchableHighlight
      style={props.isPortrait ? styles.downArrowButtonPortrait : styles.downArrowButtonLandscape}
      onPress={props.onClose}
    >
      <Image source={props.isPortrait ? images.downArrow : images.rightArrow} />
    </TouchableHighlight>
    <View
      style={props.isPortrait ? styles.subContainerPortrait : styles.subContainerLandscape}
    >
      <Text style={styles.titleStyle}>{commonLocalizeStrings.betSlips}</Text>
      {props.slips.length !== 0 ? <FlatList
        keyExtractor={(_item, index) => `${index}betslips`}
        data={props.slips}
        renderItem={item => (
          <View style={styles.innerView}>
            <BetSlip
              totalSlips={props.slips.length}
              slip={item.item}
              showOddsSpecifierName={props.showOddsSpecifierName}
              onPressRemove={props.onPressRemove}
              onPressStakeButton={(id) => {
                props.onPressStakeButton(id);
              }}
              hideEnterStakeContainer={() => props.hideEnterStakeContainer()}
            />
          </View>
        )}
      /> :
      <BackgrounMessage title={commonLocalizeStrings.noDatatoDisplay} />
      }
      {props.slips.length !== 1 &&
        <View style={styles.comboBetDetailContainer}>
          <Text style={[styles.textComboBet]}>{props.foldsInBetSlip} Folds </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textComboBet}>{toFixTwoDigitAfterDecimalWithoutRounding(props.netOddsForComboBet)}</Text>
            <View >
              <TouchableOpacity
                style={styles.stakeButton}
                onPress={() => props.onPressStakeButton()}
              >
                <Text style={{ color: UIColors.placeholderText, textAlign: 'center' }}>
                  {props.comboBetStake ? props.comboBetStake : 'stake'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.returnText}>To Return {toFixTwoDigitAfterDecimalWithoutRounding(props.comboBetStake * props.netOddsForComboBet) + ' '}</Text>
            </View>
          </View>
        </View>
      }
      <TouchableOpacity
        style={styles.submitButton}
        onPress={props.onSubmit}
      >
        <Text style={styles.submitTitle}>
          {mainGAmePlayLocalizeString.submit}
        </Text>
      </TouchableOpacity>
    </View>
    {props.isLoading && <Loader isAnimating={props.isLoading} />}
  </View>
);

BetSlipContainer.propTypes = {
  slips: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressRemove: PropTypes.func,
  isPortrait: PropTypes.bool.isRequired,
  onPressStakeButton: PropTypes.func,
  hideEnterStakeContainer: PropTypes.func,
  isLoading: PropTypes.bool,
  showOddsSpecifierName: PropTypes.func,
  comboBetStake: PropTypes.number,
  foldsInBetSlip: PropTypes.number,
  netOddsForComboBet: PropTypes.number,
};

BetSlipContainer.defaultProps = {
  slips: [],
  onClose: () => { },
  onSubmit: () => { },
  onPressRemove: () => { },
  onPressStakeButton: () => { },
  hideEnterStakeContainer: () => { },
  isLoading: false,
  showOddsSpecifierName: () => {},
  comboBetStake: 0,
  foldsInBetSlip: 0,
  netOddsForComboBet: 0,
};

export default BetSlipContainer;

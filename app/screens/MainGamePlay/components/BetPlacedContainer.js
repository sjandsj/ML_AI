import React from 'react';
import { View, FlatList, StyleSheet, TouchableHighlight, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, spacing, fontSizes, itemSizes, fontName } from '../../../utils/variables';
import BetPlacedSlip from './BetPlacedSlip';
import { images } from '../../../assets/images';
import Loader from '../../../components/Loader';
import BackgrounMessage from '../../../components/BackgroundMessage';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

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
    // paddingHorizontal: spacing.large,
    // paddingBottom: spacing.semiMedium,
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
  noBetsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBetsText: {
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.medium,
  },
});
// onClose

const BetPlacedContainer = props => (
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
      <Text style={styles.titleStyle}>My Bets:</Text>
      {props.slips.length > 0 ? <FlatList
        keyExtractor={(_item, index) => `${index}betslips`}
        data={props.slips}
        onEndReached={() => props.handleLoadMoreMyBets()}
        onEndThreshold={0.1}
        renderItem={item => (
          <View style={styles.innerView}>
            {item.item.status !== 'cashed_out' &&
            <BetPlacedSlip
              slip={item.item}
              hideEnterStakeContainer={() => props.hideEnterStakeContainer()}
            />}
          </View>
        )}
      /> : <BackgrounMessage title={commonLocalizeStrings.noBetPlacedYet} />}
    </View>
    {props.isLoading && <Loader isAnimating={props.isLoading} />}
  </View>
);

BetPlacedContainer.propTypes = {
  slips: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressRemove: PropTypes.func,
  isPortrait: PropTypes.bool.isRequired,
  onPressStakeButton: PropTypes.func,
  hideEnterStakeContainer: PropTypes.func,
  isLoading: PropTypes.bool,
  handleLoadMoreMyBets: PropTypes.func,
};

BetPlacedContainer.defaultProps = {
  slips: [],
  onClose: () => { },
  onSubmit: () => { },
  onPressRemove: () => { },
  onPressStakeButton: () => { },
  hideEnterStakeContainer: () => { },
  isLoading: false,
  handleLoadMoreMyBets: () => {},
};

export default BetPlacedContainer;

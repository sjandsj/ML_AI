/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { navigationHeight } from '../../utils/utils';
import { images } from '../../assets/images';
import Logo from './Logo';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import HeaderLogo from './HeaderLogo';
import Menu from './Menu';
import OfflineBanner from '../OfflineBanner';
import { UIColors, fontName, itemSizes, spacing, fontSizes } from '../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppHeaderColorGreen,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: navigationHeight,
  },
  rightView: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: spacing.semiMedium,
  },
  backButtonIconStyle: {
    width: itemSizes.iconExtraLarge,
    height: itemSizes.iconExtraLarge,
    marginTop: spacing.semiMedium,
  },
  backCustonButton: {
    width: itemSizes.defaultButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  displayText: {
    flex: 1,
    textAlign: 'center',
    color: UIColors.focused,
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
  },
});

const NavigationBar = ({
  title,
  showBackButton,
  backButtonAction,
  showMenuButton,
  rightButtonImage,
  rightButtonAction,
  screenOrientation,
  rightButtonTitle,
}) => (
  <View style={styles.container}>
    <HeaderLogo />
  </View>
);

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftView: PropTypes.element,
  rightView: PropTypes.element,
  showBackButton: PropTypes.bool,
  showRightButton: PropTypes.bool,
  backButtonImage: PropTypes.any,
  backButtonAction: PropTypes.func,
  rightButtonImage: PropTypes.any,
  rightButtonAction: PropTypes.func,
  hideRightView: PropTypes.bool,
  navigationBackgroundColor: PropTypes.string,
  rightButtonTitle: PropTypes.string,
  screenOrientation: PropTypes.string,
  showMenuButton: PropTypes.string,
};

NavigationBar.defaultProps = {
  title: '',
  leftView: null,
  rightView: null,
  showBackButton: false,
  showRightButton: false,
  backButtonImage: null,
  backButtonAction: () => { },
  rightButtonImage: null,
  rightButtonAction: () => { },
  hideRightView: false,
  navigationBackgroundColor: UIColors.newAppBackgroundColorWhite,
  rightButtonTitle: '',
  screenOrientation: '',
  showMenuButton: '',
};

export default NavigationBar;

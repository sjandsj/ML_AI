/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { images } from '../assets/images';
import { isIOS, isIphoneX } from '../utils/platformSpecific';
import colors from '../theme/colors';
import { FONT_16, responsiveFontSize } from '../utils/utils_functions';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: colors.appRedColor,
    fontSize: 20,
    textAlign: 'center',
  },
  leftView: {
    flex: 0.18,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,

  },
  navImage: {
    width: 25,
    height: 30,
  },
  rightView: {
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  rightInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 2,
  },
  walletAmountText: {
    color: UIColors.newAppFontWhiteColor,
    fontSize: 14,
    textAlign: 'center',
  },
  rightInfoIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

// eslint-disable-next-line no-return-assign
const NavBar = ({
  title,
  showBackButton,
  backButtonImage,
  backButtonAction,
  showMenuButton,
  rightButtonImage,
  rightButtonAction,
  hideRightView,
  screenOrientation,
  rightButtonTitle,
  backgroundColor,
}) => (
  <View style={[styles.container, screenOrientation === 'PORTRAIT' ? style = { height: isIOS ? (isIphoneX ? 84 : 64) : 64 } : style = { height: responsiveFontSize(64) }]}>
    {showBackButton ?
      <View style={[styles.leftView, { height: isIOS ? (isIphoneX ? 84 : 64) : 64 }]}>
        <TouchableOpacity
          onPress={() => backButtonAction()}>
          <Image source={images.leftArrow} style={{ width: responsiveFontSize(25), height: responsiveFontSize(25), tintColor: UIColors.defaultWhite }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
        : <View style={styles.appLogo}>
          {/* <Image source={images.appLogo} style={{ height: 50, width: 120, marginTop: 10 }} resizeMode="contain" /> */}
          <Image source={images.appLogoSplesh} style={{ height: 50, width: 120, marginTop: 10 }} resizeMode="contain" />
        </View>}
    {showBackButton ? <Text numberOfLines={2} style={{ color: UIColors.newAppFontWhiteColor, flex: 1, textAlign: 'center', fontSize: FONT_16, fontWeight: '600' }}>{title}</Text>
        : (screenOrientation === 'LANDSCAPE') && <Image 
        // source={images.headerLogo}
          style={{ height: 11, width: 260 }} />}
    <View style={styles.rightView}>
      {showMenuButton ?
        <TouchableOpacity
          onPress={() => rightButtonAction()}
          >
          {rightButtonTitle.length > 0 && <Text style={{ color: UIColors.newAppFontWhiteColor, fontSize: 16, fontWeight: '400' }}>{rightButtonTitle}</Text>}
          {rightButtonImage && <Image source={rightButtonImage} style={{ height: 30, width: 40 }} resizeMode="contain" />}
        </TouchableOpacity>
          : null}
    </View>
  </View>
  );

NavBar.propTypes = {
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
};

NavBar.defaultProps = {
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
  navigationBackgroundColor: UIColors.newAppFontWhiteColor,
  rightButtonTitle: '',
};
export default NavBar;

import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { images } from '../assets/images/index';
import { UIColors, fontWeights, fontSizes, itemSizes, spacing } from '../utils/variables';
import HeaderLogo from './Navigation/HeaderLogo';
import Menu from './Menu';
import CustomText from './CustomText';
import PropTypes from 'prop-types';
import Navigation from '../utils/navigation';
import { isIOS, isIphoneX } from '../utils/platformSpecific';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    padding: 10,
  },
  innerView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.small,
    textAlign: 'center',
    width: '80%',
  },
  leftView: {
    flex: 0.18,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
  },
});

const Header = props => (
  <View style={styles.container}>
    <SafeAreaView style={styles.innerView}>
      {props.showBackButton ?
        <View style={[styles.leftView, { height: isIOS ? (isIphoneX ? 84 : 64) : itemSizes.iconSmall }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => Navigation.sharedInstance().popScreen()}
          >
            <Image source={images.leftArrow} style={{ width: itemSizes.itemSizes25, height: itemSizes.itemSizes25, tintColor: UIColors.defaultWhite, alignSelf: 'flex-start' }} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        : <View style={{ flex: 0 }} />
        }
      {/* {props.title === '' ? <HeaderLogo /> : <CustomText textStyle={styles.textStyle} title={props.title} />} */}
      {props.title === '' ?
      <HeaderLogo /> 
      : 
      <Text style={styles.textStyle}>
        {props.title}
      </Text>
        }
      <Menu rightButtonAction={props.openMenu} homeButtonAction={props.homeButtonAction} />
    </SafeAreaView>
  </View>
);

Header.propTypes = {
  showBackButton: PropTypes.bool,
  title: PropTypes.string,
  openMenu: PropTypes.func,
  homeButtonAction: PropTypes.func,
};

Header.defaultProps = {
  showBackButton: false,
  title: '',
  openMenu: () => {},
  homeButtonAction: () => {},
};

export default Header;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../assets/images';
import Navigation from '../utils/navigation';
import {
  spacing, itemSizes, UIColors, fontSizes, fontWeights,
} from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.navigationBar,
    paddingHorizontal: spacing.semiMedium,
    paddingVertical: spacing.extraSmall,
    elevation: 5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backbutton: {
    width: itemSizes.defaultWidth,
    height: itemSizes.defaultHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: itemSizes.backIconWidth,
    height: itemSizes.backIconWidth,
  },
  title: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: fontSizes.small,
    color: UIColors.textTitle,
  },
  emptyBox: {
    height: itemSizes.defaultHeight,
    width: itemSizes.defaultWidth,
  },
  logo: {
    width: itemSizes.navLogoImageWidth,
    height: itemSizes.navLogoImageHeight,
  }
});

class NavigationHeader extends Component {
  onPressBack = () => { Navigation.sharedInstance().popScreen(); }

  onPressLogout() { /*TODO*/ }

  render() {
    const {
      showBackButton,
      title,
      logo,
      backgroundColor,
      showRightImageIcon,
      rightImageIcon,
      onPressRightIcon,
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <SafeAreaView style={styles.subContainer}>
          {
            showBackButton && (
              <TouchableOpacity style={styles.backbutton} onPress={this.onPressBack}>
                {/* <Image source={images.back} style={styles.backIcon} /> */}
              </TouchableOpacity>
            )
          }
          {title != null && <Text style={styles.title}>{title}</Text>}
          {logo != null && <Image source={logo} style={styles.logo} />}
          {
            showRightImageIcon
              && (
                <TouchableOpacity style={styles.backbutton} onPress={onPressRightIcon}>
                  <Image source={rightImageIcon} style={styles.backbutton} />
                </TouchableOpacity>
              )
          }
        </SafeAreaView>
      </View>
    );
  }
}

NavigationHeader.propTypes = {
  showBackButton: PropTypes.bool,
  showRightImageIcon: PropTypes.bool,
  isShowLogoutButton: PropTypes.bool,
  title: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  rightImageIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  backgroundColor: PropTypes.string,
  onPressRightIcon: PropTypes.func,
};

NavigationHeader.defaultProps = {
  showBackButton: false,
  showRightImageIcon: false,
  isShowLogoutButton: false,
  title: null,
  logo: null,
  rightImageIcon: null,
  backgroundColor: UIColors.navigationBar,
  onPressRightIcon: () => {},
};

export default NavigationHeader;

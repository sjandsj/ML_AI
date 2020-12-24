
import { createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
} from 'react-native';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions/index';
import AuthenticationNavigator from './AuthenticationNavigator';
import HomeNavigator from './HomeNavigator';
import SidemenuNavigator from './SidemenuNavigator';
import SportsBettingNavigator from './SportsBettingNavigator';
import BetSlipNavigator from './BetSlipNavigator';
import { UIColors, itemSizes, spacing, fontSizes } from '../../utils/variables';

import { images } from '../../assets/images';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    height: itemSizes.mediumWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 10,
    width: width / 3,
  },
  tabIcon: {
    width: itemSizes.defaultWidth,
    height: itemSizes.defaultWidth,
    resizeMode: 'contain',
    marginTop: spacing.extraSmall,
  },
  playTabIcon: {
    width: itemSizes.itemWidth,
    height: itemSizes.itemWidth,
    marginBottom: itemSizes.titleHeight,
    position: 'absolute',
    resizeMode: 'contain',
  },
  tabBarStyle: {
    width: width / 5,
    height: itemSizes.mediumWidth,
  },
});
// class BetSlip extends Component {

// const screenPropsNew = this.screenProps;

export default createBottomTabNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
      key: 'HomeNavigator',
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          !focused ?
            <Image style={styles.tabIcon} source={images.homeTababar} /> :
            <Image style={styles.tabIcon} source={images.homeGrey} />
        ),
      },
    },

    SidemenuNavigator: {
      screen: SidemenuNavigator,
      key: 'SidemenuNavigator',
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabBarStyle, { justifyContent: 'center', alignItems: 'center' }]}>
            {!focused ? <Image style={styles.tabIcon} source={images.tabbarProfileWhite} />
              :
            <Image style={styles.tabIcon} source={images.tababrProfileBlue} />
            }
            {screenProps.isLoggedin ?
              <Text
                style={{
                  // maxWidth: itemSizes.mediumWidth,
                  padding: spacing.borderDouble,
                  position: 'absolute',
                  top: spacing.border,
                  left: spacing.semiMedium,
                  borderRadius: spacing.semiMedium,
                  backgroundColor: UIColors.greenFontColor,
                  color: '#fff',
                  fontSize: fontSizes.tiny,
                }}
                numberOfLines={2}
              >{screenProps.balance}
              </Text>
              : null}
          </View>
        ),
      }),
    },

    AuthenticationNavigator: {
      screen: AuthenticationNavigator,
      key: 'AuthenticationNavigator',
      navigationOptions: ({ screenProps }) => ({
        header: null,
        tabBarLabel: '',
        tabBarIcon: (screenspppp) => {
          const tabbarIcon = screenProps.isLoggedin ?
            (!screenspppp.focused ? images.myBetTabbar : images.myBetGrey) :
            (!screenspppp.focused ? images.loginTababar : images.loginGray);
          // images.myBetTabbar : images.loginTababar;
          return (
            screenspppp.focused ?
              <Image style={styles.tabIcon} source={tabbarIcon} /> :
              <Image style={styles.tabIcon} source={tabbarIcon} />
          );
        },
      }),
    },

    SportsBettingNavigator: {
      screen: SportsBettingNavigator,
      key: 'SportsBettingNavigator',
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          !focused ?
            <Image style={styles.tabIcon} source={images.sportsbettingTab} /> :
            <Image style={styles.tabIcon} source={images.sportsBettingGray} />
        ),
      },
    },
    BetSlipNavigator: {
      screen: BetSlipNavigator,
      key: 'BetSlipNavigator',
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => (
          <View style={[styles.tabBarStyle, { justifyContent: 'center', alignItems: 'center' }]}>
            {!focused ? <Image style={styles.tabIcon} source={images.betslipTab} />
              :
              <Image style={styles.tabIcon} source={images.betslipGrey} />
            }
            {screenProps.betSlipCount != 0 ?
              <Text
                style={{
                  padding: spacing.borderDouble,
                  position: 'absolute',
                  top: spacing.border,
                  right: spacing.medium,
                  borderRadius: spacing.semiMedium,
                  backgroundColor: UIColors.greenFontColor,
                  color: '#fff',
                  maxWidth: 50,
                  fontSize: fontSizes.tiny,
                }

                }
                numberOfLines={2}

              >{screenProps.betSlipCount}
              </Text>
              :
              null}
            {screenProps.betSlipCount != 0 ?
              <Text
                style={{
                  maxWidth: itemSizes.mediumWidth,
                  padding: spacing.borderDouble,
                  position: 'absolute',
                  top: spacing.border,
                  left: spacing.semiMedium,
                  borderRadius: spacing.semiMedium,
                  backgroundColor: '#FFFD56',
                  color: 'black',
                  fontSize: fontSizes.tiny,
                }}
                numberOfLines={2}
              >{screenProps.betSlipCount === 0 ? 0.00 : (screenProps.betSlipOddCount > 10000 ? '10K+' : screenProps.betSlipOddCount)}
              </Text>
              : null}
          </View>
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      // activeTintColor: 'rgb(119, 191, 67)',
      // inactiveTintColor: 'rgb(44, 44, 44)',
      style: styles.tabStyle,
      allowFontScaling: true,
      showIcon: true,
      showLabel: false,
      upperCaseLabel: false,
      tabStyle: styles.tabBarStyle,
    },
    headerMode: 'none',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    scrollEnabled: true,
  },
);

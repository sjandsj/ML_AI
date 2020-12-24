/* eslint react/sort-comp: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
// import firebase from 'react-native-firebase';
import { images } from '../../assets/images';
import SideMenuHeader from './components/SideMenuHeader';
import { responsiveFontSize } from '../../utils/utils_functions';
import UserActions from '../../actions';
import { showLogoutAlert } from '../../utils/showAlert';
import Utils from '../../utils/utils';
import Loader from '../../components/Loader';
import { sideMenuLocalizeStrings } from '../../localization/sideMenuLocalizeStrings';
import { Storage } from '../../storage/storage';
import constants from '../../utils/constants';
import { UIColors, spacing, fontSizes, fontWeights, itemSizes } from '../../utils/variables';
import { UserData } from '../../utils/global';
import { currentAppVersion } from '../../config/appConfig';

const FlatListDataWithLogIn = [
  {
    name: 'Login/Register',
    icon: images.loginTababar,
  },
  {
    name: 'Contact',
    icon: images.contactIcon,
  },
  {
    name: 'About us',
    icon: images.aboutUsIcon,
  },
  {
    name: `Version: ${currentAppVersion} `,
    icon: images.versionIcon,
  },
];

const FlatListDataWithLogOut = [
  {
    name: 'Settings',
    icon: images.settingsSmall,
  },
  {
    name: 'My Bets',
    icon: images.myBetIcon,
  },
  {
    name: 'Fund Transfers',
    icon: images.fundTrasnfer,
  },
  {
    name: 'Contact',
    icon: images.contactIcon,
  },
  // {
  //   name: 'Info',
  //   icon: images.information,
  // },
  // {
  //   name: 'Search',
  //   icon: images.searchIcon,
  // },
  {
    name: 'About us',
    icon: images.aboutUsIcon,
  },
  {
    name: `Version: ${currentAppVersion} `,
    icon: images.versionIcon,
  },
  {
    name: 'Logout',
    icon: images.logout,
  },
];

// const FlatListDataWithLogIn = [
//   { name: 'About & Legal' },
//   { name: 'Contact Support' },
//   { name: `Version: ${currentAppVersion} ` },
//   { name: 'Log In' },
// ];

// const FlatListDataWithLogOut = [
//   {
//     name: 'Pending Bets',
//     icon: images.drawerIconPendingPlayParlay,
//   },
//   {
//     name: 'Resolved Bets',
//     icon: images.drawerIconOnHold,
//   },
//   {
//     name: 'Cashed Out Bets',
//     icon: images.drawerIconPendingPlayParlay,
//   },
//   {
//     name: 'Self Exclusion',
//     icon: images.drawerIconOnHold,
//   },
//   {
//     name: 'Change Password',
//     icon: images.drawerIconAboutUs,
//   },
//   { name: 'About & Legal' },
//   { name: 'Contact Support' },
//   { name: `Version: ${currentAppVersion} ` },
//   { name: 'Log Out' },
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.blueBorder,
    width: responsiveFontSize(285),
  },
  menuIconContainer: {
    borderTopWidth: spacing.border,
    borderTopColor: UIColors.newAppButtonGreenBackgroundColor,
    paddingVertical: responsiveFontSize(15),
    paddingHorizontal: responsiveFontSize(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultWhiteLabel: {
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.bold,
    color: UIColors.newAppFontWhiteColor,
    marginLeft: responsiveFontSize(15),
  },
  cellView: {
    flex: 1,
  },
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      isPortrait: this.props.screenProps.isPortrait,
      screenOrientation: this.props.screenProps.orientation,
    };
    this.userIdFromStorage = null;
  }

  componentDidMount() {
    Storage.getItemWithKey(constants.USER_DISPLAY_NAME, (value) => {
      this.props.setProfileImage('', value);
    });
    if (UserData.BearerToken) {
      this.props.getProfileRequest();
    }
    Storage.getItemWithKey(constants.USER_ID, (response) => {
      this.userIdFromStorage = response;
      // this.subscribeWalletToFirebase();
    });
  }

  componentWillUnmount() {
    // this.unsubscribeWalletToFirbaseInstance();
  }

  // unsubscribeFirbaseInstance() {
  //   // firebase.database().ref(`production_match_odds_change/${this.props.mainGamePlay.selectedMatch.id}`).off();
  // }

  GetSectionListItem = (item) => {
    this.props.navigation.closeDrawer();
    switch (item.name) {
      case 'Fund Transfers':
        setTimeout(() => {
          this.props.navigation.navigate('FundsScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'My Bets':
        setTimeout(() => {
          this.props.navigation.navigate('MyBetsScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Pending Bets':
        setTimeout(() => {
          this.props.navigation.navigate('PendingPlaysAndParlaysScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Cashed Out Bets':
        setTimeout(() => {
          this.props.navigation.navigate('CashedOutBetScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Resolved Bets':
        setTimeout(() => {
          this.props.navigation.navigate('ResolvedPlaysScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Reality Check':
        setTimeout(() => {
          this.props.navigation.navigate('UserLimitScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Self Exclusion':
        setTimeout(() => {
          this.props.navigation.navigate('SelfExclusionScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Change Password':
        setTimeout(() => {
          this.props.navigation.navigate('ResetPasswordScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'About us':
        setTimeout(() => {
          this.props.navigation.navigate('AboutAndLegal');
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Contact':
        setTimeout(() => {
          this.props.navigation.navigate('ContactSupportScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Logout':
        this.logoutAction();
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Log In':
        setTimeout(() => {
          this.props.navigation.navigate('AuthenticationScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Settings':
        setTimeout(() => {
          this.props.navigation.navigate('NewEditProfileScreen', {
            isPortrait: this.state.isPortrait,
            screenOrientation: this.state.screenOrientation,
          });
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      case 'Login/Register':
        setTimeout(() => {
          this.props.navigation.navigate('AuthenticationScreen', {});
        }, 800);
        // this.unsubscribeFirbaseInstance();
        break;
      default:
        break;
    }
  }

  logoutAction() {
    showLogoutAlert(
      sideMenuLocalizeStrings.logoutMessage,
      sideMenuLocalizeStrings.logoutButtonTitle,
      sideMenuLocalizeStrings.stayLoginButtonTitle, () => this.logoutMethod(),
    );
  }

  logoutMethod() {

    // const { onSuccessLogin } = this.props.screenProps; // LOGIN USER CODE
    // onSuccessLogin(false);
    const { logoutRequest } = this.props;
    logoutRequest();
  }

  openProfileScreen() {
    this.props.navigation.closeDrawer();
    setTimeout(() => {
      this.props.navigation.navigate('ProfileScreen', {
        isPortrait: this.state.isPortrait,
        screenOrientation: this.state.screenOrientation,
      });
    }, 800);
  }

  openEditProfileScreen() {
    this.props.navigation.closeDrawer();
    setTimeout(() => {
      this.props.navigation.navigate('NewEditProfileScreen', {
        isPortrait: this.state.isPortrait,
        screenOrientation: this.state.screenOrientation,
      });
    }, 800);
  }

  // subscribeWalletToFirebase() {
  //   if (UserData.BearerToken && this.userIdFromStorage) {
  //     firebase.database().ref(`production_wallet_update/${this.userIdFromStorage}`).on('value', (snapshot) => {
  //       if (snapshot._value) {
  //         this.props.updateWalletAmount(snapshot._value.amount);
  //       }
  //     });
  //   } else {
  //     this.unsubscribeWalletToFirbaseInstance();
  //   }
  // }

  // unsubscribeWalletToFirbaseInstance() {
  //   firebase.database().ref(`production_wallet_update/${this.userIdFromStorage}`).off();
  // }

  refreshProfile() {
    this.props.getProfileRequest();
  }

  FlatListHeader = () => {
    return (
      <TouchableOpacity
        style={[styles.menuIconContainer, { position: 'relative', top: spacing.zero, borderTopWidth: spacing.zero }]}
        onPress={() => this.props.navigation.closeDrawer()}
      >
        <Text style={[styles.defaultWhiteLabel]}>
          Close
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const profile = this.props.getProfileState.imageUrl;
    const { isLoading } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <SideMenuHeader
          openProfileScreen={() => this.openEditProfileScreen()}
          userName={this.props.getProfileState.userName}
          profileImage={profile}
          refreshProfile={() => this.refreshProfile()}
          balance={this.props.getProfileState && this.props.getProfileState.walletAmount}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={UserData.BearerToken ? FlatListDataWithLogOut : FlatListDataWithLogIn}
          style={{ marginTop: responsiveFontSize(10) }}
          ListHeaderComponent={this.FlatListHeader}
          renderItem={
            ({ item }) => (
              <View
                style={styles.cellView}
              >
                <TouchableOpacity
                  style={styles.menuIconContainer}
                  onPress={() => this.GetSectionListItem(item)}
                >
                  <Image
                    style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }}
                    source={item.icon}
                  />
                  <Text style={styles.defaultWhiteLabel}>{item.name}</Text>
                </TouchableOpacity>
              </View>

            )

          }
        />
        {isLoading && <Loader isAnimating={isLoading} />}
      </SafeAreaView>
    );
  }
}

Sidebar.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  logoutRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  setProfileImage: PropTypes.func,
  getProfileRequest: PropTypes.func,
  mainGamePlay: PropTypes.object,
  getProfileState: PropTypes.object,
  updateWalletAmount: PropTypes.func,
  screenProps: PropTypes.object,
};

Sidebar.defaultProps = {
  navigation: {},
  logoutRequest: () => { },
  isLoading: false,
  setProfileImage: () => { },
  getProfileRequest: () => { },
  mainGamePlay: {},
  getProfileState: {},
  updateWalletAmount: () => { },
  screenProps: {},
};


const mapStateToProps = state => ({
  getProfileState: state.getProfile,
  isLoading: state.loaderReducers.isLoading,
  mainGamePlay: state.mainGamePlay,
});

const mapDispatchToProps = () => UserActions;

const SidebarScreen = connect(mapStateToProps, mapDispatchToProps)(Sidebar);


export default SidebarScreen;

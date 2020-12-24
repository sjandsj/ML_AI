import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { FlatList, View, TouchableOpacity, Text, Image, StatusBar, Platform } from 'react-native';


import Splash from '../screens/Splash';
import SideMenu from '../screens/SideMenu';
import { responsiveFontSize } from '../utils/utils_functions';
import PendingPlaysAndParlaysScreen from '../screens/PendingPlaysAndParlays';
import CashedOutBetScreen from '../screens/CashedOutBet';
import ResolvedPlaysScreen from '../screens/ResolvedPlays';
import AuthenticationScreen from '../screens/Authentication';
import WebViewScreen from '../screens/WebViewScreen';
import UserLimitScreen from '../screens/UserLimit';
import SelfExclusionScreen from '../screens/SelfExclusion';
import ResetPasswordScreen from '../screens/ResetPassword';
import MainGamePlayScreen from '../screens/MainGamePlay';
import ContactSupportScreen from '../screens/ContactSupport';
import NewEditProfileScreen from '../screens/NewEditProfile';
import HomeScreen from '../screens/HomeScreen';
import CasinoScreen from '../screens/CasinoScreen';
import LiveCasinoScreen from '../screens/LiveCasinoScreen';
import FiltersProvidersScreen from '../screens/FiltersProvidersScreen';
import AboutAndLegal from '../screens/AboutAndLegal';
import SportsBettingScreen from '../screens/SportsBetting';
import CountryListScreen from '../screens/CountryListScreen';
import TournamentListScreen from '../screens/TournamentList';
import MatchBetScreen from '../screens/MatchsScreen';
import MarketOddsScreen from '../screens/MarketScreen';
import BetSlipScreen from '../screens/BetSlip';
import TabNavigator from './TabNavigator';
import TabLoginNavigator from './TabLoginNavigator';
import LiveBettingScreen from '../screens/LiveBetting';
import MyBetsScreen from '../screens/MyBets';
import FundsScreen from '../screens/FundsScreen';
import TodayScreen from '../screens/TodayScreen';
import SideMenuNew from '../screens/SideMenuNew';
import VirtualGamesScreen from '../screens/VirtualGamesScreen';

// // Drawer Stack
// const DrawerStack = createDrawerNavigator({
//   TabNavigator: {
//     screen: TabNavigator,
//     key: 'TabNavigator',
//     navigationOptions: {
//       header: null,
//     },
//   },
// }, {
//   initialRouteName: 'TabNavigator',
//   contentComponent: SideMenu,
//   drawerWidth: responsiveFontSize(285),
//   drawerPosition: 'right',
// });


const DrawerStack = createDrawerNavigator({

  TabNavigator: {
    screen: TabNavigator,
    key: 'TabNavigator',
    navigationOptions: {
      header: null,
    },
  },
  AuthenticationScreen: {
    screen: AuthenticationScreen,
    key: 'AuthenticationScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SideMenuNew: {
    screen: SideMenuNew,
    key: 'SideMenuNew',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    key: 'HomeScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MainGamePlayScreen: {
    screen: MainGamePlayScreen,
    key: 'MainGamePlayScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CasinoScreen: {
    screen: CasinoScreen,
    key: 'CasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  LiveCasinoScreen: {
    screen: LiveCasinoScreen,
    key: 'LiveCasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SportsBettingScreen: {
    screen: SportsBettingScreen,
    key: 'SportsBettingScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

}, {
  initialRouteName: 'TabNavigator',
  contentComponent: SideMenu,
  drawerWidth: responsiveFontSize(285),
  drawerPosition: 'right',
});

const DrawerStackAfterLogin = createDrawerNavigator({

  TabLoginNavigator: {
    screen: TabLoginNavigator,
    key: 'TabLoginNavigator',
    navigationOptions: {
      header: null,
    },
  },
  AuthenticationScreen: {
    screen: AuthenticationScreen,
    key: 'AuthenticationScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    key: 'HomeScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MainGamePlayScreen: {
    screen: MainGamePlayScreen,
    key: 'MainGamePlayScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CasinoScreen: {
    screen: CasinoScreen,
    key: 'CasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  LiveCasinoScreen: {
    screen: LiveCasinoScreen,
    key: 'LiveCasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SportsBettingScreen: {
    screen: SportsBettingScreen,
    key: 'SportsBettingScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

}, {
  initialRouteName: 'TabLoginNavigator',
  contentComponent: SideMenu,
  drawerWidth: responsiveFontSize(285),
  drawerPosition: 'right',
});

/*
const AuthenticationNavigator = createStackNavigator(
  {
    AuthenticationScreen: {
      screen: AuthenticationScreen,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
const SportsBettingNavigator = createStackNavigator(
  {
    SportsBettingScreen: {
      screen: SportsBettingScreen,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);


const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Authentication: AuthenticationNavigator,
  SportsBetting: SportsBettingNavigator,
});


const rootStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
    },

    rootTab: TabNavigator,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    mode: 'modal',
  },
);
export default rootStack;
*/
//= ============

/*
// Drawer stack

const DrawerStack =  ({
  HomeScreen: {
    screen: HomeScreen,
    key: 'HomeScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MainGamePlayScreen: {
    screen: MainGamePlayScreen,
    key: 'MainGamePlayScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CasinoScreen: {
    screen: CasinoScreen,
    key: 'CasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  LiveCasinoScreen: {
    screen: LiveCasinoScreen,
    key: 'LiveCasinoScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

}, {
  initialRouteName: 'HomeScreen',
  contentComponent: SideMenu,
  drawerWidth: responsiveFontSize(285),
  drawerPosition: 'right',
});
*/
const RootNavigator = createStackNavigator({
  DrawerStack: {
    screen: DrawerStack,
  },
  DrawerStackAfterLogin: {
    screen: DrawerStackAfterLogin,
  },
  TabNavigator: {
    screen: TabNavigator,
    key: 'TabNavigator',
    navigationOptions: {
      header: null,
    },
  },
  Splash: {
    screen: Splash,
    key: 'SplashScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  AuthenticationScreen: {
    screen: AuthenticationScreen,
    key: 'AuthenticationScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  PendingPlaysAndParlaysScreen: {
    screen: PendingPlaysAndParlaysScreen,
    key: 'PendingPlaysAndParlaysScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  ResolvedPlaysScreen: {
    screen: ResolvedPlaysScreen,
    key: 'ResolvedPlaysScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  CashedOutBetScreen: {
    screen: CashedOutBetScreen,
    key: 'CashedOutBetScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  AboutAndLegal: {
    screen: AboutAndLegal,
    key: 'AboutAndLegal',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  ContactSupportScreen: {
    screen: ContactSupportScreen,
    key: 'ContactSupportScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  WebViewScreen: {
    screen: WebViewScreen,
    key: 'WebViewScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  UserLimitScreen: {
    screen: UserLimitScreen,
    key: 'UserLimitScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SelfExclusionScreen: {
    screen: SelfExclusionScreen,
    key: 'SelfExclusionScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  ResetPasswordScreen: {
    screen: ResetPasswordScreen,
    key: 'ResetPasswordScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  MainGamePlayScreen: {
    screen: MainGamePlayScreen,
    key: 'MainGamePlayScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    key: 'HomeScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  CasinoScreen: {
    screen: CasinoScreen,
    key: 'CasinoScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  LiveCasinoScreen: {
    screen: LiveCasinoScreen,
    key: 'LiveCasinoScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  FiltersProvidersScreen: {
    screen: FiltersProvidersScreen,
    key: 'FiltersProvidersScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  NewEditProfileScreen: {
    screen: NewEditProfileScreen,
    key: 'NewEditProfleScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  SportsBettingScreen: {
    screen: SportsBettingScreen,
    key: 'SportsBettingScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  CountryListScreen: {
    screen: CountryListScreen,
    key: 'CountryListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  TournamentListScreen: {
    screen: TournamentListScreen,
    key: 'TournamentListScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MatchBetScreen: {
    screen: MatchBetScreen,
    key: 'MatchBetScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MarketOddsScreen: {
    screen: MarketOddsScreen,
    key: 'MarketOddsScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  BetSlipScreen: {
    screen: BetSlipScreen,
    key: 'BetSlipScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  LiveBettingScreen: {
    screen: LiveBettingScreen,
    key: 'LiveBettingScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  MyBetsScreen: {
    screen: MyBetsScreen,
    key: 'MyBetsScreen',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  FundsScreen: {
    screen: FundsScreen,
    key: 'FundsScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  VirtualGamesScreen: {
    screen: VirtualGamesScreen,
    key: 'VirtualGamesScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
  TodayScreen: {
    screen: TodayScreen,
    key: 'TodayScreen',
    navigationOptions: {
      header: null,
      gestureEnabled: false,
    },
  },
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
});

export default RootNavigator;

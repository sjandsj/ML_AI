import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../../../screens/HomeScreen';
import SportsBettingScreen from '../../../screens/SportsBetting';
import CasinoScreen from '../../../screens/CasinoScreen';
import LiveCasinoScreen from '../../../screens/LiveCasinoScreen';
import LiveBettingScreen from '../../../screens/LiveBetting';
import NewEditProfileScreen from '../../../screens/NewEditProfile';
import FundsScreen from '../../../screens/FundsScreen';
import TodayScreen from '../../../screens/TodayScreen';
import SideMenu from '../../../screens/SideMenu';
import SideMenuNew from '../../../screens/SideMenuNew';

export default SidemenuNavigator = createStackNavigator(
  {
    SideMenuNew: {
      screen: SideMenuNew,
      key: 'SideMenuNew',
      navigationOptions: {
        header: null,
      },
    },
    // SportsBettingScreen: {
    //   screen: SportsBettingScreen,
    //   key: 'SportsBettingScreen',
    //   navigationOptions: {
    //     header: null,
    //     gesturesEnabled: false,
    //   },
    // },
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
   
    LiveBettingScreen: {
      screen: LiveBettingScreen,
      key: 'LiveBettingScreen',
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
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
    FundsScreen: {
      screen: FundsScreen,
      key: 'FundsScreen',
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
  },
  {
    initialRouteName: 'SideMenuNew',
  },
);

import { createStackNavigator } from 'react-navigation';

import SportsBettingScreen from '../../../screens/SportsBetting';
import CountryListScreen from '../../../screens/CountryListScreen';
import TournamentListScreen from '../../../screens/TournamentList';
import LiveBettingScreen from '../../../screens/LiveBetting';
import MatchBetScreen from '../../../screens/MatchsScreen';
import MarketOddsScreen from '../../../screens/MarketScreen';
import TodayScreen from '../../../screens/TodayScreen';

export default SportsBettingNavigator = createStackNavigator(
  {
    SportsBettingScreen: {
      screen: SportsBettingScreen,
      key: 'SportsBettingScreen',
      navigationOptions: {
        header: null,
      },
    },
    CountryListScreen: {
      screen: CountryListScreen,
      key: 'CountryListScreen',
      navigationOptions: {
        header: null,
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
    LiveBettingScreen: {
      screen: LiveBettingScreen,
      key: 'LiveBettingScreen',
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
    initialRouteName: 'SportsBettingScreen',
  },
);

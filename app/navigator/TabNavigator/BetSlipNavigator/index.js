import { createStackNavigator } from 'react-navigation';

import SportsBettingScreen from '../../../screens/SportsBetting';
import BetSlipScreen from '../../../screens/BetSlip';

export default BetSlipNavigator = createStackNavigator(
  {
    BetSlipScreen: {
      screen: BetSlipScreen,
      key: 'BetSlipScreen',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'BetSlipScreen',
  },
);

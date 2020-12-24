import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { screenNames } from '../utils/constant';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import EmailVerification from '../screens/EmailVerification';
import MobileVerification from '../screens/MobileVerification';
import Home from '../screens/HomeScreen';

const MainNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      key: screenNames.SPLASH_SCREEN,
    },
   Home: {
      screen: Home,
      key: screenNames.HOME_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    Login: {
      screen: Login,
      key: screenNames.LOGIN_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    EmailVerification: {
      screen: EmailVerification,
      key: screenNames.EMAIL_VERIFICATION_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    MobileVerification: {
      screen: MobileVerification,
      key: screenNames.MOBILE_VERIFICATION_SCREEN,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  
  {
    initialRouteName: screenNames.SPLASH_SCREEN,
    headerMode: 'none',
  },
);
const RootNavigator = createAppContainer(MainNavigator);

export default RootNavigator;

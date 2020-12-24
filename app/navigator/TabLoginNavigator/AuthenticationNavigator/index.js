import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AuthenticationScreen from '../../../screens/Authentication';
import NewEditProfileScreen from '../../../screens/NewEditProfile';
import MyBetsScreen from '../../../screens/MyBets';

export default AuthenticationNavigator = createStackNavigator(
  {
    AuthenticationScreen: {
      // screen: AuthenticationScreen,
      screen: props => (props.screenProps.isLoggedin ? <MyBetsScreen {...props} /> : <AuthenticationScreen {...props} />),
      key: 'AuthenticationScreen',
      navigationOptions: {
        header: null,
      },
    },
    MyBetsScreen: {
      screen: MyBetsScreen,
      key: 'MyBetsScreen',
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'AuthenticationScreen',
  },
);

import React from 'react';
import { StatusBar } from 'react-native';
import { UIColors } from '../utils/variables';

const CommonStatusBar = props => (
  <StatusBar
    {...props}
    backgroundColor={UIColors.newAppBackgroundColorWhite}
    barStyle="dark-content"
  />
);
export default CommonStatusBar;

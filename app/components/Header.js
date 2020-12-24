import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { UIColors } from '../utils/variables';
import HeaderLogo from './Navigation/HeaderLogo';
import Menu from './Menu';
import Navigation from '../utils/navigation';
import BackButton from './BackButton';
import NavigationHeaderTitle from './NavigationHeaderTitle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    padding: 10,
  },
  innerView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rightView: {
    height: 30,
    width: 40,
  },
});

const Header = props => (
  <View style={styles.container}>
    <SafeAreaView style={styles.innerView}>
      <BackButton backButtonAction={() => {
        Navigation.sharedInstance().popScreen();
      }}
      />
      {props.title
        ? <NavigationHeaderTitle title={props.title} />
        : <HeaderLogo />}
      {
        props.showMenu
        ? <Menu rightButtonAction={() => props.rightButtonAction()} />
        : <View style={styles.rightView} />
      }
    </SafeAreaView>
  </View>
);

Header.propTypes = {
  rightButtonAction: PropTypes.func,
  title: PropTypes.string,
  showMenu: PropTypes.bool,
};

Header.defaultProps = {
  rightButtonAction: () => { },
  title: null,
  showMenu: null,
};

export default Header;

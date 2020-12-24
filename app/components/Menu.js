import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { responsiveFontSize } from '../utils/utils_functions';
import { images } from '../assets/images';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    zIndex: 999,
  },
  displayStyle: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  portraitStyle: {
    height: responsiveFontSize(100),
    justifyContent: 'flex-end',
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: UIColors.defaultWhite,
  },
  titleStyle: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontWeight: '700',
  },
});

const Menu = props => (
  <View style={styles.container}>
    {/* <TouchableOpacity
      onPress={() => props.homeButtonAction()}
      style={styles.displayStyle}
    >
      <Image
        source={images.homeAddressImage}
        style={styles.iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity> */}
    <TouchableOpacity
      onPress={() => props.rightButtonAction()}
      style={styles.displayStyle}
    >
      <Image
        source={images.dottedMenu}
        style={styles.iconStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);

Menu.propTypes = {
  screenOrientation: PropTypes.string,
  onClickStatsAndRank: PropTypes.func,
  rightButtonAction: PropTypes.func,
};

Menu.defaultProps = {
  screenOrientation: '',
  onClickStatsAndRank: () => {},
  rightButtonAction: () => {},
};

export default Menu;

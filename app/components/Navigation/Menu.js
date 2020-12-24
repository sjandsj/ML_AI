/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '../CustomText';
import { UIColors, fontName, itemSizes, fontSizes } from '../../utils/variables';


const styles = StyleSheet.create({
  imageStyle: {
    height: itemSizes.defaultSmallButtonHeight,
    width: itemSizes.defaultButtonHeight,
  },
  textStyle: {
    color: UIColors.focused,
    fontSize: fontSizes.small,
    fontFamily: fontName.sourceSansProRegular,
  },
});

const Menu = props => (
  <View>
    <TouchableOpacity
      onPress={() => props.rightButtonAction()}
    >
      {props.rightButtonTitle.length > 0
        && <CustomText title={props.rightButtonTitle} textStyle={styles.textStyle} />
      }
      {props.rightButtonImage
        && <Image
          source={props.rightButtonImage}
          style={styles.imageStyle}
          resizeMode="contain"
        />
          }
    </TouchableOpacity>
  </View>
);

Menu.propTypes = {
  rightButtonImage: PropTypes.any,
  rightButtonTitle: PropTypes.string,
  rightButtonAction: PropTypes.func,
};

Menu.defaultProps = {
  rightButtonImage: null,
  rightButtonAction: () => { },
  rightButtonTitle: '',
};

export default Menu;

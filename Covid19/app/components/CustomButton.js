import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { spacing, fontWeights, UIColors, itemSizes, fontSizes } from '../utils/variables';

const styles = StyleSheet.create({
 buttonStyle: {
    margin: spacing.borderDouble,
    borderRadius: spacing.extraSmall, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'rgb(0, 218, 74)',
 },
  textStyle: {
    color: UIColors.appBackGroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.small,
  }
});

const CustomButton = props => (
    <TouchableOpacity
      onPress={props.buttonPressAction}
      style={styles.buttonStyle}>
      <Text style={styles.textStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
);

CustomButton.propTypes = {
  title: PropTypes.string,
  buttonPressAction: PropTypes.func,
};

CustomButton.defaultProps = {
  title: '',
  buttonPressAction: () => {},
};
export default CustomButton;

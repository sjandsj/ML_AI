import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: spacing.medium,
  },
  textStyle: {
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
});

const YellowButton = props => (
  <View>
    <TouchableOpacity
      style={[styles.buttonStyle,
      {
        backgroundColor: (props.isDisabled
          ? UIColors.focused : UIColors.focused),
      }]}
      disabled={props.isDisabled}
      onPress={props.onPress}
    >
      <Text style={styles.textStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  </View>
);


YellowButton.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  title: PropTypes.string,
};

YellowButton.defaultProps = {
  onPress: () => { },
  isDisabled: false,
  title: '',
};

export default YellowButton;

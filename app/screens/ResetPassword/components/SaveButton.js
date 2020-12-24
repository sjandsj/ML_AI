import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, itemSizes, spacing, fontName } from '../../../utils/variables';

const itemWidth = 150;

const styles = StyleSheet.create({
  container: {
    marginTop: itemSizes.defaultHeight,
    height: itemSizes.avatarCircleSmall,
    width: itemWidth,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: UIColors.focused,
  },
  buttonStyle: {
    paddingVertical: spacing.semiMedium,
  },
  textStyle: {
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.small,
    textAlign: 'center',
    width: itemWidth,
  },
});

const SaveButton = props => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={props.onPress}
    >
      <Text style={styles.textStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  </View>
);


SaveButton.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  title: PropTypes.string,
};

SaveButton.defaultProps = {
  onPress: () => { },
  isDisabled: false,
  title: '',
};

export default SaveButton;

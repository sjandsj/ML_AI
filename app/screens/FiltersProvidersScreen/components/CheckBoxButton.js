import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, fontName } from '../../../utils/variables';
import { images } from '../../../assets/images/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    padding: spacing.small,
    marginBottom: spacing.medium,
    marginRight: spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: fontSizes.medium,
    width: fontSizes.medium,
  },
  textStyle: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
    marginLeft: spacing.small,
  },
});

const CheckBoxButton = props => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.buttonStyle}
    >
      <Image
        height={fontSizes.medium}
        width={fontSizes.medium}
        style={styles.imageStyle}
        source={props.isSelected ? images.checkIcon : images.unCheckIcon}
      />
      <Text
        style={[styles.textStyle,
          { color: props.isSelected ? UIColors.focused : UIColors.defaultWhite }]}
      >
        {`${props.title}`}
      </Text>
    </TouchableOpacity>
  </View>
);


CheckBoxButton.propTypes = {
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  title: PropTypes.string,
};

CheckBoxButton.defaultProps = {
  onPress: () => { },
  isSelected: false,
  title: '',
};

export default CheckBoxButton;

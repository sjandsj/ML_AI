import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../../../assets/images';
import { UIColors, fontName, fontSizes, itemSizes, spacing } from '../../../utils/variables';

const styles = StyleSheet.create({
  textStyle: {
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProBold,
    fontSize: fontSizes.large,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
  imageStyle: {
    height: itemSizes.itemWidth,
    width: itemSizes.itemSizes280,
  },
  buttonStyle: {
    height: itemSizes.itemWidth,
    width: itemSizes.itemSizes280,
    marginBottom: spacing.large,
  },
});

const DisplayOptions = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => props.onClickAction()}
    >
      <Image
        style={styles.imageStyle}
        source={images.bottomStackImage}
        resizeMode="contain"
      />
      <Text style={styles.textStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

DisplayOptions.propTypes = {
  showPassowrdText: PropTypes.func,
  isShowPassword: PropTypes.bool,
};

DisplayOptions.defaultProps = {
  showPassowrdText: () => {},
  isShowPassword: Boolean(false),
};


export default DisplayOptions;

import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ImageBackground, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontName, fontSizes, itemSizes, spacing, fontWeights } from '../../../utils/variables';
import CustomText from '../../../components/CustomText';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: itemSizes.itemSizes120,
    width: (Dimensions.get('window').width - 10) / 3,
    margin: spacing.extraSmall,
    borderRadius: itemSizes.iconRadius,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: itemSizes.iconRadius,
    overflow: 'hidden',
  },
  iconStyle: {
    height: itemSizes.headerSize,
    width: itemSizes.headerSize,
    alignSelf: 'center',
  },
  textStyle: {
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.tiny,
    alignSelf: 'center',
  },
});

const SportsButton = props => (
  <TouchableOpacity
    onPress={props.value !== 'extra' ? props.onClick : ''}
    style={styles.containerStyle}
  >
    {props.value !== 'extra' &&
      <ImageBackground
        source={images.iconBackgroundGrey}
        style={styles.background}
      >
        <Image
          resizeMode="contain"
          style={styles.iconStyle}
          source={{uri: props.imageUrl}}
        />
        <Text
          style={styles.textStyle}
          numberOfLines={1}
        >
          {props.title}
        </Text>
      </ImageBackground>
    }
  </TouchableOpacity >
);

SportsButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  iconImage: PropTypes.object,
};

SportsButton.defaultProps = {
  onClick: () => { },
  title: '',
  iconImage: {},
};

export { SportsButton };

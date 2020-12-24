import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, fontSizes, spacing, itemSizes, fontWeights } from '../../../utils/variables';
import { images } from '../../../assets/images/';
import CustomText from '../../../components/CustomText';

const styles = StyleSheet.create({
  sportsHeader: {
    marginTop: spacing.medium,
    width: '100%',
    height: itemSizes.defaultButtonHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.extraExtraSmall,
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginLeft: spacing.small,
    height: itemSizes.iconMedium,
    width: itemSizes.iconMedium,
  },
  matchTextStyle: {
    marginLeft: spacing.medium,
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraSmall,
  },
  viewForBlueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconLarge,
    backgroundColor: UIColors.newAppFontBlueColor,
    borderRadius: spacing.extraExtraSmall,
  },
  blueBoxTextStyle: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
});

const SportBar = props => (
  <TouchableOpacity
    style={styles.sportsHeader}
    onPress={props.sportsBarPressed}
  >

    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <Image
        resizeMode="contain"
        source={props.sportsBarIcon}
        style={styles.iconStyle}
      />
      <Text
        numberOfLines={1}
        style={styles.matchTextStyle}
      >
        {props.sportsBarTitle}
      </Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
      <View style={styles.viewForBlueBox}>
        <CustomText title={props.sportsCount} textStyle={styles.blueBoxTextStyle} />
      </View>
      <View>
        <Image
          source={images.rightArrowWhite}
          style={{ height: itemSizes.iconRadius, width: itemSizes.iconRadius }}
        />
      </View>
    </View>
  </TouchableOpacity>
);

SportBar.propTypes = {
  sportsBarPressed: PropTypes.func,
  sportsBarTitle: PropTypes.string,
  aportArray: PropTypes.array,
  sportsBarIcon: PropTypes.object,
};

SportBar.defaultProps = {
  sportsBarPressed: () => { },
  sportsBarTitle: '',
  aportArray: [],
  sportsBarIcon: {},
};

export { SportBar };


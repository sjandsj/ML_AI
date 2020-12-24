import React from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UIColors, fontSizes, spacing, itemSizes, fontWeights } from '../../../utils/variables';
import { images } from '../../../assets/images';
import PropTypes from 'prop-types';
import CustomText from '../../../components/CustomText';

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    height: itemSizes.headerSize,
    alignItems: 'center',
  },
  filterHeader: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularBlueTickIcon: {
    marginLeft: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconSmall,
  },
  filterHeaderText: {
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.small,
  },
  filterButton: {
    width: '100%',
    flex: 1,
    backgroundColor: UIColors.greyBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButtonText: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.bold,
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

const BetTypeFilter = props => (
  <View style={styles.filterContainer}>
    <View style={styles.filterHeader}>
      <Image
        source={images.circularBlueTick}
        style={[styles.circularBlueTickIcon, { position: 'absolute', left: 0 }]}
      />
      <Text
        numberOfLines={1}
        style={styles.filterHeaderText}
      >
        {props.selectedFilter}
      </Text>
    </View>
    <TouchableOpacity
    disabled
      onPress={props.betFilterPressed}
      style={styles.filterButton}
    >
      <Image
        source={images.addIconGrey}
        style={styles.circularBlueTickIcon}
      />
      <Text numberOfLines={1} style={styles.filterButtonText}>
        Other bet types
      </Text>
      <View style={styles.viewForBlueBox}>
        <CustomText title={props.allMarkets && props.allMarkets.length} textStyle={styles.blueBoxTextStyle} />
      </View>
    </TouchableOpacity>
  </View>
);

export { BetTypeFilter };

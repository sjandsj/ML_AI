import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { spacing, UIColors, fontName, fontSizes, itemSizes } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: UIColors.secondary,
    alignItems: 'center',
    marginTop: 10,
    padding: spacing.large,
  },
  statTextStyle: {
    paddingLeft: spacing.extraSmall,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontName.sourceSansProSemiBold,
    fontSize: fontSizes.extraSmall,
    color: UIColors.defaultWhite,
  },
  imageStyle: {
    height: itemSizes.iconMedium,
    width: itemSizes.iconMedium,
    // marginLeft: spacing.extraSmall,
  },
  amountViewStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UIColors.primary,
    // borderRadius: spacing.extraSmall,
    borderColor: UIColors.defaultBlack,
    borderWidth: spacing.border,
    // margin: spacing.extraSmall,
    maxHeight: itemSizes.defaultButtonHeight,
    // width: itemSizes.itemSize80,
    paddingHorizontal: 10,
  },
  amountViewSelectedStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UIColors.primary,
    // borderRadius: spacing.extraSmall,
    borderColor: UIColors.focused,
    borderWidth: spacing.border,
    // margin: spacing.extraSmall,
    maxHeight: itemSizes.defaultButtonHeight,
    // width: itemSizes.itemSize80,
    paddingHorizontal: 10,

  },
  amountTextStyle: {
    fontFamily: fontName.sourceSansProBold,
    fontSize: fontSizes.extraSmall,
    color: UIColors.focused,
    paddingVertical: spacing.semiMedium,
    // width: itemSizes.itemSize80,
    maxHeight: itemSizes.defaultButtonHeight,

  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 200,
    // backgroundColor:'red',
    // paddingHorizontal: 20
    minWidth: 100,
  },
});

const LimitRow = props => (
  <View style={styles.container}>
    <View style={styles.subContainer}>
      <Image
        source={props.data && props.data.source}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <Text style={styles.statTextStyle}>
        {props.data && props.data.stat.toUpperCase()}
      </Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={props.isSelected ? styles.amountViewSelectedStyle : styles.amountViewStyle}
        onPress={() => props.onPressUserLimit()}
      >
        <Text style={styles.amountTextStyle}>{props.userLimit}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

LimitRow.propTypes = {
  screenOrientation: PropTypes.string,
  onPressUserLimit: PropTypes.func,
  data: PropTypes.object,
  userLimit: PropTypes.string,
  isSelected: PropTypes.bool,
};

LimitRow.defaultProps = {
  screenOrientation: '',
  onPressUserLimit: () => {},
  data: {},
  userLimit: '',
  isSelected: false,
};

export default LimitRow;

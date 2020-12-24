import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import { UIColors, fontName, spacing, fontSizes, itemSizes } from '../../../utils/variables';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuIconContainer: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.semiMedium,
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultIcon: {
    width: itemSizes.iconExtraLarge,
    height: itemSizes.iconExtraLarge,
    margin: spacing.extraSmall,
    marginRight: spacing.mediumLarge,
    
  },
  defaultWhiteLabel: {
    fontSize: fontSizes.medium,
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProSemiBold,
  },
});

const SideMenuCell = props => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.menuIconContainer}
      onPress={() => props.onPressMenuItem(props.data)}
    >
      <Image style={styles.defaultIcon} source={props.data.icon} />
      <Text style={styles.defaultWhiteLabel}>{props.data.name}</Text>
    </TouchableOpacity>
  </View>
);

SideMenuCell.propTypes = {
  item: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onPressMenuItem: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any),
};

SideMenuCell.defaultProps = {
  item: '',
  icon: '',
  name: '',
  onPressMenuItem: () => {},
  data: {},
};

export default SideMenuCell;

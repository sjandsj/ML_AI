import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: UIColors.newAppButtonGrayColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.small,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: UIColors.defaultWhite,
  },
  textStyle: {
    color: UIColors.primaryText,
  },
});

const CategoryCell = props => (
  <TouchableOpacity style={[styles.categoryButton,  props.isSelected ? { backgroundColor: UIColors.newAppButtonGreenBackgroundColor } : {}]} onPress={() => props.onPressCategory()}>
    <Text style={[styles.textStyle]}>{props.category}</Text>
  </TouchableOpacity>
);

CategoryCell.propTypes = {
};

CategoryCell.defaultProps = {
};

export default CategoryCell;

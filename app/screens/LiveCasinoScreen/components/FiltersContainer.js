import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import CategoryCell from './CategoryCell';
import { LiveCasinoCategories } from '../../../utils/enum';

const styles = StyleSheet.create({
  container: {
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.small,
  },
  providersContainer: {
  },
  typesButton: {
    padding: 5,
  },
});

const FiltersContainer = props => (
  <View style={styles.container}>
    <View style={styles.categoriesContainer}>
      <CategoryCell
        category={LiveCasinoCategories.Free_spins}
        onPressCategory={() => props.onPressCategory(LiveCasinoCategories.Free_spins)}
        isSelected={props.freeSpin ? true : false}
      />
      <CategoryCell
        category={LiveCasinoCategories.Lobby}
        onPressCategory={() => props.onPressCategory(LiveCasinoCategories.Lobby)}
        isSelected={props.lobby ? true : false}
      />
      <CategoryCell
        category={LiveCasinoCategories.Mobile}
        onPressCategory={() => props.onPressCategory(LiveCasinoCategories.Mobile)}
        isSelected={props.mobile ? true : false}
      />
    </View>
  </View>
);

FiltersContainer.propTypes = {
  onPressCategory: PropTypes.func,
  freeSpin: PropTypes.bool,
  lobby: PropTypes.bool,
  mobile: PropTypes.bool,
};

FiltersContainer.defaultProps = {
  onPressCategory: () => {},
  freeSpin: false,
  lobby: false,
  mobile: false,
};

export default FiltersContainer;

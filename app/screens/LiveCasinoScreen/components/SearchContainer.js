import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import { images } from '../../../assets/images';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.primary,
  },
  categoriesContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: UIColors.defaultWhite,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  searchIconStyle: {
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    tintColor: UIColors.defaultWhite,
  },
  searchButton: {
    // paddingTop: 5,
  },
  textInputStyle: {
    flex: 1,
    height: 36,
    color: UIColors.defaultWhite,
    marginLeft: 5,
  },
  filterIconStyle: {
    width: itemSizes.iconSmall,
    height: itemSizes.iconSmall,
    tintColor: UIColors.defaultWhite,
  },
  filterButton: {
    // marginTop: 10,
    padding: spacing.extraSmall,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
});

const SearchContainer = props => (
  <View style={styles.container}>
    <View style={styles.categoriesContainer}>
      <View style={styles.SearchContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Image style={styles.searchIconStyle} source={images.searchIcon} />
        </TouchableOpacity>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.textInputStyle}
          placeholder={commonLocalizeStrings.searchGames}
          placeholderTextColor={UIColors.placeHolderColor}
          onChangeText={props.onChangetext}
          clearButtonMode={'always'}
          value={props.searchValue}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={() => props.onPressFilter()}>
        <Image style={styles.filterIconStyle} source={images.filterIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

SearchContainer.propTypes = {
  onPressCategory: PropTypes.func,
  onChangetext: PropTypes.func,
  searchValue: PropTypes.string,
};

SearchContainer.defaultProps = {
  onPressCategory: () => {},
  onChangetext: () => {},
  searchValue: '',
};

export default SearchContainer;

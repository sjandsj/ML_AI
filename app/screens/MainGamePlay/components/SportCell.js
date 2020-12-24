import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { UIColors, itemSizes, spacing, fontName } from '../../../utils/variables';
import { images } from '../../../assets/images/index';

const styles = StyleSheet.create({
  container: {
    height: itemSizes.headerMediumSize,
    width: itemSizes.headerMediumSize,
    alignItems: 'center',
    marginHorizontal: spacing.semiMedium,
  },
  imageContent: {
    height: itemSizes.defaultButtonHeight,
    width: itemSizes.defaultButtonHeight,
  },
  title: {
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProSemiBold,
  },
});

class SportsCell extends Component {
  componentDidMount() {

  }
  render() {
    const { sport, onCellPress, selectedSport } = this.props;
    const isSelected = sport.id === selectedSport.id;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onCellPress(sport)}
      >
        <Image
          source={images.footballNavigation}
          style={[styles.imageContent,
          {
            backgroundColor: isSelected
              ? UIColors.newAppButtonGreenBackgroundColor : UIColors.newAppGrayContentColor,
          }]}
        />
        <Text style={styles.title}>{sport.name}</Text>
      </TouchableOpacity>
    );
  }
}

SportsCell.propTypes = {
  sport: PropTypes.object,
  onCellPress: PropTypes.func,
  selectedSport: PropTypes.object,
};

SportsCell.defaultProps = {
  sport: { },
  onCellPress: () => { },
  selectedSport: { },
};

export default SportsCell;

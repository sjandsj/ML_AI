import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import { UIColors, spacing, fontName } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: spacing.semiMedium,
    borderWidth: 1,
    borderColor: UIColors.appGreyColor,
    borderRadius: 5,
    marginVertical: spacing.small,
  },
  blankContainer: {
    flex: 1,
    marginHorizontal: spacing.semiMedium,
    marginVertical: spacing.small,
  },
  imageTemp: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio: 3 / 2,
  },
  title: {
    alignSelf: 'stretch',
    color: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProSemiBold,
    backgroundColor: '#1c1c1c',
    paddingVertical: spacing.extraSmall,
    textAlign: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});

const CasinoCell = (props) => {
  const { item } = props;
  return (
    item.uuid ? (
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.gameRedirectAction(item.uuid)}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.imageTemp]}
          resizeMode={'contain'}
        />
        <Text numberOfLines={2} style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    ) :
      <View style={styles.blankContainer} />
  );
};

CasinoCell.propTypes = {
  onCellPress: PropTypes.func,
  gameRedirectAction: PropTypes.func,
  isPortrait: PropTypes.bool,
  item: PropTypes.object,
};

CasinoCell.defaultProps = {
  onCellPress: () => { },
  gameRedirectAction: () => {},
  isPortrait: true,
  item: {},
};

export default CasinoCell;

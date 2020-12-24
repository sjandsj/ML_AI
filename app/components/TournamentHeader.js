import React from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UIColors, fontSizes, spacing, itemSizes, fontWeights } from '../utils/variables';
import { images } from '../assets/images';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.medium,
    width: '100%',
    height: itemSizes.defaultButtonHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.large,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
   //  marginLeft: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconSmall,
  },
  textStyle: {
    marginLeft: spacing.small,
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraSmall,
    alignSelf: 'center',
    marginRight: spacing.medium,
    textAlign: 'center'
  },
});

const TournamentHeader = props => (
  <View style={styles.container}>
    <Image
      resizeMode='contain'
      source={{uri: props.gameIcon}}
      style={styles.iconStyle}
    />
    <Text
      numberOfLines={2} 
      style={styles.textStyle}
    >
      {props.gameName} - {props.tournamentName}
    </Text>
  </View>
);

export { TournamentHeader };

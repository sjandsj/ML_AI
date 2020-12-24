import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { fontSizes, fontName } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontName.sourceSansProRegular,
    fontSize: fontSizes.small,
  },
});

const BetButton = props => (
  <View style={[styles.container, props.style.view]}>
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={styles.innerView}>
      <Text style={[styles.title, props.style.title]}>{props.title}</Text>
    </TouchableOpacity>
  </View>
);

BetButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

BetButton.defaultProps = {
  onPress: () => {},
  title: '',
  style: {},
  disabled: false,
};

export default BetButton;

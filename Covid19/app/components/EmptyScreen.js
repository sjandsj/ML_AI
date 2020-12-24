/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  fontSizes, fontWeights,
} from '../utils/variables';
import { Localization } from '../utils/localization';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.medium,
  },
});

const EmptyScreen = (props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.emptyTitle}>{title}</Text>
    </View>
  );
};

EmptyScreen.propTypes = {
  title: PropTypes.string,
};

EmptyScreen.defaultProps = {
  title: Localization.NO_CONTENT,
};

export default EmptyScreen;


import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import colors from '../theme/colors';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
  },
  FieldTitles: {
    marginLeft: 15,
    flex: 1,
    color: UIColors.newAppFontBlackColor,
  },
});

const FieldTitles = props => (
  <View style={styles.container}>
    <Image source={props.icon} style={{ width: 18, height: 18 }} />
    <Text style={styles.FieldTitles}>{props.title}</Text>
  </View>
);

FieldTitles.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.objectOf(PropTypes.any),
};

FieldTitles.defaultProps = {
  title: '',
  icon: {},
};

export default FieldTitles;

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { images } from '../assets/images';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  selection: {
    flexDirection: 'row',
    borderBottomColor: colors.seperatorColor,
    borderBottomWidth: 1,
    marginTop: 5,
    paddingVertical: 5,
  },
  defaultValue: {
    flex: 1,
    color: colors.fontYellowColor,
  },
  containerModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Selection = props => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.selection}
      onPress={() => { props.onSelectPicker(); }}
    >
      <Text style={styles.defaultValue}>{props.value}</Text>
      <Image source={images.dropdown} style={{ width: 18, height: 18 }} />
    </TouchableOpacity>
  </View>
);

Selection.propTypes = {
  value: PropTypes.string,
  dropdownTitle: PropTypes.string,
  dropdownList: PropTypes.objectOf(PropTypes.any),
  onSelectOption: PropTypes.func,
  selectedDropDownItem: PropTypes.objectOf(PropTypes.any),
  onSelectPicker: PropTypes.func,
};

Selection.defaultProps = {
  value: '',
  dropdownTitle: '',
  dropdownList: [],
  selectedDropDownItem: {},
  onSelectOption: () => { },
  onSelectPicker: () => { },
};

export default Selection;

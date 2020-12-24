import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import colors from '../theme/colors';
import Selection from './Selection';
import { UIColors } from '../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  selection: {
    flexDirection: 'row',
    borderBottomColor: colors.seperatorColor,
    borderBottomWidth: 1,
    marginTop: 5,
    paddingVertical: 5,
  },
  heading: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: UIColors.newAppFontBlackColor,
  },
  defaultValue: {
    flex: 1,
    color: colors.fontYellowColor,
  },
});

const SelectionList = props => (
  <View style={styles.container}>
    <Image source={props.icon} style={{ width: 18, height: 18 }} />
    <View style={styles.heading}>
      <Text numberOfLines={2} style={styles.title}>{props.title}</Text>
      <Selection
        onSelectPicker={props.onSelectPicker}
        value={props.value}
        dropdownTitle={props.dropdownTitle}
        dropdownList={props.dropdownList}
        selectedDropDownItem={props.selectedDropDownItem}
      />
    </View>
  </View>
);

SelectionList.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  dropdownTitle: PropTypes.string,
  dropdownList: PropTypes.objectOf(PropTypes.any),
  onSelectOption: PropTypes.func,
  selectedDropDownItem: PropTypes.objectOf(PropTypes.any),
  onSelectPicker: PropTypes.func,
  icon: PropTypes.objectOf(PropTypes.any),
};

SelectionList.defaultProps = {
  title: '',
  value: '',
  dropdownTitle: '',
  dropdownList: [],
  selectedDropDownItem: {},
  onSelectOption: () => {},
  onSelectPicker: () => {},
  icon: {},
};

export default SelectionList;

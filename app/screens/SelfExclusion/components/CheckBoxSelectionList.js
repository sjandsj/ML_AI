import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { spacing } from '../../../utils/variables';
import CheckBoxButton from './CheckBoxButton';
import { formateData } from '../../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: spacing.large,
  },
  cellView: {
    flex: 1,
  },
});

const CheckBoxSelectionList = (props) => {
  const columns = props.isPortrait ? 2 : 3;
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        key={props.isPortrait ? 'v' : 'h'}
        style={styles.flatList}
        data={formateData(props.list, columns)}
        numColumns={columns}
        extraData={props.selectedItem}
        scrollEnabled={false}
        renderItem={(item) => {
          if (_.isEmpty(item.item)) {
            return <View style={styles.cellView} />;
          }
          return (
            <CheckBoxButton
              title={item.item}
              onPress={() => props.onSelectItem(item.item)}
              isSelected={props.selectedItem === item.item}
            />
          );
        }
        }
      />
    </View>
  );
};


CheckBoxSelectionList.propTypes = {
  list: PropTypes.array,
  onSelectItem: PropTypes.func,
  selectedItem: PropTypes.string,
  isPortrait: PropTypes.bool,
};

CheckBoxSelectionList.defaultProps = {
  list: [],
  onSelectItem: () => { },
  selectedItem: '',
  isPortrait: true,
};

export default CheckBoxSelectionList;

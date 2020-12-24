import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { spacing, itemSizes } from '../../../utils/variables';
import CheckBoxButton from './CheckBoxButton';
import { formateData } from '../../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: itemSizes.defaultLargeButtonHeight,
  },
  cellView: {
    flex: 1,
  },
  flatList: {
    paddingHorizontal: spacing.large,
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
        // data={formateData(props.list, columns)}
        data={props.list}
        numColumns={columns}
        scrollEnabled
        extraData={props}
        renderItem={(item) => {
          if (_.isEmpty(item.item)) {
            return <View style={styles.cellView} />;
          }
          return (
            <CheckBoxButton
              title={item.item}
              onPress={() => props.onSelectItem(item.item)}
              isSelected={_.includes(props.selectedItems, item.item)}
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
};

CheckBoxSelectionList.defaultProps = {
  list: [],
  onSelectItem: () => { },
  selectedItem: '',
};

export default CheckBoxSelectionList;

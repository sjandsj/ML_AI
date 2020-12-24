import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../../../utils/variables';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
  },
  typesContainer: {
    marginHorizontal: 10,
  },
  textStyle: {
    color: UIColors.primaryText,
  },
  typesButton: {
    padding: 10,
  },
});

const TabsCell = (props) => {
  const { typeSelected } = props;
  return (
    <View style={styles.container}>
      <View style={styles.typesContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          extraData={props}
          data={props.typesList}
          horizontal
          renderItem={item => (
            <TouchableOpacity
              style={styles.typesButton}
              onPress={() => props.onPressTab(item.item)}
            >
              <Text style={[styles.textStyle, item.item.name === typeSelected.tabName ? { color: UIColors.focused } : {}]} >
                {item.item.name}
              </Text>
            </TouchableOpacity>
        )}
        />
      </View>
    </View>
  );
};

TabsCell.propTypes = {
  typeSelected: PropTypes.string,
  typesList: PropTypes.array,
  onPressTab: PropTypes.func,
};

TabsCell.defaultProps = {
  typeSelected: 'ALL',
  typesList: [],
  onPressTab: () => {},
};

export default TabsCell;

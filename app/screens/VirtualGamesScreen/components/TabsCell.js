import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { UIColors } from '../../../utils/variables';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

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
              onPress={() => props.onPressTab(item.item.id)}
            >
              <Text style={[styles.textStyle, item.item.id === typeSelected ? { color: UIColors.focused } : {}]} >
                {(item.item.name).toUpperCase()}
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
  typeSelected: commonLocalizeStrings.all,
  typesList: [],
  onPressTab: () => {},
};

export default TabsCell;

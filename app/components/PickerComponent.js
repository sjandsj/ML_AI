import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  PickerIOS,
} from 'react-native';
import PropTypes from 'prop-types';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { responsiveFontSize } from '../utils/utils_functions';
import { UIColors } from '../utils/variables';

const { width, height } = Dimensions.get('window');
var PickerItem = PickerIOS.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const PickerComponent = props => (
  <View style={styles.container}>
    {Platform.OS === 'ios' ?
      <PickerIOS style={{ marginTop: -props.topMargin - 3 , paddingLeft: responsiveFontSize(15), }}
        selectedValue={props.selectedItem}
        itemStyle={{ color: UIColors.newAppFontWhiteColor, fontSize: responsiveFontSize(15), textAlign: props.itemAlign, }}
        onValueChange={(index) => props.onPickerSelect(index)}>
        {props.pickerList.map((value, i) => (
          <PickerItem label={value.name} value={i} key={"money" + value} />
        ))}
      </PickerIOS>
      :
      <View style={{ marginLeft: responsiveFontSize(props.marginLeft) }}>
        <WheelPicker
          onItemSelected={(event)=>props.onPickerSelect(event)}
          isCurved
          data={props.pickerList.map((value, i) => (
              value.name
          ))}
          // itemTextSize = {parseInt(responsiveFontSize(30))}
          itemTextSize={parseInt(responsiveFontSize(40))}
          selectedItemTextColor={"#f6f6f6"}
          selectedItemPosition={props.selectedItem}
          positionAlign={props.itemAlign}
        />
      </View>
    }
  </View>
);

PickerComponent.propTypes = {
  selectedItem: PropTypes.number,
  marginLeft: PropTypes.number,
  itemAlign: PropTypes.string,
  onPickerSelect: PropTypes.func,
  pickerList: PropTypes.array,
};

PickerComponent.defaultProps = {
  itemAlign: 'left',
  marginLeft: 10,
  selectedItem: 0,
  onPickerSelect: () => {},
  pickerList: [],
};

export default PickerComponent;

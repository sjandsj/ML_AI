
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../../actions/index';
import TitleRow from './TitleRow';
import NumberInput from './NumberInput';
import TouchableHold from '../../../components/TouchableHold';
import { UIColors, spacing, fontWeights, fontSizes, itemSizes } from '../../../utils/variables';
import CustomTextInput from '../../../components/CustomTextInput';

const inputWidth = '90%';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: spacing.semiMedium,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'black',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.extraSmall,
  },
  paymenttextStyle: {
    color: 'blue',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.extraSmall,
  },
  itemContainer: {
    flexDirection: 'row',
    height: itemSizes.item35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingEnd: spacing.medium,
    paddingStart: spacing.medium,
  },
  valueContainer: {
    flex: 1,
  },

  inputMainView: {
    height: itemSizes.itemWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: itemSizes.itemWidth,
    fontSize: fontSizes.extraSmall,
    marginLeft: spacing.semiMedium,
    color: UIColors.secondaryText,
    backgroundColor: 'white',
    paddingStart: spacing.semiMedium,
  },
  textInputView: {
    alignSelf: 'stretch',
    width: inputWidth,
    flex: 1,
  },
  menuItemContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  menuItemText: {
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.medium,
    color: 'white',
  },
});


const textInputData = (item, props) => (

  <View style={[styles.valueContainer]}>
    <View style={[styles.inputMainView, { flex: 1 }]}>
      <CustomTextInput
        textInput={StyleSheet.flatten(styles.textInput)}
        inputView={StyleSheet.flatten(styles.textInputView)}
        placeholderTextColor={UIColors.defaultTextColor}
        returnKeyType={'next'}
        keyboardType={'numeric'}
        value={item.stake}
        onChangeText={text => props.onChangeText(text, item)}
        autoCapitalize="none"
      />
      {/* {props.isUpdateData === true && */}

      <View style={{
        flex: 1,
        // backgroundColor: 'red',
        height: itemSizes.defaultButtonHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Text> {item.stake ? (((item.stake * item.odds)>props.walletLimit) ? `Return:${props.walletLimit}` : `Return:${(item.stake * item.odds).toFixed(2)}`) : 'Return: 0.00'}</Text>
      </View>
      {/* } */}

    </View>
  </View>
);


const SingleBetSlipContainer = (props) => {
  const { menuItems } = props;
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container]}>
        {menuItems.length > 0 &&
          <FlatList
            extraData={props}
            data={menuItems}
            renderItem={({ item, index }) => (
              <View>
                <TitleRow
                  index={index}
                  item={item}
                  onPressRow={value => props.onPressRow(value, item)}
                />
                {textInputData(item, props)}
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        }
      </View>
      { menuItems &&
        menuItems.length > 0 &&
        <TouchableHold
          style={styles.menuItemContainer}
          onTouch={() => props.onPlaceBet()}
        >
        {/* <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => props.onPlaceBet()}
        > */}
          <Text style={styles.menuItemText}>{'Place bet'}</Text>
        </TouchableHold>
      }
    </View >
  );
};

SingleBetSlipContainer.propTypes = {
};

SingleBetSlipContainer.defaultProps = {
};

export default SingleBetSlipContainer;

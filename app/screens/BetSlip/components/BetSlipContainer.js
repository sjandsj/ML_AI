
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../../actions/index';
import TitleRow from './TitleRow';
import TouchableHold from '../../../components/TouchableHold';
import NumberInput from './NumberInput';
import { UIColors, spacing, fontWeights, fontSizes, itemSizes } from '../../../utils/variables';
import CustomTextInput from '../../../components/CustomTextInput';
const inputWidth = '90%';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: spacing.semiMedium,
  },
  bottomHeadercontainer: {
    backgroundColor: 'lightgray',
    marginTop: spacing.semiMedium,
    borderBottomColor: UIColors.newAppButtonGreenBackgroundColor,
    borderBottomWidth: 3,
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
    paddingStart: spacing.medium,
  },

  inputMainView: {
    alignSelf: 'stretch',
    height: itemSizes.itemWidth45,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  textInput: {
    height: itemSizes.itemWidth45,
    fontSize: fontSizes.extraSmall,
    marginLeft: spacing.semiMedium,
    color: UIColors.secondaryText,
    borderBottomWidth: 1,
    // fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    alignSelf: 'stretch',
    width: inputWidth,
  },
  menuItemContainer: {
    // flexDirection: 'row',
    margin: itemSizes.item10,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  menuItemDisbleContainer: {
    margin: itemSizes.item10,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    opacity: 0.4,
  },
  menuItemText: {
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.medium,
    color: 'white',
  },
});

const betDataContainer = (title, value, isUpdate) => (
  <View style={[styles.itemContainer, { paddingVertical: spacing.mediumLarge }]}>
    <View style={styles.titleContainer}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
    <View style={[styles.valueContainer, isUpdate ? { backgroundColor: 'white' } : null]}>
      <Text style={[styles.textStyle]}>{value}</Text>
    </View>
  </View>
);

const totalStackContainer = (title, props, isUpdate) => (
  <View style={styles.itemContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
    <View style={[styles.valueContainer, isUpdate ? { backgroundColor: 'white' } : null]}>
      <View style={styles.inputMainView}>
        <CustomTextInput
          textInput={StyleSheet.flatten(styles.textInput)}
          inputView={StyleSheet.flatten(styles.textInputView)}
          placeholderTextColor={UIColors.defaultTextColor}
          returnKeyType={'next'}
          keyboardType={'numeric'}
          value={props.totalStacks}
          onChangeText={(text) => props.onChangeText(text, 'totalStacks')}
          autoCapitalize="none"
        />
      </View>
    </View>
  </View>
);

const paymentContainer = (title, value) => (
  <View style={styles.itemContainer}>
    <View style={styles.titleContainer}>
      <Text style={[styles.paymenttextStyle]}>{title}</Text>
    </View>
    <View style={[styles.valueContainer]}>
      <Text style={[styles.paymenttextStyle]}>{`${value}`}</Text>
    </View>
  </View>
);


const BetSlipContainer = (props) => {
  const { menuItems, netOddsForComboBet, foldsInBetSlip, totalStacks, betSlipsOddsChanged } = props;
  const totalgain = totalStacks * netOddsForComboBet;
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container]}>
        {menuItems.length > 0 &&
          <FlatList
            data={menuItems}
            renderItem={({ item, index }) => (
              <TitleRow
                index={index}
                item={item}
                betSlipsOddsChanged={betSlipsOddsChanged}
                onPressRow={value => props.onPressRow(value, item)}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        }
      </View>
      {menuItems.length > 0 &&

        <View style={[styles.bottomHeadercontainer, {
          margin: spacing.semiMedium,
        }]}>
          {betDataContainer('Number of selected events', foldsInBetSlip, false)}
          {betDataContainer('Number of bets', menuItems.length, false)}
          {/* {betDataContainer('Stakes per bets', '2.00', true)} */}
          {totalStackContainer('Total stakes', props, true)}
          {betDataContainer('Max. coefficient', netOddsForComboBet.toFixedSpecial(2), false)}
          {betDataContainer('Max. gain', ((totalgain>props.walletLimit) ? props.walletLimit : totalgain.toFixedSpecial(2)), false)}
          {paymentContainer('Payment', totalStacks)}
        </View>
      }
      {menuItems.length > 0 &&
        <TouchableHold
          style={[menuItems.length === 1 ? styles.menuItemDisbleContainer : styles.menuItemContainer]}
          onTouch={() => props.onPlaceBet()}
          disabled={(menuItems.length === 1)}
        >
        {/* <TouchableOpacity
          style={[menuItems.length === 1 ? styles.menuItemDisbleContainer : styles.menuItemContainer]}
          onPress={() => props.onPlaceBet()}
          disabled={(menuItems.length === 1)}
        > */}
          <Text style={styles.menuItemText}>{'Place bet'}</Text>
        </TouchableHold>
      }
    </View>
  );
};

Number.prototype.toFixedSpecial = function (n) {
  var str = this.toFixed(n);
  if (str.indexOf('e+') === -1)
    return str;

  // if number is in scientific notation, pick (b)ase and (p)ower
  str = str.replace('.', '').split('e+').reduce(function (p, b) {
    return p + Array(b - p.length + 2).join(0);
  });

  if (n > 0)
    str += '.' + Array(n + 1).join(0);

  return str;
};

BetSlipContainer.propTypes = {
};

BetSlipContainer.defaultProps = {
};

export default BetSlipContainer;

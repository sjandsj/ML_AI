/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../../../assets/images';

import {
  UIColors, fontSizes, fontWeights, itemSizes, spacing,
} from '../../../utils/variables';


const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
  },
  menuItemText: {
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.medium,
    color: UIColors.newAppButtonGreenBackgroundColor,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: fontSizes.extraSmall,
  },
  oddsupdatetextStyle: {
    flex: 1,
    textAlign: 'center',
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontSize: fontSizes.extraSmall,
  },
  rowContainer: {
    flexDirection: 'row',
    height: itemSizes.itemSizes35,
  },
  headerTextView: {
    width: '100%',
    height: itemSizes.itemSizes35,
    flexDirection: 'row',
    paddingVertical: spacing.extraSmall,
    alignItems: 'center',
  },
});

const getIcon = (sportName) => {
  switch (sportName) {
    case 'Soccer':
      return images.footballIcon;
    case 'Basketball':
      return images.basketballIcon;
    case 'Handball':
      return images.handballIcon;
    case 'Volleyball':
      return images.gameIcon;
    case 'Ice Hockey':
      return images.icehokeyIcon;
    case 'Tennis':
      return images.tennisIcon;
    default:
      break;
  }
}

const TitleRow = (props) => {
  const { item, onPressRow, betSlipsOddsChanged } = props;
  return (
    <View style={{
      flex: 1, paddingHorizontal: spacing.semiMedium,
    }}>
      <View
        style={styles.menuItemContainer}
      // onPress={() => onPressRow(item)}
      >
        <Image style={{width: 20, height: 20, marginRight: 10}} source={getIcon(item.sport.name)}></Image>
        <Text style={[styles.menuItemText, { flex: 2 }]}>{item.matchName}</Text>
        <TouchableOpacity
          style={{ flex: 0.2 }}
          onPress={() => onPressRow(item)}
        >
          <Image style={{ width: itemSizes.item25, height: itemSizes.item25 }} source={images.CrossRed} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.headerTextView}>
          <Text
            numberOfLines={1}
            style={
              [styles.textStyle, {
                flex: 2, textAlign: 'left',
              }]
            }
          >
            {item.marketName}
          </Text>
          <Text
            numberOfLines={1}
            style={
              [styles.textStyle]
            }
          >
            {`${item.name} ${(item.handicap===null) ? '' : item.handicap}`}
          </Text>
          <Text
            numberOfLines={1}
            style={
              [betSlipsOddsChanged === true ? styles.oddsupdatetextStyle : styles.textStyle]
            }
          >
            {item.odds}
          </Text>
        </View>

      </View>

    </View>
  );
};

TitleRow.propTypes = {
  item: PropTypes.object,
  betSlipsOddsChanged: PropTypes.bool,
  onPressRow: PropTypes.func,
};

TitleRow.defaultProps = {
  item: {},
  betSlipsOddsChanged: false,
  onPressRow: () => { },
};

export default TitleRow;

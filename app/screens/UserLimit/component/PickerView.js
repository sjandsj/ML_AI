import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { userLimitConstants } from '../../../utils/constants';
import { fontName, UIColors, fontSizes, spacing, itemSizes } from '../../../utils/variables';
import PickerComponent from '../../../components/PickerComponent';
import { limits } from '../../../utils/enum';
import { isIOS } from '../../../utils/platformSpecific';
import { userLimitsLocalizeStrings } from '../../../localization/userLimitLocalizeStrings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
    borderRadius: spacing.extraSmall,
    borderColor: UIColors.defaultBlack,
    borderWidth: spacing.border,
    margin: spacing.small,
  },
  titleTextStyle: {
    fontFamily: fontName.sourceSansProRegular,
    color: UIColors.defaultWhite,
    fontSize: fontSizes.small,
    textAlign: 'center',
    paddingTop: spacing.extraSmall,
  },
  amountPickerStyle: {
    flex: 1,
  },
  amountButtonsStyle: {
    // flex: 1,
    marginVertical: itemSizes.extraSmallButtonHeight,
    marginHorizontal: spacing.semiMedium,
    justifyContent: 'center',
  },
  mainPickerViewStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  amountActionButtonStyle: {
    // flex: 0.5,
    borderRadius: spacing.extraSmall,
    borderColor: UIColors.defaultBlack,
    borderWidth: spacing.borderDouble,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
  },
  currencyTextStyle: {
    textAlign: 'center',
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.defaultWhite,
    fontSize: fontSizes.medium,
  },
  currencyTextViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AmountContainer = (props) => {
  const { isPortraitView } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>
        {userLimitsLocalizeStrings.selectTime} ({userLimitConstants.MINUTES})
      </Text>
      <View style={styles.mainPickerViewStyle}>
        <View style={[styles.amountPickerStyle, { marginTop: isIOS ? 0 : 0 }]}>
          <PickerComponent
            topMargin={0}
            selectedItem={props.selectedIndex}
            onPickerSelect={(index, item) => props.onStakePickerSelect(index, item)}
            pickerList={props.stake}
            itemAlign={isIOS ? 'center' : 'center'}
            marginLeft={isIOS ? 0 : 0}
          />
        </View>
        <View style={[styles.amountButtonsStyle, { flex: isPortraitView ? 1 : 1 }]}>
          <TouchableOpacity
            style={[styles.amountActionButtonStyle, { backgroundColor: UIColors.success }]}
            onPress={() => props.onSelectButtonPress()}
          >
            <Text>{userLimitConstants.SELECT}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.amountActionButtonStyle, { backgroundColor: UIColors.danger, marginTop: itemSizes.iconSmall }]}
            onPress={() => props.onCancelButtonPress()}

          >
            <Text>{userLimitConstants.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

AmountContainer.propTypes = {
  onCancelButtonPress: PropTypes.func,
  onSelectButtonPress: PropTypes.func,
  onStakePickerSelect: PropTypes.func,
  selectedLimitType: PropTypes.string,
  selectedIndex: PropTypes.number,
  stake: PropTypes.array,
};

AmountContainer.defaultProps = {
  onCancelButtonPress: () => {},
  onSelectButtonPress: () => {},
  onStakePickerSelect: () => {},
  selectedLimitType: '',
  selectedIndex: null,
  stake: [],

};

export default AmountContainer;

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ScaleSlide } from 'react-native-animation-effects';
import { UIColors, spacing } from '../../../utils/variables';
import CreateUserLimit from './CreateUserLimit';
import PickerView from './PickerView';
import { isPortrait } from '../../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.secondary,
  },
  containerPicker: {
    borderRadius: spacing.extraSmall,
    borderColor: UIColors.defaultBlack,
    flex: 1,
    // backgroundColor: UIColors.focused,
  },
  containerView: {
    // borderRadius: spacing.extraSmall,
    // borderColor: UIColors.defaultBlack,
    // borderWidth: spacing.borderDouble,
    flex: 1,
  },
  scaleSlide: {
    flex: 1,
  },
});

const LimitSetting = (props) => {
  const { screenOrientation } = props;
  const isPortraitView = isPortrait(screenOrientation);
  return (
    <View style={[styles.container, isPortraitView ? { flexDirection: 'column' } : { flexDirection: 'row' }]}>
      <View style={styles.containerView}>
        <CreateUserLimit {...props} />
      </View>
      {props.showStakePicker &&
      <View style={styles.containerPicker}>
        <ScaleSlide style={styles.scaleSlide}>
          <PickerView
            onSelectButtonPress={() => props.onSelectButtonPress()}
            onCancelButtonPress={() => props.onCancelButtonPress()}
            selectedIndex={props.selectedIndex}
            onStakePickerSelect={props.onStakePickerSelect}
            stake={props.stake}
            selectedLimitType={props.selectedLimitType}
            isPortraitView={isPortraitView}
          />
        </ScaleSlide>
      </View>
  }
    </View>
  );
};

LimitSetting.propTypes = {
  onCancelButtonPress: PropTypes.func,
  onSelectButtonPress: PropTypes.func,
  onStakePickerSelect: PropTypes.func,
  selectedLimitType: PropTypes.string,
  selectedIndex: PropTypes.number,
  stake: PropTypes.array,
  showStakePicker: PropTypes.bool,
  screenOrientation: PropTypes.object,
};

LimitSetting.defaultProps = {
  onCancelButtonPress: () => {},
  onSelectButtonPress: () => {},
  onStakePickerSelect: () => {},
  selectedLimitType: '',
  selectedIndex: null,
  stake: [],
  showStakePicker: false,
  screenOrientation: {},

};

export default LimitSetting;

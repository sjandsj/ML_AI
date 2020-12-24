import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../../actions';
import LimitSetting from './LimitSetting';
import { UIColors } from '../../../utils/variables';
import { limits } from '../../../utils/enum';
import { isIOS } from '../../../utils/platformSpecific';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: UIColors.secondary,
  },
});
class LimitContainer extends Component {
  onSelectButtonPress() {
    this.props.onClickContinueWithPassword();
  }

  onCancelButtonPress() {
    this.props.cancelSelection();
  }

  render() {
    const { userLimit, screenOrientation } = this.props;
    const isShowStakePicker = userLimit.selectedLimitType === limits.BET
    || userLimit.selectedLimitType === limits.DEPOSIT
    || userLimit.selectedLimitType === limits.REMINDER;

    return (
      <SafeAreaView style={styles.container}>
        <LimitSetting
          stake={userLimit.pickerAmount}
          screenOrientation={screenOrientation}
          onSelectButtonPress={() => this.onSelectButtonPress()}
          onCancelButtonPress={() => this.onCancelButtonPress()}
          selectedIndex={userLimit.selectedIndex}
          onStakePickerSelect={(index) => {
            const indexValue = isIOS ? index : index.position;
            const itemValue = userLimit.pickerAmount[indexValue];
            this.props.onSelectPickerValue(indexValue, itemValue.name);
          }}
          selectedLimitType={userLimit.selectedLimitType}
          showStakePicker={isShowStakePicker}
        />
      </SafeAreaView>
    );
  }
}

LimitContainer.propTypes = {
  setUserLimitRequest: PropTypes.func,
  getUserLimitRequest: PropTypes.func,
  setTypeOfLimit: PropTypes.func,
  isLoading: PropTypes.bool,
  userLimit: PropTypes.object,
  cancelSelection: PropTypes.func,
  onSelectPickerValue: PropTypes.func,
  onClickContinueWithPassword: PropTypes.func,
  screenOrientation: PropTypes.string,
};

LimitContainer.defaultProps = {
  setUserLimitRequest: () => { },
  getUserLimitRequest: () => { },
  setTypeOfLimit: () => { },
  isLoading: false,
  userLimit: {},
  cancelSelection: () => { },
  onSelectPickerValue: () => { },
  onClickContinueWithPassword: () => { },
  screenOrientation: '',
};

const mapStateToProps = state => ({
  userLimit: state.getUserLimit,
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;

const LimitContainerScreen = connect(mapStateToProps, mapDispatchToProps)(LimitContainer);

export default LimitContainerScreen;


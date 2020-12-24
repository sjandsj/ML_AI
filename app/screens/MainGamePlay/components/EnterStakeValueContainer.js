import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import NavigationBar from '../../../components/NavigationBar';
import { UIColors, itemSizes, fontSizes, spacing, fontName } from '../../../utils/variables';
import CustomTextInput from '../../../components/CustomTextInput';
import { betSlipLocalizeString } from '../../../localization/betSlipLocalizeStrings';
import { betSlipConstants, ReturnKeyType, KeyboardType } from '../../../utils/constants';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';

const inputWidth = '90%';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppFontWhiteColor,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  subContainer: {
    flex: 1,
  },
  textInputView: {
    alignSelf: 'stretch',
    width: inputWidth,
  },
  textInput: {
    height: itemSizes.defaultButtonHeight,
    fontSize: fontSizes.small,
    marginLeft: spacing.semiMedium,
    color: UIColors.newAppFontBlackColor,
    borderBottomWidth: 1,
    fontFamily: fontName.sourceSansProRegular,
  },
});

let stakeValue = null;
class EnterStakeValueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stake: null,
    };
  }

  onChangeStakeText(stake) {
    stakeValue = stake;
    this.setState({ stake });
  }

  onSubmitEditing(key) {
    try {
      switch (key) {
        case betSlipConstants.stake:
          this.props.onStakeValueSubmit(stakeValue, this.props.betSlipId);
          this.props.hideEnterStakeContainer();
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(commonLocalizeStrings.error, error);
    }
  }


  getTextInputReference(key, reference) {
    switch (key) {
      case betSlipConstants.stake:
        this.stake = reference;
        break;
      default:
        break;
    }
  }

  backButtonAction() {
    this.props.navigation.pop();
  }


  render() {
    const { hideEnterStakeContainer } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <NavigationBar
          showBackButton
          backButtonAction={() => {
            hideEnterStakeContainer();
          }}
          backgroundColor={'transparent'}
        />
        <View style={styles.subContainer}>
          <CustomTextInput
            textInput={StyleSheet.flatten(styles.textInput)}
            inputView={StyleSheet.flatten(styles.textInputView)}
            placeholderTextColor={UIColors.defaultTextColor}
            placeholder={betSlipLocalizeString.enterStakeAmount}
            inputKey={betSlipConstants.stake}
            getTextInputReference={(key, reference) =>
              this.getTextInputReference(key, reference)}
            keyboardType={KeyboardType.numeric}
            value={this.state.stake}
            returnKeyType={ReturnKeyType.done}
            onChangeText={value => this.onChangeStakeText(value)}
            onSubmitEditing={key => this.onSubmitEditing(key)}
            autoFocus
          />
        </View>
      </SafeAreaView>
    );
  }
}

EnterStakeValueContainer.propTypes = {
  navigation: PropTypes.object,
  hideEnterStakeContainer: PropTypes.func,
  onStakeValueSubmit: PropTypes.func,
  betSlipId: PropTypes.string,
};

EnterStakeValueContainer.defaultProps = {
  navigation: {},
  hideEnterStakeContainer: () => {},
  betSlipId: '',
  onStakeValueSubmit: () => {},
};

export default EnterStakeValueContainer;


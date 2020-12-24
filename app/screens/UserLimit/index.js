import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { UIColors } from '../../utils/variables';
import { limits } from '../../utils/enum';
import Header from '../../components/Header';
import Content from './component/Content';
import { realityCheckLocalizeString } from '../../localization/realityCheckLocalizeString';
import LimitContainer from './component/LimitContainer';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
});

class UserLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showConfirmationBox: false,
      // password: '',
      // emptyPassword: false,
    };
  }

  componentDidMount() {
    this.props.getUserLimitRequest();
  }

  /* Action called when left navigation button is clicked */
  onLeftButtonClicked() {
    this.props.navigation.pop();
  }

  /* Action called when right navigation button is clicked */
  onRightButtonClicked() {
  }

  onClickContinue() {
    const stakeValue = Number(this.props.userLimit.selectedStake);
    let valueToSubmit;
    const { selectedLimitType } = this.props.userLimit;
    switch (selectedLimitType) {
      case limits.REMINDER:
        valueToSubmit = {
          reality_check_limit: {
            range: `${stakeValue} minutes`,
          },
          // zone_name: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        break;
      default:
        break;
    }
    this.props.setUserLimitRequest(valueToSubmit);
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  render() {
    const { screenProps } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={realityCheckLocalizeString.realityCheck}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <Content
          screenOrientation={screenProps.orientation}
          isPortraitView={screenProps.isPortrait}
        />
        <LimitContainer
          screenOrientation={screenProps.orientation}
          onClickContinueWithPassword={() => this.onClickContinue()}
          onPickerClose={() => {}}
          // password={this.state.password}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}    
      </View>
    );
  }
}

UserLimit.propTypes = {
  getUserLimitRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  setUserLimitRequest: PropTypes.func,
  userLimit: PropTypes.object,
  screenProps: PropTypes.objectOf(PropTypes.any),

};

UserLimit.defaultProps = {
  getUserLimitRequest: () => { },
  isLoading: false,
  navigation: {},
  setUserLimitRequest: () => { },
  userLimit: {},
  screenProps: {},
};

const mapStateToProps = state => ({
  userLimit: state.getUserLimit,
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;

const UserLimitScreen = connect(mapStateToProps, mapDispatchToProps)(UserLimit);

export default UserLimitScreen;


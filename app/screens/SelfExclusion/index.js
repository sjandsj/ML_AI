
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../../components/Header';
import Content from './components/Content';
import PeriodSelection from './components/PeriodSelection';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import { selfExclusionLocalizeString } from '../../localization/selfExclusionLocalizeString';
import { UIColors } from '../../utils/variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
});
class SelfExclusion extends Component {
  componentDidMount() {
    this.props.getSettingsRequest();
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={selfExclusionLocalizeString.navigationTitle}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <Content />
        <PeriodSelection
          isPortrait={this.props.screenProps.isPortrait}
          periodList={this.props.settings
            && this.props.settings.message
            && this.props.settings.message.limits
            && this.props.settings.message.limits.timeout_limit.periods}
          onPressContinue={(selectedItem) => {
            const valueToSubmit = {
              timeout_limit: {
                range: selectedItem,
              },
              // zone_name: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
            this.props.setUserLimitRequest(valueToSubmit);
          }}
        />
        {this.props.isLoading && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

SelfExclusion.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  setUserLimitRequest: PropTypes.func,
  isLoading: PropTypes.bool,
  getSettingsRequest: PropTypes.func,
  settings: PropTypes.object,
  screenProps: PropTypes.object,
};

SelfExclusion.defaultProps = {
  navigation: {},
  setUserLimitRequest: () => {},
  isLoading: false,
  getSettingsRequest: () => {},
  settings: {},
  screenProps: {},
};

const mapStateToProps = state => ({
  isLoading: state.loaderReducers.isLoading,
  settings: state.getSettings.settingsData,
});

const mapDispatchToProps = () => UserActions;

const SelfExclusionScreen = connect(mapStateToProps, mapDispatchToProps)(SelfExclusion);

export default SelfExclusionScreen;

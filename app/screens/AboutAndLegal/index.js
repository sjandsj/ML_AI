import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AboutAndLegalContainer from './Components/Container';
import Navigation from '../../utils/navigation';
import { SCREENS } from '../../utils/av_constants';
import { getPrivacyPolicyUrl, getTermOfUseUrl, getRulesUrl } from '../../api/urls';
import { authenticationLocalizedString } from '../../localization/authenticationLocalizeStrings';

export default class AboutAndLegal extends Component {
  openPrivacyPolicy() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getPrivacyPolicyUrl, name: authenticationLocalizedString.privacyPolicy } });
  }

  openTermOfUse() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getTermOfUseUrl, name: authenticationLocalizedString.termsOfUse } });
  }

  openRules() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WEBVIEW_SCREEN, { data: { url: getRulesUrl, name: authenticationLocalizedString.rules } });
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  render() {
    return (
      <AboutAndLegalContainer
        backButtonAction={() => this.backButtonAction()}
        openPrivacyPolicy={this.openPrivacyPolicy}
        openTermOfUse={this.openTermOfUse}
        openRules={this.openRules}
      />
    );
  }
}

AboutAndLegal.propTypes = {
  navigation: PropTypes.func,
};

AboutAndLegal.defaultProps = {
  navigation: {},
};


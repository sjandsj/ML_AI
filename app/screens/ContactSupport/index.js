
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../../components/NavigationBar';
import Loader from '../../components/Loader';
import Utils from '../../utils/utils';
import { openMail } from '../../utils/openMail';
import { UIColors, spacing, fontName, fontSizes, fontWeights } from '../../utils/variables';
import { contactSupportLocalizeString } from '../../localization/contactSupportLocalizeString';
import UserActions from '../../actions';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: UIColors.primaryText,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  emailText: {
    margin: spacing.large,
    color: UIColors.secondaryText,
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  emailButton: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    padding: spacing.medium,
  },
  textStyle: {
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProSemiBold,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
});

class ContactSupport extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      showLoader: false,
    };
  }

  componentDidMount() {
    this.props.getSettingsRequest();
  }


  loaderFunction(state) {
    this.setState({
      showLoader: state,
    });
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavigationBar
          title={contactSupportLocalizeString.contactSupport}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <View style={styles.container}>
          <Text style={styles.emailText}>{this.props.supportEmail}</Text>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={() => openMail(this.props.supportEmail)}
          >
            <Text style={styles.textStyle}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.showLoader && <Loader isAnimating={this.state.showLoader} />}
      </SafeAreaView>
    );
  }
}

ContactSupport.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  supportEmail: PropTypes.string,
  getSettingsRequest: PropTypes.func,
};

ContactSupport.defaultProps = {
  navigation: {},
  supportEmail: '',
  getSettingsRequest: () => {},
};

const mapStateToProps = state => ({
  isLoading: state.loaderReducers.isLoading,
  settings: state.getSettings.settingsData,
  supportEmail: state.getSettings.supportEmail,
});

const mapDispatchToProps = () => UserActions;

const ContactSupportScreen = connect(mapStateToProps, mapDispatchToProps)(ContactSupport);

export default ContactSupportScreen;


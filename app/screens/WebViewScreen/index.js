
import React, { Component } from 'react';
import {
  WebView,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import NavigationBar from '../../components/NavigationBar';
import Loader from '../../components/Loader';
import { UIColors } from '../../utils/variables';
import { currentAppVersion } from '../../config/appConfig';

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
  subcontainer: {
    flex: 1,
    overflow: 'hidden',
  },
  webView: {
    backgroundColor: UIColors.newAppBackgroundColorWhite,
    flex: 1,
  },
});

class WebViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      loadUrl: props.loadUrl ? props.loadUrl : props.navigation.state.params.data.url,
      header: props.header ? props.header : props.navigation.state.params.data.name,
    };
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
          title={this.state.header}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <View style={styles.subcontainer}>
          <WebView
            source={{ uri: this.state.loadUrl, headers: {'APK-VERSION': `${currentAppVersion}`} }}
            style={styles.webView}
            scalesPageToFit
            onLoadStart={() => this.loaderFunction(true)}
            onLoadEnd={() => this.loaderFunction(false)}
          />
          {this.state.showLoader && <Loader isAnimating={this.state.showLoader} />}
        </View>
      </SafeAreaView>
    );
  }
}

WebViewScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
};

WebViewScreen.defaultProps = {
  navigation: {},
};

export default WebViewScreen;

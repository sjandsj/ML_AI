
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Utils from '../../utils/utils';
import Header from '../../components/Header';
import s from '../../utils/constants';
import { isResponseValid } from '../../utils/utils_functions';
import { token_expire } from '../../utils/message';
import Loader from '../../components/Loader';
import ResolvedPlay from './components/ResolvedPlay';
import { UserData } from '../../utils/global';
import { sideMenuLocalizeStrings } from '../../localization/sideMenuLocalizeStrings';
import { profileLocalizeString } from '../../localization/profileLocalizeStrings';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import { selectedTab } from '../../utils/enum';
import TopTabBar from '../../components/TopTabBar';

const _ = require('lodash');

const grandTotalForSingle = {
  won: 0,
  lost: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ResolvedPlays extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      showSessionExpireAlert: false,
      bets: [],
      selectedTab: selectedTab.SINGLE,
    };
  }

  componentDidMount() {
    this.getBets();
    this.getComboBets();
  }

  componentWillReceiveProps(nextProps) {
    if (isResponseValid(nextProps.getBetsResponse)) {
      const bets = nextProps.getResolvedBetsState.resolvedBets;
      this.setBetsValue(bets);
      this.props.resetPendingBets();
    } else {
      this.handleApiResponse(nextProps.getBetsResponse, () => {
        this.props.resetPendingBets();
      });
    }
  }

  componentWillUnmount() {
  }

  onTabPress = (tab, index) => {
    let tabOnSelect;
    if (index === 0) {
      tabOnSelect = selectedTab.SINGLE;
    } else {
      tabOnSelect = selectedTab.COMBO;
    }
    this.setState({
      selectedTab: tabOnSelect,
    });
  }

  setBetsValue(bets) {
    let wonStake = 0;
    let lostStake = 0;
    _.forEach(bets, (bet) => {
      if (bet.status === 'won' && bet.stake && bet.odds) {
        wonStake += (bet.odds * bet.stake);
      } else if (bet.status === 'lost' && bet.stake) {
        lostStake += bet.stake;
      }
    });
    wonStake = wonStake.toFixed(2);
    lostStake = lostStake.toFixed(2);
    grandTotalForSingle.won = wonStake;
    grandTotalForSingle.lost = lostStake;
    this.setState({
      bets,
    }, () => this.props.resetPendingBets());
  }

  getBets() {
    const { accessToken } = UserData;
    const data = {
      page: 0,
      perPage: 20,
    };
    this.props.getResolvedBets(
      accessToken,
      data,
    );
  }

  getComboBets() {
    const { accessToken } = UserData;
    const data = {
      page: 0,
      perPage: 20,
    };
    this.props.getResolvedComboBets(
      accessToken,
      data,
    );
  }

  _handleRefresh() {
    this.getBets();
    this.getComboBets();
  }

  handleApiResponse(apiResponse, callback) {
    if (apiResponse.response && apiResponse.status >= 400) {
      if (apiResponse.status === 401 && !this.state.showSessionExpireAlert) {
        this.setState({
          showSessionExpireAlert: true,
        });
        Alert.alert(
          commonLocalizeStrings.alert,
          token_expire,
          [
            {
              text: commonLocalizeStrings.ok,
              onPress: () => {
                this.logout();
              },
            },
          ],
        );
        callback();
        return;
      }
      if (apiResponse.response.message &&
        typeof apiResponse.response.message === 'string') {
        Alert.alert(commonLocalizeStrings.error, apiResponse.response.message);
        callback();
        return;
      }

      if (apiResponse.response.message &&
        typeof apiResponse.response.message === 'object') {
        Alert.alert(commonLocalizeStrings.error, apiResponse.response.message[0]);
        callback();
        return;
      }
      Alert.alert(commonLocalizeStrings.error, profileLocalizeString.internalError);
      callback();
    }
  }

  logout() {
    this.utils.deleteItem(s.APP_ACCESS_TOKEN);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'WelcomeScreen', params: { isPortrait: this.state.isPortrait, screenOrientation: this.state.screenOrientation } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  handleLoadMore = () => {
    const { accessToken } = UserData;
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.getResolvedBetsState.meta;
    if (current_page !== total_pages && !this.props.getResolvedBetsState.isLoading) {
      const data = {
        page: next_page,
        perPage: 20,
      };
      this.props.getResolvedBets(
        accessToken,
        data,
      );
    }
  };

  handleLoadMoreComboBet = () => {
    const { accessToken } = UserData;
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.getResolvedBetsState.resolvedComboMeta;
    if (current_page !== total_pages && !this.props.getResolvedBetsState.isLoadingResolvedCombo) {
      const data = {
        page: next_page,
        perPage: 20,
      };
      this.props.getResolvedComboBets(
        accessToken,
        data,
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={sideMenuLocalizeStrings.resolvedBets}
          backButtonAction={() => this.backButtonAction()}
        />
        <TopTabBar
          onTabSelect={this.onTabPress}
        />
        <ResolvedPlay
          isPortrait={this.props.screenProps.isPortrait}
          bets={this.state.bets}
          comboBets={this.props.getResolvedBetsState.resolvedComboBets}
          selectedTab={this.state.selectedTab}
          handleLoadMore={() => this.handleLoadMore()}
          handleLoadMoreComboBet={() => this.handleLoadMoreComboBet()}
          _handleRefresh={() => this._handleRefresh()}
        />
        {this.props.isLoading
          && <Loader isAnimating={this.props.isLoading} />}
      </View>
    );
  }
}

ResolvedPlays.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any),
  getResolvedBets: PropTypes.func,
  getResolvedBetsState: PropTypes.object,
  getBetsResponse: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  resetPendingBets: PropTypes.func,
  screenProps: PropTypes.object,
};

ResolvedPlays.defaultProps = {
  navigation: {},
  getResolvedBets: () => {},
  getResolvedBetsState: {},
  getBetsResponse: {},
  isLoading: false,
  resetPendingBets: () => {},
  screenProps: {},
};

const mapStateToProps = state => ({
  getResolvedBetsState: state.getResolvedBets,
  getBetsResponse: state.getResolvedBets.getResolvedBetsResponse,
  isLoading: state.getResolvedBets.isLoading,
});

const mapDispatchToProps = () => UserActions;

const ResolvedPlaysScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResolvedPlays);

export default ResolvedPlaysScreen;

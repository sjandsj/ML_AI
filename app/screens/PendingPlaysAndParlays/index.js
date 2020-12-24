
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Header from '../../components/Header';
import { UIColors } from '../../utils/variables';
import Games from './components/Games';
import PagingLoader from '../../components/PagingLoader';
import { sideMenuLocalizeStrings } from '../../localization/sideMenuLocalizeStrings';
import { selectedTab } from '../../utils/enum';
import TopTabBar from '../../components/TopTabBar';
import { UserData } from '../../utils/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppGrayContentColor,
  },
});

class PendingPlaysAndParlays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: selectedTab.SINGLE,
    };
  }
  componentDidMount() {
    this.getSingleBets();
    this.getComboBets();
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

  getSingleBets() {
    const data = {
      page: 0,
      perPage: 20,
      scope: 'pending',
    };
    this.props.getBetsRequest(data);
  }

  getComboBets() {
    const { accessToken } = UserData;
    const data = {
      page: 0,
      perPage: 20,
    };
    this.props.getPendingComboBets(
      accessToken,
      data,
    );
  }

  betCashout(data, betType) {
    this.props.postCashoutBetRequest(data, betType);
  }

  _handleRefresh() {
    this.getSingleBets();
    this.getComboBets();
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  handleLoadMore = () => {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.mainGamePlay.meta;
    if (current_page !== total_pages && !this.props.mainGamePlay.isLoadingGetBets) {
      const data = {
        page: next_page,
        perPage: 20,
        scope: 'pending',
      };
      this.props.getBetsRequest(data);
    }
  };

  handleLoadMoreComboBets = () => {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.getPendingBetsState.pendingComboMeta;
    if (current_page !== total_pages && !this.props.getPendingBetsState.isLoadingPendingCombo) {
      const data = {
        page: next_page,
        perPage: 20,
      };
      const { accessToken } = UserData;
      this.props.getPendingComboBets(accessToken, data);
    }
  };

  render() {
    const { isLoadingGetBets } = this.props.mainGamePlay;
    return (
      <View style={styles.container}>
        <Header
          title={sideMenuLocalizeStrings.pendingBets}
          backButtonAction={() => this.backButtonAction()}
        />
        <TopTabBar
          onTabSelect={this.onTabPress}
        />
        <Games
          isPortrait={this.props.screenProps.isPortrait}
          bets={this.props.mainGamePlay.betPlaced}
          title="PENDING PLAYS"
          handleLoadMore={() => this.handleLoadMore()}
          handleLoadMoreComboBets={() => this.handleLoadMoreComboBets()}
          _handleRefresh={() => this._handleRefresh()}
          comboBets={this.props.getPendingBetsState.pendingComboBets}
          selectedTab={this.state.selectedTab}
          betCashout={(data, betType) => this.betCashout(data, betType)}
        />
        {isLoadingGetBets
          && <PagingLoader isAnimating={isLoadingGetBets} />}
      </View>
    );
  }
}

PendingPlaysAndParlays.propTypes = {
  mainGamePlay: PropTypes.object,
  getBetsRequest: PropTypes.func,
  screenProps: PropTypes.object,
  navigation: PropTypes.object,
  getPendingBetsState: PropTypes.object,
  getPendingComboBets: PropTypes.func,
};

PendingPlaysAndParlays.defaultProps = {
  mainGamePlay: {},
  getBetsRequest: () => { },
  screenProps: {},
  navigation: {},
  getPendingBetsState: {},
  getPendingComboBets: () => {},
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  getPendingBetsState: state.getPendingBets,
});

const mapDispatchToProps = () => UserActions;

const PendingPlaysAndParlaysScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingPlaysAndParlays);

export default PendingPlaysAndParlaysScreen;

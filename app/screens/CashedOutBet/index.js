
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

class CashedOutBet extends Component {
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
      scope: 'cashed_out',
    };
    this.props.getBetsRequest(data);
  }

  getComboBets() {
    const { accessToken } = UserData;
    const data = {
      page: 0,
      perPage: 20,
    };
    this.props.getCashoutComboBets(
      accessToken,
      data,
    );
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
        scope: 'cashed_out',
      };
      this.props.getBetsRequest(data);
    }
  };

  handleLoadMoreComboBets = () => {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.getPendingBetsState.cashoutComboMeta;
    if (current_page !== total_pages && !this.props.getPendingBetsState.isLoadingCashoutCombo) {
      const data = {
        page: next_page,
        perPage: 20,
      };
      const { accessToken } = UserData;
      this.props.getCashoutComboBets(accessToken, data);
    }
  };

  render() {
    const { isLoadingGetBets } = this.props.mainGamePlay;
    return (
      <View style={styles.container}>
        <Header
          title={sideMenuLocalizeStrings.cashedOutBets}
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
          comboBets={this.props.getPendingBetsState.cashoutComboBets}
          selectedTab={this.state.selectedTab}
        />
        {isLoadingGetBets
          && <PagingLoader isAnimating={isLoadingGetBets} />}
      </View>
    );
  }
}

CashedOutBet.propTypes = {
  mainGamePlay: PropTypes.object,
  getBetsRequest: PropTypes.func,
  screenProps: PropTypes.object,
  navigation: PropTypes.object,
  getPendingBetsState: PropTypes.object,
  getCashoutComboBets: PropTypes.func,
};

CashedOutBet.defaultProps = {
  mainGamePlay: {},
  getBetsRequest: () => { },
  screenProps: {},
  navigation: {},
  getPendingBetsState: {},
  getCashoutComboBets: () => {},
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  getPendingBetsState: state.getPendingBets,
});

const mapDispatchToProps = () => UserActions;

const CashedOutBetScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CashedOutBet);

export default CashedOutBetScreen;

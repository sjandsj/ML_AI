
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Utils from '../../utils/utils';
import HeaderContainer from '../../components/HeaderContainer';
import UserActions from '../../actions';
import TabsCell from './components/TabsCell';
import { SCREENS } from '../../utils/av_constants';
import { UIColors } from '../../utils/variables';
import SearchContainer from './components/SearchContainer';
import PagingLoader from '../../components/PagingLoader';
import CasinoList from './components/CasinoList';
import { UserData } from '../../utils/global';
import { showOptionAlert } from '../../utils/showAlert';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import FiltersContainer from './components/FiltersContainer';
import Navigation from '../../utils/navigation';
import { LiveCasinoCategories } from '../../utils/enum';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
  subcontainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

class LiveCasino extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    const data = {
      kind: 'live',
      menu_id: typeSelected.tabId,
      search: this.state.search,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
    };
    this.props.getLiveCasinoRequest(data);
  }

  onPressTab(tabType) {
    if (tabType.id === this.props.liveCasinoData.typeSelected) {
      return;
    }
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    this.setState({ search: '' });
    const tabData ={
      tabName: tabType.name,
      tabId: tabType.id,
    }
    this.props.setLiveProvidersSelect([]);
    this.props.liveCasinoOnTabSelect(tabData);
    const data = {
      page: 0,
      // live_casino: true,
      kind: 'live',
      menu_id: tabType.id,
      search: this.state.search,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
    };
    this.props.getLiveCasinoRequest(data);
  }

  onChangeText(text) {
    this.setState({ search: text });
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    const data = {
      //live_casino: true,
      kind: 'live',
      menu_id: typeSelected.tabId,
      search: this.state.search,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
    };
    this.props.getLiveCasinoRequest(data);
  }

  loginAction() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WELCOME_SCREEN);
  }

  gameRedirectAction(uuid) {
    if (UserData.BearerToken) {
      if (uuid) {
        this.props.getLiveCasinoInitGameSessionRequest(uuid);
      }
    } else {
      showOptionAlert(
        commonLocalizeStrings.alert,
        commonLocalizeStrings.pleaseLogin,
        commonLocalizeStrings.ok,
        commonLocalizeStrings.cancel,
        text => text === 0 && this.loginAction(),
      );
    }
  }

  refreshCasinoList() {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    const data = {
      //live_casino: true,
      kind: 'live',
      menu_id: typeSelected.tabId,
      search: this.state.search,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
    };
    this.props.getLiveCasinoRequest(data);
  }

  handleLoadMore = () => {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.liveCasinoData.meta;
    if (current_page !== total_pages && !this.props.liveCasinoData.isLoadingLiveCasinoList) {
      const data = {
        page: next_page,
        // live_casino: true,
        kind: 'live',
        menu_id: typeSelected.tabId,
        search: this.state.search,
        has_free_spin: freeSpinSelected,
        has_lobby: lobbySelected,
        is_mobile: mobileSelected,
        provider: providersSelected,
      };
      this.props.getLiveCasinoRequest(data);
    }
  };

  onPressCategoryButton(category) {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.liveCasinoData;
    const data = {
      // live_casino: true,
      kind: 'live',
      menu_id: typeSelected.tabId,
      page: 0,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
      search: this.state.search,
    };
    switch (category) {
      case LiveCasinoCategories.Free_spins:
        data.has_free_spin = freeSpinSelected ? '' : true;
        this.props.onLiveFreeSpinSelect();
        break;
      case LiveCasinoCategories.Lobby:
        data.has_lobby = lobbySelected ? '' : true;
        this.props.onLiveLobbySelect();
        break;
      case LiveCasinoCategories.Mobile:
        data.is_mobile = mobileSelected ? '' : true;
        this.props.onLiveMobileSelect();
        break;
      default:
        break;
    }
    this.props.getLiveCasinoRequest(data);
  }

  onPressFilter() {
    Navigation.sharedInstance().pushToScreen(SCREENS.FILTERS_PROVIDER_SCREEN, { data: { name: 'Filters', searchText: this.state.search, screen: SCREENS.LIVE_CASINO_SCREEN } });
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    const { isLoadingLiveCasinoList, isLoadingLiveCasinoGame } = this.props.liveCasinoData;
    return (
      <View style={styles.container}>
        <HeaderContainer
          showBackButton
          openMenu={() => this.props.navigation.openDrawer()}
          homeButtonAction={() => this.props.navigation.navigate(SCREENS.HOME_SCREEN)}
        />
        <SafeAreaView style={styles.subcontainer}>
          <TabsCell
            typesList={this.props.liveCasinoData.types}
            typeSelected={this.props.liveCasinoData.typeSelected}
            onPressTab={tabType => this.onPressTab(tabType)}
          />
          <SearchContainer
            onChangetext={text => this.onChangeText(text)}
            searchValue={this.state.search}
            onPressFilter={() => this.onPressFilter()}
          />
          <FiltersContainer
            categoryList={this.props.liveCasinoData.categoryFilters}
            currentState={this.state}
            renderList={data => this.renderList(data)}
            freeSpin={this.props.liveCasinoData.freeSpinSelected}
            lobby={this.props.liveCasinoData.lobbySelected}
            mobile={this.props.liveCasinoData.mobileSelected}
            onPressCategory={category => this.onPressCategoryButton(category)}
          />
          <View style={styles.listContainer}>
            <CasinoList
              isPortrait={isPortrait}
              itemsList={this.props.liveCasinoData.itemsList}
              handleLoadMore={() => this.handleLoadMore()}
              gameRedirectAction={uuid => this.gameRedirectAction(uuid)}
              refreshCasinoList={() => this.refreshCasinoList()}
              isLoadingLiveCasinoList={isLoadingLiveCasinoList}
            />
          </View>
        </SafeAreaView>
        {isLoadingLiveCasinoGame && <Loader isAnimating={isLoadingLiveCasinoGame} color={UIColors.defaultWhite} /> }
        {isLoadingLiveCasinoList && <PagingLoader isAnimating={isLoadingLiveCasinoList} color={UIColors.defaultWhite} />}
      </View>
    );
  }
}

LiveCasino.propTypes = {
  screenProps: PropTypes.object,
  liveCasinoData: PropTypes.object,
  navigation: PropTypes.object,
  getLiveCasinoRequest: PropTypes.func,
  getLiveCasinoInitGameSessionRequest: PropTypes.func,
  liveCasinoOnTabSelect: PropTypes.func,
};

LiveCasino.defaultProps = {
  screenProps: {},
  liveCasinoData: {},
  navigation: { },
  getLiveCasinoRequest: () => {},
  getLiveCasinoInitGameSessionRequest: () => {},
  liveCasinoOnTabSelect: () => {},
};

const mapStateToProps = state => ({
  liveCasinoData: state.liveCasino,
});

const mapDispatchToProps = () => UserActions;
const LiveCasinoScreen = connect(mapStateToProps, mapDispatchToProps)(LiveCasino);
export default LiveCasinoScreen;

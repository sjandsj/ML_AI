
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
import FiltersContainer from './components/FiltersContainer';
import { UIColors } from '../../utils/variables';
import { CasinoCategories } from '../../utils/enum';
import SearchContainer from './components/SearchContainer';
import Navigation from '../../utils/navigation';
import PagingLoader from '../../components/PagingLoader';
import Loader from '../../components/Loader';
import CasinoList from './components/CasinoList';
import { UserData } from '../../utils/global';
import { showOptionAlert } from '../../utils/showAlert';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
    // backgroundColor: '#47474780',
  },
  subcontainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    // backgroundColor: UIColors.fontGrayColor,
    backgroundColor: '#47474780',
  },
});

class VirtualGames extends Component {
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
    } = this.props.virtualGamesReducer;
    console.log('===============menu', typeSelected)
    const data = {
      //: false,
      kind: 'virtual',
      menu_id: typeSelected,
      page: 0,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
      search: this.state.search,
    };
    this.props.getVirtualGamesRequest(data);
  }

  onPressTab(tabType) {
    if (tabType === this.props.virtualGamesReducer.typeSelected) {
      return;
    }
    console.log('=========taabs', tabType, this.props.virtualGamesReducer.typeSelected)
    this.props.setVirtualGamesProvidersSelect([]);
    this.setState({ search: '' });
    this.props.onVirtualGamesTabSelect(tabType);
    const data = {
      page: 0,
      //live_casino: false,
      kind: 'virtual',
      menu_id: tabType,
      has_free_spin: this.props.virtualGamesReducer.freeSpinSelected,
      is_mobile: this.props.virtualGamesReducer.mobileSelected,
      has_lobby: this.props.virtualGamesReducer.lobbySelected,
      provider: this.props.virtualGamesReducer.providersSelected,
    };
    this.props.getVirtualGamesRequest(data);
  }

  onPressCategoryButton(category) {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.virtualGamesReducer;
    const data = {
      //live_casino: false,
      kind: 'virtual',
      menu_id: typeSelected,
      page: 0,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
      search: this.state.search,
    };
    switch (category) {
      case CasinoCategories.Free_spins:
        data.has_free_spin = freeSpinSelected ? '' : true;
        this.props.onVirtualGamesFreeSpinSelect();
        break;
      case CasinoCategories.Lobby:
        data.has_lobby = lobbySelected ? '' : true;
        this.props.onVirtualGamesLobbySelect();
        break;
      case CasinoCategories.Mobile:
        data.is_mobile = mobileSelected ? '' : true;
        this.props.onVirtualGamesMobileSelect();
        break;
      default:
        break;
    }
    this.props.getVirtualGamesRequest(data);
  }

  onPressFilter() {
    Navigation.sharedInstance().pushToScreen(SCREENS.FILTERS_PROVIDER_SCREEN, { data: { name: 'Filters', searchText: this.state.search, screen: SCREENS.VIRTUAL_GAMES_SCREEN } });
  }

  onChangeText(text) {
    this.setState({ search: text });
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.virtualGamesReducer;
    const data = {
      page: 0,
      //live_casino: false,
      kind: 'virtual',
      search: text,
      menu_id: typeSelected,
      has_free_spin: freeSpinSelected,
      is_mobile: mobileSelected,
      has_lobby: lobbySelected,
      provider: providersSelected,
    };
    this.props.getVirtualGamesRequest(data);
  }

  loginAction() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WELCOME_SCREEN);
  }

  gameRedirectAction(uuid) {
    if (UserData.BearerToken) {
      if (uuid) {
        this.props.getVirtualGamesInitGameSessionRequest(uuid);
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
    } = this.props.virtualGamesReducer;
    const data = {
      //live_casino: false,
      kind: 'virtual',
      menu_id: typeSelected,
      has_free_spin: freeSpinSelected,
      is_mobile: mobileSelected,
      has_lobby: lobbySelected,
      provider: providersSelected,
      search: this.state.search,
    };
    this.props.getVirtualGamesRequest(data);
  }

  handleLoadMore = () => {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.virtualGamesReducer.meta;
    if (current_page !== total_pages && !this.props.virtualGamesReducer.isLoadingVirtualGamesList) {
      const data = {
        page: next_page,
        //live_casino: false,
        kind: 'virtual',
        menu_id: this.props.virtualGamesReducer.typeSelected,
        has_free_spin: this.props.virtualGamesReducer.freeSpinSelected,
        is_mobile: this.props.virtualGamesReducer.mobileSelected,
        has_lobby: this.props.virtualGamesReducer.lobbySelected,
        search: this.state.search,
        provider: this.props.virtualGamesReducer.providersSelected,
      };
      this.props.getVirtualGamesRequest(data);
    }
  };

  render() {
    const { isPortrait } = this.props.screenProps;
    const { isLoadingVirtualGamesGame, isLoadingVirtualGamesList } = this.props.virtualGamesReducer;
    return (
      <View style={styles.container}>
        <HeaderContainer
          showBackButton
          openMenu={() => this.props.navigation.openDrawer()}
          homeButtonAction={() => this.props.navigation.navigate(SCREENS.HOME_SCREEN)}
        />
        <SafeAreaView style={styles.subcontainer}>
          <TabsCell
            typesList={this.props.virtualGamesReducer.types}
            typeSelected={this.props.virtualGamesReducer.typeSelected}
            onPressTab={tabType => this.onPressTab(tabType)}
          />
          <SearchContainer
            onChangetext={text => this.onChangeText(text)}
            searchValue={this.state.search}
            onPressFilter={() => this.onPressFilter()}
          />
          <FiltersContainer
            categoryList={this.props.virtualGamesReducer.categoryFilters}
            currentState={this.state}
            renderList={data => this.renderList(data)}
            freeSpin={this.props.virtualGamesReducer.freeSpinSelected}
            lobby={this.props.virtualGamesReducer.lobbySelected}
            mobile={this.props.virtualGamesReducer.mobileSelected}
            onPressCategory={category => this.onPressCategoryButton(category)}
          />
          <View style={styles.listContainer}>
            <CasinoList
              isPortrait={isPortrait}
              itemsList={this.props.virtualGamesReducer.itemsList}
              handleLoadMore={() => this.handleLoadMore()}
              gameRedirectAction={uuid => this.gameRedirectAction(uuid)}
              refreshCasinoList={() => this.refreshCasinoList()}
              isLoadingCasinoList={isLoadingVirtualGamesList}
            />
          </View>
        </SafeAreaView>
        {isLoadingVirtualGamesGame && <Loader isAnimating={isLoadingVirtualGamesGame} color={UIColors.defaultWhite} /> }
        {isLoadingVirtualGamesList && <PagingLoader isAnimating={isLoadingVirtualGamesList} color={UIColors.defaultWhite} />}
      </View>
    );
  }
}

VirtualGames.propTypes = {
  screenProps: PropTypes.object,
  virtualGamesReducer: PropTypes.object,
  navigation: PropTypes.object,
  getVirtualGamesRequest: PropTypes.func,
  getVirtualGamesInitGameSessionRequest: PropTypes.func,
  onFreeSpinSelect: PropTypes.func,
  onLobbySelect: PropTypes.func,
  onMobileSelect: PropTypes.func,
  onTabSelect: PropTypes.func,
  setProvidersSelect: PropTypes.func,
};

VirtualGames.defaultProps = {
  screenProps: {},
  virtualGamesReducer: {},
  navigation: { },
  getVirtualGamesRequest: () => {},
  getVirtualGamesInitGameSessionRequest: () => {},
  onFreeSpinSelect: () => {},
  onLobbySelect: () => {},
  onMobileSelect: () => {},
  onTabSelect: () => {},
  setProvidersSelect: () => {},
};

const mapStateToProps = state => ({
  virtualGamesReducer: state.virtualGamesReducer,
});

const mapDispatchToProps = () => UserActions;
const  VirtualGamesScreen = connect(mapStateToProps, mapDispatchToProps)(VirtualGames);
export default VirtualGamesScreen;

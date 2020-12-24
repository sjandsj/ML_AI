
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

class Casino extends Component {
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
    } = this.props.casinoData;
    const data = {
      //live_casino: false,
      kind: '',
      menu_id: typeSelected,
      page: 0,
      has_free_spin: freeSpinSelected,
      has_lobby: lobbySelected,
      is_mobile: mobileSelected,
      provider: providersSelected,
      search: this.state.search,
    };
    this.props.getCasinoRequest(data);
  }

  onPressTab(tabType) {
    if (tabType === this.props.casinoData.typeSelected) {
      return;
    }
    this.setState({ search: '' });
    this.props.setProvidersSelect([]);
    this.props.onTabSelect(tabType);
    const data = {
      page: 0,
      //live_casino: false,
      kind: '',
      menu_id: tabType,
      has_free_spin: this.props.casinoData.freeSpinSelected,
      is_mobile: this.props.casinoData.mobileSelected,
      has_lobby: this.props.casinoData.lobbySelected,
      provider: this.props.casinoData.providersSelected,
    };
    this.props.getCasinoRequest(data);
  }

  onPressCategoryButton(category) {
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.casinoData;
    const data = {
      //live_casino: false,
      kind: '',
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
        this.props.onFreeSpinSelect();
        break;
      case CasinoCategories.Lobby:
        data.has_lobby = lobbySelected ? '' : true;
        this.props.onLobbySelect();
        break;
      case CasinoCategories.Mobile:
        data.is_mobile = mobileSelected ? '' : true;
        this.props.onMobileSelect();
        break;
      default:
        break;
    }
    this.props.getCasinoRequest(data);
  }

  onPressFilter() {
    Navigation.sharedInstance().pushToScreen(SCREENS.FILTERS_PROVIDER_SCREEN, { data: { name: 'Filters', searchText: this.state.search, screen: SCREENS.CASINO_SCREEN } });
  }

  onChangeText(text) {
    this.setState({ search: text });
    const {
      typeSelected, freeSpinSelected, lobbySelected, mobileSelected, providersSelected,
    } = this.props.casinoData;
    const data = {
      page: 0,
      //live_casino: false,
      kind: '',
      search: text,
      menu_id: typeSelected,
      has_free_spin: freeSpinSelected,
      is_mobile: mobileSelected,
      has_lobby: lobbySelected,
      provider: providersSelected,
    };
    this.props.getCasinoRequest(data);
  }

  loginAction() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WELCOME_SCREEN);
  }

  gameRedirectAction(uuid) {
    if (UserData.BearerToken) {
      if (uuid) {
        this.props.getCasinoInitGameSessionRequest(uuid);
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
    } = this.props.casinoData;
    const data = {
      //live_casino: false,
      kind: '',
      menu_id: typeSelected,
      has_free_spin: freeSpinSelected,
      is_mobile: mobileSelected,
      has_lobby: lobbySelected,
      provider: providersSelected,
      search: this.state.search,
    };
    this.props.getCasinoRequest(data);
  }

  handleLoadMore = () => {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.casinoData.meta;
    if (current_page !== total_pages && !this.props.casinoData.isLoadingCasinoList) {
      const data = {
        page: next_page,
        //live_casino: false,
        kind: '',
        menu_id: this.props.casinoData.typeSelected,
        has_free_spin: this.props.casinoData.freeSpinSelected,
        is_mobile: this.props.casinoData.mobileSelected,
        has_lobby: this.props.casinoData.lobbySelected,
        search: this.state.search,
        provider: this.props.casinoData.providersSelected,
      };
      this.props.getCasinoRequest(data);
    }
  };

  render() {
    const { isPortrait } = this.props.screenProps;
    const { isLoadingCasinoList, isLoadingCasinoGame } = this.props.casinoData;
    return (
      <View style={styles.container}>
        <HeaderContainer
          showBackButton
          openMenu={() => this.props.navigation.openDrawer()}
          homeButtonAction={() => this.props.navigation.navigate(SCREENS.HOME_SCREEN)}
        />
        <SafeAreaView style={styles.subcontainer}>
          <TabsCell
            typesList={this.props.casinoData.types}
            typeSelected={this.props.casinoData.typeSelected}
            onPressTab={tabType => this.onPressTab(tabType)}
          />
          <SearchContainer
            onChangetext={text => this.onChangeText(text)}
            searchValue={this.state.search}
            onPressFilter={() => this.onPressFilter()}
          />
          <FiltersContainer
            categoryList={this.props.casinoData.categoryFilters}
            currentState={this.state}
            renderList={data => this.renderList(data)}
            freeSpin={this.props.casinoData.freeSpinSelected}
            lobby={this.props.casinoData.lobbySelected}
            mobile={this.props.casinoData.mobileSelected}
            onPressCategory={category => this.onPressCategoryButton(category)}
          />
          <View style={styles.listContainer}>
            <CasinoList
              isPortrait={isPortrait}
              itemsList={this.props.casinoData.itemsList}
              handleLoadMore={() => this.handleLoadMore()}
              gameRedirectAction={uuid => this.gameRedirectAction(uuid)}
              refreshCasinoList={() => this.refreshCasinoList()}
              isLoadingCasinoList={isLoadingCasinoList}
            />
          </View>
        </SafeAreaView>
        {isLoadingCasinoGame && <Loader isAnimating={isLoadingCasinoGame} color={UIColors.defaultWhite} /> }
        {isLoadingCasinoList && <PagingLoader isAnimating={isLoadingCasinoList} color={UIColors.defaultWhite} />}
      </View>
    );
  }
}

Casino.propTypes = {
  screenProps: PropTypes.object,
  casinoData: PropTypes.object,
  navigation: PropTypes.object,
  getCasinoRequest: PropTypes.func,
  getCasinoInitGameSessionRequest: PropTypes.func,
  onFreeSpinSelect: PropTypes.func,
  onLobbySelect: PropTypes.func,
  onMobileSelect: PropTypes.func,
  onTabSelect: PropTypes.func,
  setProvidersSelect: PropTypes.func,
};

Casino.defaultProps = {
  screenProps: {},
  casinoData: {},
  navigation: { },
  getCasinoRequest: () => {},
  getCasinoInitGameSessionRequest: () => {},
  onFreeSpinSelect: () => {},
  onLobbySelect: () => {},
  onMobileSelect: () => {},
  onTabSelect: () => {},
  setProvidersSelect: () => {},
};

const mapStateToProps = state => ({
  casinoData: state.casino,
});

const mapDispatchToProps = () => UserActions;
const CasinoScreen = connect(mapStateToProps, mapDispatchToProps)(Casino);
export default CasinoScreen;

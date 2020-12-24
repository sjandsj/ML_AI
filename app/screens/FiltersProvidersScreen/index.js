import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Utils from '../../utils/utils';
import NavigationBar from '../../components/NavigationBar';
import UserActions from '../../actions';
import { UIColors, spacing, itemSizes } from '../../utils/variables';
import { getProviders, getLiveProviders, getVirtualGamesProviders } from '../../selectors/providers';
import CheckBoxSelectionList from './components/CheckBoxSelectionList';
import { SCREENS } from '../../utils/av_constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
  listContainer: {
    flex: 1,
  },
  providersContainer: {
    flex: 1,
    paddingTop: spacing.small,
    paddingLeft: spacing.small,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.small,
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: '30%',
    height: itemSizes.defaultButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  buttonText: {
    color: UIColors.primaryText,
  },
  titleText: {
    color: UIColors.primaryText,
  },
});

class FiltersProviders extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    let providers;
    switch (props.navigation.state.params.data.screen) {
      case SCREENS.CASINO_SCREEN:
        providers=JSON.parse(JSON.stringify(props.casinoData.providersSelected));
        break;
      case SCREENS.LIVE_CASINO_SCREEN:
        providers=JSON.parse(JSON.stringify(props.liveCasinoData.providersSelected));
        break;
      case SCREENS.VIRTUAL_GAMES_SCREEN:
        providers=JSON.parse(JSON.stringify(props.virtualGamesReducer.providersSelected));
        break;
    }
    //const providers = (((props.navigation.state.params.data.screen==SCREENS.CASINO_SCREEN)) ? JSON.parse(JSON.stringify(props.casinoData.providersSelected)) : JSON.parse(JSON.stringify(props.liveCasinoData.providersSelected)));
    this.state = {
      header: props.header ? props.header : props.navigation.state.params.data.name,
      checkedProviders: providers,
      searchText: props.navigation.state.params.data.searchText,
      screen: props.navigation.state.params.data.screen,
    };
  }

  onClickCheckBox(provider) {
    const list = this.state.checkedProviders;
    if (_.includes(list, provider)) {
      _.remove(list, item => item === provider);
    } else {
      list.push(provider);
    }
    console.log('==========lsit', list)
    this.setState({ checkedProviders: list });
  }

  onClickApplyButton() {  
    if (this.state.screen==SCREENS.CASINO_SCREEN) {
      this.props.setProvidersSelect(this.state.checkedProviders);
      const data = {
        page: 0,
        //live_casino: false,
        kind: '',
        menu_id: this.props.casinoData.typeSelected,
        has_free_spin: this.props.casinoData.freeSpinSelected,
        is_mobile: this.props.casinoData.mobileSelected,
        has_lobby: this.props.casinoData.lobbySelected,
        provider: this.state.checkedProviders,
        search: this.state.searchText,
      };
      //console.log('===============data', provider)
      this.props.getCasinoRequest(data);
    } else if (this.state.screen==SCREENS.LIVE_CASINO_SCREEN){
      this.props.setLiveProvidersSelect(this.state.checkedProviders);
        const data = {
          page: 0,
          //live_casino: true,
          kind: 'live',
          menu_id: this.props.liveCasinoData.typeSelected.tabId,
          search: this.state.searchText,
          has_free_spin: this.props.liveCasinoData.freeSpinSelected,
          has_lobby: this.props.liveCasinoData.lobbySelected,
          is_mobile: this.props.liveCasinoData.mobileSelected,
          provider: this.state.checkedProviders,
        };
        this.props.getLiveCasinoRequest(data);
    } else {
      this.props.setVirtualGamesProvidersSelect(this.state.checkedProviders);
      const data = {
        page: 0,
        //live_casino: true,
        kind: 'virtual',
        menu_id: this.props.virtualGamesReducer.typeSelected,
        search: this.state.searchText,
        has_free_spin: this.props.virtualGamesReducer.freeSpinSelected,
        has_lobby: this.props.virtualGamesReducer.lobbySelected,
        is_mobile: this.props.virtualGamesReducer.mobileSelected,
        provider: this.state.checkedProviders,
      };
      this.props.getVirtualGamesRequest(data);
    }
    this.backButtonAction();
  }

  onClickResetButton() {
    this.setState({ checkedProviders: [] });  
    if (this.state.screen==SCREENS.CASINO_SCREEN) {
      const data = {
        page: 0,
        //live_casino: false,
        kind: '',
        menu_id: this.props.casinoData.typeSelected,
        has_free_spin: this.props.casinoData.freeSpinSelected,
        is_mobile: this.props.casinoData.mobileSelected,
        has_lobby: this.props.casinoData.lobbySelected,
        provider: [],
        search: this.state.searchText,
      };
      this.props.getCasinoRequest(data);
      this.props.setProvidersSelect([]);
    } else if (this.state.screen==SCREENS.LIVE_CASINO_SCREEN){
        const data = {
          page: 0,
          //live_casino: true,
          kind: 'live',
          menu_id: this.props.liveCasinoData.typeSelected.tabId,
          search: this.state.searchText,
          has_free_spin: this.props.liveCasinoData.freeSpinSelected,
          has_lobby: this.props.liveCasinoData.lobbySelected,
          is_mobile: this.props.liveCasinoData.mobileSelected,
          provider: [],
        };
      this.props.getLiveCasinoRequest(data);
      this.props.setLiveProvidersSelect([]);
    } else {
        const data = {
          page: 0,
          //live_casino: true,
          kind: 'virtual',
          menu_id: this.props.virtualGamesReducer.typeSelected,
          search: this.state.searchText,
          has_free_spin: this.props.virtualGamesReducer.freeSpinSelected,
          has_lobby: this.props.virtualGamesReducer.lobbySelected,
          is_mobile: this.props.virtualGamesReducer.mobileSelected,
          provider: [],
        };
        this.props.setVirtualGamesProvidersSelect([]);
    }
    this.backButtonAction();
  }

  backButtonAction() {
    this.props.navigation.pop();
  }

  getProvidersList=()=>{
    console.log('=======comong')
    let list;
    if (this.state.screen==SCREENS.CASINO_SCREEN) {
    list=this.props.providersList;
    } else if (this.state.screen==SCREENS.LIVE_CASINO_SCREEN) {
      list=this.props.liveProvidersList;
    } else {
      list=this.props.virtualGamesList;
    }
    return list;
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    return (
      <SafeAreaView style={styles.container}>
        <NavigationBar
          title={this.state.header}
          showBackButton
          backButtonAction={() => this.backButtonAction()}
        />
        <View style={styles.providersContainer}>
          <Text style={styles.titleText}>Providers</Text>
          <CheckBoxSelectionList
            //list={()=>this.getProvidersList()}
            list={((this.state.screen==SCREENS.CASINO_SCREEN) ? this.props.providersList : this.props.liveProvidersList)} 
            //list={ (this.state.screen==SCREENS.VIRTUAL_GAMES_SCREEN) ? this.props.virtualGamesList :  ((this.state.screen==SCREENS.CASINO_SCREEN) ? this.props.providersList : this.props.liveProvidersList)}
            onSelectItem={(item) => {
              this.onClickCheckBox(item);
            }}
            isPortrait={isPortrait}
            selectedItems={this.state.checkedProviders}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.onClickResetButton()}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.onClickApplyButton()}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

FiltersProviders.propTypes = {
  screenProps: PropTypes.object,
  casinoData: PropTypes.object,
  navigation: PropTypes.object,
  getCasinoRequest: PropTypes.func,
  getCasinoInitGameSessionRequest: PropTypes.func,
  onFreeSpinSelect: PropTypes.func,
  onLobbySelect: PropTypes.func,
  onMobileSelect: PropTypes.func,
  onTabSelect: PropTypes.func,
  providersList: PropTypes.array,
  setProvidersSelect: PropTypes.func,
  header: PropTypes.string,
};

FiltersProviders.defaultProps = {
  screenProps: {},
  casinoData: {},
  navigation: { },
  getCasinoRequest: () => {},
  getCasinoInitGameSessionRequest: () => {},
  onFreeSpinSelect: () => {},
  onLobbySelect: () => {},
  onMobileSelect: () => {},
  onTabSelect: () => {},
  providersList: [],
  setProvidersSelect: () => {},
  header: '',
};

const mapStateToProps = state => ({
  casinoData: state.casino,
  liveCasinoData: state.liveCasino,
  virtualGamesReducer: state.virtualGamesReducer,
  providersList: getProviders(state),
  liveProvidersList: getLiveProviders(state),
  getVirtualGamesProviders: getVirtualGamesProviders(state),
});

const mapDispatchToProps = () => UserActions;
const FiltersProvidersScreen = connect(mapStateToProps, mapDispatchToProps)(FiltersProviders);
export default FiltersProvidersScreen;

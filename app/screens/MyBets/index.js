import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UIColors, fontName, fontSizes, spacing, itemSizes, fontWeights } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import { SCREENS } from '../../utils/av_constants';
import HeaderContainer from '../../components/HeaderContainer';
import TabBar from '../../components/TabBar';
import CustomText from '../../components/CustomText';
import { selectedTab } from '../../utils/enum';
import Loader from '../../components/Loader';
import Games from '../PendingPlaysAndParlays/components/Games';
import { UserData } from '../../utils/global';
import ResolvedPlay from '../ResolvedPlays/components/ResolvedPlay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbarHeader: {
    height: itemSizes.searchHeader,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.semiMedium,
    marginBottom: spacing.semiMedium,
    // marginBottom: 0,
    // width: '100%',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    margin: spacing.medium,
  },
  dropDownCointainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: itemSizes.itemSizes280,
  },
  dropDownCell: {
    width: '100%',
    height: itemSizes.defaultSmallButtonHeight,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.newAppButtonGreenBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownCellText: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.book,
  },
});

class MyBets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      modalVisible: false,
      selectedModalValue: selectedTab.SINGLE,
      bets: [],
    };
  }

  componentDidMount() {
    this.getSingleBets();
    this.getComboBets();
    this.getBetsResolved();
    this.getComboBetsResolved();
  }

  onTabPress(tab, index) {
    if (this.state.tabIndex===index) {
      return
    }  else {
        this.setState({
          tabIndex: index,
        });
        if ((this.state.selectedModalValue===selectedTab.SINGLE) && (index===0)) {
          this.getSingleBets();
        } else if ((this.state.selectedModalValue===selectedTab.SINGLE) && (index===1)) {
          this.getBetsResolved();
        } else if ((this.state.selectedModalValue===selectedTab.COMBO) && (index===0)) {
          this.getComboBets();
        } else {
          this.getComboBetsResolved();
        }
      }
  }

  setModalVisibleNew(visible, valueSelected) {
    this.setState({
      modalVisible: visible,
      selectedModalValue: valueSelected,
    });
  }

  setModalVisible(visible, valueSelected) {
    if (this.state.selectedModalValue===valueSelected) {
      this.setState({
        modalVisible: visible,
        selectedModalValue: valueSelected,
      });
    } else {
      this.setState({
        modalVisible: visible,
        selectedModalValue: valueSelected,
      });
      if ((valueSelected===selectedTab.SINGLE) && (this.state.tabIndex===0)) {
        this.getSingleBets();
      } else if ((valueSelected===selectedTab.SINGLE) && (this.state.tabIndex===1)) {
        this.getBetsResolved();
      } else if ((valueSelected===selectedTab.COMBO) && (this.state.tabIndex===0)) {
        this.getComboBets();
      } else {
        this.getComboBetsResolved();
      }
    }  
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
    this.props.postCashoutBetRequest(data, betType)
  }

  _handleRefresh() {
    this.getSingleBets();
    this.getComboBets();
  }

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

  handleLoadMoreResolved = () => {
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

  handleLoadMoreComboBetResolved = () => {
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

  _handleRefreshResolved() {
    this.getBetsResolved();
    this.getComboBetsResolved();
  }

  getBetsResolved() {
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

  getComboBetsResolved() {
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

  render() {
    const { isPortrait } = this.props.screenProps;
    const { isResolvedBetsLoading } = this.props.getResolvedBetsState;
    const { isLoading } = this.props.getPendingBetsState;
    const { isLoadingGetBets } = this.props.mainGamePlay;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton={false}
            title="MY BETS"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <View style={styles.mainContainer}>
            <View style={styles.tabbarHeader}>
              <TabBar
                tabsList={[
                  'OPEN BETS',
                  'CLOSED BETS',
                ]}
                onTabSelect={(tab, index) => this.onTabPress(tab, index)}
              />
            </View>
            <View style={{ height: itemSizes.defaultButtonHeight, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', width: '85%' }}>
              <Text style={{fontWeight: fontWeights.bold, justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: UIColors.secondaryText}}>
                Bet Type
              </Text>
              <TouchableOpacity
                style={{ height: itemSizes.itemSizes25, margin: spacing.medium, justifyContent: 'space-between', flex: 2, alignItems: 'center', flexDirection: 'row', backgroundColor: UIColors.newAppButtonGreenBackgroundColor }}
                onPress={() => this.setModalVisibleNew(true, this.state.selectedModalValue)}
              >
                <CustomText title={this.state.selectedModalValue} textStyle={{ fontWeight: fontWeights.bold, marginLeft: spacing.extraSmall, color: UIColors.primaryText }} />
                <Image source={images.downlIcon} style={{ marginRight: spacing.extraSmall, height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
              </TouchableOpacity>
            </View>
            <Modal
              supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
              animationType="fade"
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => {
          }}>
              <View style={styles.dropDownCointainer}>
                <View style={{ height: itemSizes.headerSize, backgroundColor: UIColors.primaryText, width: itemSizes.itemSizes280, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => { this.setModalVisible(!this.state.modalVisible, selectedTab.SINGLE); }}
                    style={styles.dropDownCell}
                  >
                    <Text style={styles.dropDownCellText}>
                      {selectedTab.SINGLE}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { this.setModalVisible(!this.state.modalVisible, selectedTab.COMBO); }}
                    style={styles.dropDownCell}
                  >
                    <Text style={styles.dropDownCellText}>
                      {selectedTab.COMBO}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {(this.state.tabIndex === 0) &&
            <View style={{ flex: 1}}>
              { this.props.mainGamePlay.betPlaced && this.props.getPendingBetsState.pendingComboBets &&
                <Games
                  isPortrait={this.props.screenProps.isPortrait}
                  bets={this.props.mainGamePlay.betPlaced}
                  title="PENDING PLAYS"
                  handleLoadMore={() => this.handleLoadMore()}
                  handleLoadMoreComboBets={() => this.handleLoadMoreComboBets()}
                  _handleRefresh={() => this._handleRefresh()}
                  comboBets={this.props.getPendingBetsState.pendingComboBets}
                  selectedTab={this.state.selectedModalValue}
                  betCashout={(data, betType) => this.betCashout(data, betType)}
                />
              }
              
            </View>
          }
            {this.state.tabIndex === 1 &&
            <View style={{ flex: 1}}>
              { this.props.getResolvedBetsState.resolvedBets && this.props.getResolvedBetsState.resolvedComboBets &&
                <ResolvedPlay
                  isPortrait={this.props.screenProps.isPortrait}
                  bets={this.props.getResolvedBetsState.resolvedBets}
                  comboBets={this.props.getResolvedBetsState.resolvedComboBets}
                  selectedTab={this.state.selectedModalValue}
                  handleLoadMore={() => this.handleLoadMoreResolved()}
                  handleLoadMoreComboBet={() => this.handleLoadMoreComboBetResolved()}
                  _handleRefresh={() => this._handleRefreshResolved()}
                />
              }
              
            </View>
          }
          </View>
        </ImageBackground>
        {isResolvedBetsLoading && <Loader isAnimating={isResolvedBetsLoading} />}
        {isLoading && <Loader isAnimating={isLoading} />}
        {isLoadingGetBets && <Loader isAnimating={isLoadingGetBets} />}
      </View>
    );
  }
}

MyBets.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
  getSettingsRequest: PropTypes.func,
};

MyBets.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
  getSettingsRequest: () => { },
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  getPendingBetsState: state.getPendingBets,
  getResolvedBetsState: state.getResolvedBets,
  getBetsResponse: state.getResolvedBets.getResolvedBetsResponse,
  // isLoading: state.getResolvedBets.isLoading,
});

const mapDispatchToProps = () => UserActions;
const MyBetsScreen = connect(mapStateToProps, mapDispatchToProps)(MyBets);
export default MyBetsScreen;

import React, { Component } from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { UIColors, fontName, fontSizes, spacing, itemSizes, fontWeights } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images';
import HeaderContainer from '../../components/HeaderContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomText from '../../components/CustomText';
import Loader from '../../components/Loader';
import { BetTypeFilter } from './components/BetTypeFilter';
import { TournamentHeader } from '../../components/TournamentHeader';
import { MatchOdds } from './components/MatchOdds';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginTop: spacing.medium,
    // margin: spacing.medium,
    paddingHorizontal: spacing.medium,
    alignItems: 'center',
  },
  viewForBlueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconLarge,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  blueBoxTextStyle: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
  oddsBox: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.fontGrayColor,
    textAlign: 'center',
    color: UIColors.secondaryText,
  },
  oddsBoxSelected: {
    fontSize: fontSizes.extraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    textAlign: 'center',
    color: UIColors.primaryText,
  },
  dropDownCointainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    // height: itemSizes.itemSizes280,
  },
  dropDownCell: {
    width: '100%',
    height: itemSizes.itemWidth,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.newAppButtonGreenBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownCellText: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.bold,
  },
});

let tournamentName;
let matchList;

// eslint-disable-next-line react/prefer-stateless-function
class MatchBet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedModalValue: 'Full Time Result',
      selectedModalId: '1',
    };
    tournamentName = this.props.navigation.state.params.tournamentSelected.title;
    const tournamentId = this.props.navigation.state.params.tournamentSelected.id;
    const data = {
      page: 0,
      perPage: 10,
      tournamentId,
      countryId: this.props.navigation.state.params.countryId,
      marketId: this.state.selectedModalId,
    };
    this.props.getMatchListRequest(data);
    this.props.getAllMarketsRequest();
  }

  handleLoadMoreMatches() {
    const tournamentId = this.props.navigation.state.params.tournamentSelected.id;
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.listDataReducer.metaData;
    if (current_page !== total_pages) {
      const data = {
        page: next_page,
        perPage: 10,
        tournamentId,
        countryId: this.props.navigation.state.params.countryId,
        marketId: this.state.selectedModalId,
      };
      // return;
      this.props.getMatchListRequest(data);
    }
  }

  onPressOdd(match, oddData) {
    if (oddData.odds === '') {
      return;
    }
    const selectedOdd = oddData;
    const { betSlips } = this.props.mainGamePlay;
    selectedOdd.matchName = match.name;
    selectedOdd.marketName = match.market.name;
    selectedOdd.matchID = match.id;
    selectedOdd.marketUID = match.market.uid;
    selectedOdd.marketID = match.market.uid;
    selectedOdd.id = oddData.uid;
    selectedOdd.specifierName = '49';
    selectedOdd.isOddsChanged = false;
    selectedOdd.sport = match.sport;
    oddData = selectedOdd;
    const repeatedValue = _.find(betSlips, {
      id: oddData.id, marketID: match.market.uid, matchID: match.id,
    });
    if (!repeatedValue) {

      this.props.setBetSlips(selectedOdd);
    } else {
      this.onRemoveBetFromBetSlips(selectedOdd);
    }
  }

  onRemoveBetFromBetSlips(bet) {
    this.props.deleteBetSlips(bet);
  }

  setModalVisible(visible, valueSelected) {
    this.props.getMarketsForSelectedMatchRequest(this.props.listDataReducer.matches[0].id, true)
    if (!visible) {
      this.getMatchListRequestAPI(valueSelected);
    }
    this.setState({
      modalVisible: visible,
      selectedModalValue: valueSelected.name,
      selectedModalId: valueSelected.uid,
    });
  }
  getMatchListRequestAPI(valueSelected) {
    tournamentName = this.props.navigation.state.params.tournamentSelected.title;
    const tournamentId = this.props.navigation.state.params.tournamentSelected.id;
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.listDataReducer.metaData;
    if (current_page !== total_pages) {
      const data = {
        page: next_page,
        perPage: 10,
        tournamentId,
        countryId: this.props.navigation.state.params.countryId,
        marketId: this.state.selectedModalId,
      };
      console.log('=====>>>>>', data);
      // return;
      this.props.getMatchListRequest(data);
    }
  }


  _handleRefresh = () => {
    tournamentName = this.props.navigation.state.params.tournamentSelected.title;
    const tournamentId = this.props.navigation.state.params.tournamentSelected.id;
    const data = {
      page: 1,
      perPage: 10,
      tournamentId,
      countryId: this.props.navigation.state.params.countryId,
      marketId: this.state.selectedModalId,
    };
    this.props.getMatchListRequest(data);
  }

  showMarket = (selectedMatch) => {
    this.props.onPressMatch(selectedMatch, this.props.navigation.state.params.tournamentSelected);
    // this.props.getMarketsForSelectedMatchRequest(selectedMatch.id);
    this.props.navigation.navigate('MarketOddsScreen', {
      selectedMatch,
      tournamentSelected: this.props.navigation.state.params.tournamentSelected,
      gameName: this.props.navigation.state.params.gameSelected.name,
      gameIcon: this.props.navigation.state.params.gameSelected.image_url,
    });
  }

  render() {
    const { isLoading } = this.props.listDataReducer;
    matchList = this.props.listDataReducer.matches;
    const allMarkets = this.props.listDataReducer.allMarkets;
    const { betSlips } = this.props.mainGamePlay;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title={tournamentName}
            openMenu={() => this.props.navigation.openDrawer()}
          />
          {/* <ScrollView style={{ flex: 1 }}> */}

          <View style={styles.mainContainer}>
            <BetTypeFilter
              selectedFilter={this.state.selectedModalValue}
              allMarkets={this.props.mainGamePlay.matchMarketData}
              betFilterPressed={() => {this.setModalVisible(true, this.state.selectedModalValue)}}
            />
            <Modal
              supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
              animationType="fade"
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => {
              }}
            >
              <View style={styles.dropDownCointainer}>
                <View style={{
                  backgroundColor: UIColors.primaryText, width: itemSizes.itemSizes280, alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <FlatList
                    data={this.props.mainGamePlay.matchMarketData}
                    listKey={(item, index) => 'A' + index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => { this.setModalVisible(!this.state.modalVisible, item); }}
                        style={styles.dropDownCell}
                      >
                        <Text style={styles.dropDownCellText}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.uid}
                  // extraData={selected}
                  />
                </View>
              </View>
            </Modal>
            <TournamentHeader
              gameName={this.props.navigation.state.params.gameSelected.name}
              tournamentName={tournamentName}
              gameIcon={this.props.navigation.state.params.gameSelected.image_url}
            />
            <View style={{ flex: 1 }}>
              <FlatList
                data={this.props.listDataReducer.matches}
                onEndReached={() => this.handleLoadMoreMatches()}
                onEndReachedThreshold={0.5}
                listKey={(item, index) => 'B' + index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => this._handleRefresh()}
                  />
                }
                renderItem={({ item }) => (
                  <MatchOdds
                    matchNameContainerPressed={() => this.showMarket(item)}
                    onPressOdd={(match, oddData) => this.onPressOdd(match, oddData)}
                    betSlips={betSlips}
                    selectedFilter={this.state.selectedModalValue}
                    // marketDataForMatch={item.markets}
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          {isLoading && <Loader isAnimating={isLoading} />}
        </ImageBackground>
      </View>
    );
  }
}

MatchBet.propTypes = {
  screenProps: PropTypes.object,
  listDataReducer: PropTypes.array,
  navigation: PropTypes.object,
};

MatchBet.defaultProps = {
  screenProps: {},
  listDataReducer: [],
  navigation: {},
};

const mapStateToProps = state => ({
  listDataReducer: state.listDataReducer,
  matchOddsReducer: state.matchOddsReducer,
  mainGamePlay: state.mainGamePlay,
});

const mapDispatchToProps = () => UserActions;
const MatchBetScreen = connect(mapStateToProps, mapDispatchToProps)(MatchBet);
export default MatchBetScreen;

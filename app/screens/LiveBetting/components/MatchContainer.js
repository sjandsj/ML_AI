import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { UIColors, fontSizes, spacing, itemSizes, fontWeights, fontName } from '../../../utils/variables';
import { images } from '../../../assets/images/';
import CustomText from '../../../components/CustomText';
import DateManager from '../../../utils/dateManager';
import MarketOdds from './MarketOdds';
import { getTournaments } from '../../../selectors/tournaments';
import UserActions from '../../../actions';
import { marketDataUpdated } from '../../../parser/marketParser';
import { UserData } from '../../../utils/global';
import { formateData } from '../../../utils/utils';

const styles = StyleSheet.create({
  betContainer: {
    // backgroundColor: 'yellow',
    // flex: 1,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.blueBorder,
    width: '100%',
    marginBottom: spacing.small,
    alignSelf: 'center',
  },
  matchDetailContainer: {
    backgroundColor: UIColors.greyBackground,
    // height: itemSizes.defaultButtonHeight,
    // flexDirection: 'row',
    width: '100%',
    // margin: spacing.medium,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.extraSmall,
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.semiMedium,
  },
  dateAndTimeTextStyle: {
    color: UIColors.success,
    fontSize: fontSizes.mini,
  },
  teamNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
  },
  teamNameStyle: {
    textAlign: 'center',
    margin: spacing.extraSmall,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
  },
  // viewForBlueBox: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: spacing.small,
  //   height: itemSizes.iconSmall,
  //   width: itemSizes.iconLarge,
  //   backgroundColor: UIColors.newAppFontBlueColor,
  //   borderRadius: spacing.extraExtraSmall,
  // },
  // blueBoxTextStyle: {
  //   fontSize: fontSizes.tiny,
  //   fontWeight: fontWeights.bold,
  //   color: UIColors.primaryText,
  // },
  betType: {
    fontSize: fontSizes.tiny,
    color: UIColors.secondaryText,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  betTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: itemSizes.defaultButtonHeight,
  },
  oddButtonStyle: {
    flex: 1,
    borderWidth: spacing.border,
    borderColor: UIColors.greyBackground,
  },
  oddsBox: {
    fontSize: fontSizes.extraExtraSmall,
    fontWeight: fontWeights.bold,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.lightGreyBackground,
    textAlign: 'center',
    color: UIColors.secondaryText,
  },
  oddsBoxSelected: {
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
    padding: spacing.small,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    textAlign: 'center',
    color: UIColors.primaryText,
  },
  viewForBlueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.small,
    height: itemSizes.iconSmall,
    width: itemSizes.iconLarge,
    backgroundColor: UIColors.newAppFontBlueColor,
    borderRadius: spacing.extraExtraSmall,
  },
  blueBoxTextStyle: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
});

var markets;

class MatchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowMarkets: false,
      arrowImage: images.rightArrowBlack,
      marketState: markets,
      colorTimer: false,
      // newTimerSet: 400,
      // newTimertimerSet: 1000,

    };

    this.newTimer = setInterval(() => {

      this.setState({ colorTimer: false });
      // this.setState({ NewcolorFlag: false });
    }, (UserData.UpdateOddsInterval * 400));

    this.newTimertimer = setInterval(() => {

      this.setState({ colorTimer: true });
      // this.setState({ NewcolorFlag: false });
    }, (UserData.UpdateOddsInterval * 1525));
  }

  componentWillUnmount() {
    clearInterval(this.newTimer);
    clearInterval(this.newTimertimer);
  }
  onPressOddContainer(match, oddData) {
    if (oddData.odds === '') {
      return;
    }
    const selectedOdd = oddData;
    const { betSlips } = this.props.mainGamePlay;
    selectedOdd.matchName = match.name;
    selectedOdd.marketName = match.market.name;
    selectedOdd.matchID = match.id;
    selectedOdd.marketUID = match.market.uid;
    selectedOdd.marketID = `${match.market.uid}`;
    selectedOdd.id = oddData.uid;
    selectedOdd.specifierName = '49';
    selectedOdd.isOddsChanged = false;
    selectedOdd.sport = match.sport;
    oddData = selectedOdd;
    const repeatedValue = _.find(betSlips, {
      id: oddData.id, marketID: oddData.marketID, matchID: oddData.matchID,
    });
    if (!repeatedValue) {
      this.props.setBetSlips(selectedOdd);
    } else {
      this.onRemoveBetFromBetSlips(selectedOdd);
    }
  }
  // }

  onPressOdd(marketUID, oddData) {
    if (oddData.odds === '') {
      return;
    }
    const selectedOdd = oddData;
    const { betSlips, selectedMatch } = this.props.mainGamePlay;
    const liveMatch = this.props.liveSportsData;
    selectedOdd.matchName = this.getMatchName();
    selectedOdd.matchID = liveMatch.id;
    selectedOdd.marketUID = marketUID;
    selectedOdd.isOddsChanged = false;
    selectedOdd.sport = { name: this.props.matchItem && this.props.matchItem.name };
    const repeatedValue = _.find(betSlips, {
      id: oddData.id, marketID: oddData.marketID, matchID: oddData.matchID,
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

  getMatchName() {
    const liveMatch = this.props.liveSportsData;
    const name = liveMatch && liveMatch.name;
    return name;
  }

  showOddsSpecifierName(marketUID, specifierData) {
    let { name } = specifierData;
    if (name === 'Home') name = '1';
    if (name === 'Away') name = '2';
    if (name === 'Draw') name = 'X';
    if (marketUID === '1778') return name;
    if (specifierData.handicap) name = `${name} ${specifierData.handicap}`;
    return name;
  }

  showMarkets = (selectedMatch) => {
    this.setState({ shouldShowMarkets: !this.state.shouldShowMarkets });
    if (this.state.shouldShowMarkets === false) {
      this.props.onPressMatch(selectedMatch);
      this.setState({ arrowImage: images.downGreyIcon });
    } else {
      this.setState({ arrowImage: images.rightArrowBlack });
    }
  }

  checkData(betSlips, dataValue) {
    const isContains = !_
      .chain(betSlips)
      .find(dataValue)
      .isEmpty()
      .value();
    return isContains;
  }

  setData(data) {
    let markets = data;
  }

  render() {
    // const { isLoading, mainGamePlay, tournaments } = this.props;
    // var selectedPrevMatchData;
    // var updatePrevMarket;
    // var updatedMarket;
    // const liveMatch = this.props.liveSportsData;
    // const matchId = liveMatch.id;
    // const prevLiveMatches = this.props.liveBettingReducer.prevLiveMatches;
    // if (prevLiveMatches && prevLiveMatches[0]) {
    //   const matchList = prevLiveMatches[0].live_matches;
    //   const matchArray = matchList.map(data => data.matches);
    //   selectedPrevMatchData = _.find(matchArray[0], (o) => { return o.id === matchId });
    //   if (selectedPrevMatchData) {
    //     updatePrevMarket = marketDataUpdated(selectedPrevMatchData.markets);
    //   }
    // }
    // // const teamNames = liveMatch.teams;
    // const team = `${liveMatch.name}`
    // const teamNames = team.split(' vs ')
    // if (liveMatch && !_.isEmpty(liveMatch.markets)) {
    //   markets = liveMatch.markets;
    //   updatedMarket = marketDataUpdated(markets);
    // }
    // let isMarketAvailable;
    // let outcomes;
    // if (liveMatch.market === null || _.isEmpty(liveMatch.market)) {
    //   isMarketAvailable = false;
    // } else {
    //   isMarketAvailable = true;
    //   outcomes = liveMatch.market.outcomes;
    // }
    // let marketresponse = [];
    // if (isMarketAvailable) {

    //   let newMarketresponse = formateData(Object.values(outcomes), 2).splice(0, 3)

    //   let object1 = {}
    //   let objectX = {}
    //   let object2 = {}
    //   newMarketresponse.forEach(element => {
    //     if (element.name === "1") {
    //       object1 = element
    //     }
    //     if (element.name === "2") {
    //       object2 = element
    //     }
    //     if (element.name === "X") {
    //       objectX = element
    //     }
    //   });
    //   marketresponse.push(object1)
    //   marketresponse.push(objectX)
    //   marketresponse.push(object2)

    // }
    const { isLoading, mainGamePlay, tournaments } = this.props;
    var selectedPrevMatchData;
    var updatePrevMarket;
    var updatedMarket;
    const liveMatch = this.props.liveSportsData;
    const matchId = liveMatch.id;
    const prevLiveMatches = this.props.liveBettingReducer.prevLiveMatches;
    if (prevLiveMatches && prevLiveMatches[0]) {
      const matchList = prevLiveMatches[0].live_matches;
      const matchArray = matchList.map(data => data.matches);
      selectedPrevMatchData = _.find(matchArray[0], (o) => { return o.id === matchId });
      if (selectedPrevMatchData) {
        updatePrevMarket = marketDataUpdated(selectedPrevMatchData.markets);
      }
    }
    const team = `${liveMatch.name}`
    const teamNames = team.split(' vs ')
    if (liveMatch && !_.isEmpty(liveMatch.markets)) {
      markets = liveMatch.markets;
      updatedMarket = marketDataUpdated(markets);
    }
    let isMarketAvailable;
    let outcomes;
    if (liveMatch.market === null || _.isEmpty(liveMatch.market) || (liveMatch.market.status === 'suspended')) {
      isMarketAvailable = false;
    } else {
      isMarketAvailable = true;
      outcomes = liveMatch.market.outcomes;
    }
    return (
      <View style={styles.betContainer}>
        <View style={styles.matchDetailContainer}>
          <View style={{ marginLeft: spacing.medium, marginRight: spacing.medium, alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <CustomText title="LIVE" textStyle={{ fontWeight: fontWeights.bold, color: UIColors.newAppButtonGreenBackgroundColor, fontSize: fontSizes.tiny }} />
              <Text style={{ color: UIColors.greenFontColor, marginLeft: spacing.small, fontWeight: fontWeights.bold, fontSize: fontSizes.tiny }}>
                {liveMatch.running_time}
              </Text>
            </View>
            <Text style={{ color: UIColors.secondaryText, fontWeight: fontWeights.bold, fontSize: fontSizes.extraExtraSmall }}>
              {liveMatch.score}
            </Text>
          </View>
          <View style={[styles.matchDetailContainer, { margin: spacing.zero, flexDirection: 'row' }]}>
            <TouchableOpacity
              onPress={() => this.props.addRemoveFav(matchId)}
              style={styles.dateTimeContainer}
            >
              <Image source={this.props.starIcon} style={{ height: itemSizes.iconLarge, width: itemSizes.iconLarge }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.showMarkets(liveMatch)}
              style={styles.teamNameContainer}
            >
              <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4 }}>
                <Text
                  style={styles.teamNameStyle}
                  numberOfLines={3}
                >
                  {(teamNames && teamNames.length === 0) ? '' : teamNames[0]}
                </Text>
              </View>
              <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 1 }}>
                <Text
                  style={[styles.teamNameStyle, { margin: spacing.extraExtraSmall, color: UIColors.secondaryText }]}
                >
                  Vs
                </Text>
              </View>
              <View style={{ justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4 }}>
                <Text
                  style={styles.teamNameStyle}
                  numberOfLines={3}
                >
                  {(teamNames && teamNames.length === 0) ? '' : teamNames[1]}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.showMarkets(liveMatch)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
              <View style={styles.viewForBlueBox}>
                <CustomText title={updatedMarket ? liveMatch.market_counts : 0} textStyle={styles.blueBoxTextStyle} />
              </View>
              <View>
                <Image source={this.state.arrowImage} style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.shouldShowMarkets === false && isMarketAvailable &&
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <CustomText title={liveMatch.market.name} textStyle={styles.betType} />
            </View>
            <View>
              {isMarketAvailable === true &&
                <FlatList
                  extraData={this.props}
                  scrollEnabled={false}
                  keyExtractor={(_item, index) => `${index}odds`}
                  numColumns={3}
                  key={this.props.isPortrait ? 'v' : 'h'}
                  data={formateData(Object.values(outcomes), 2)}
                  ItemSeparatorComponent={() => <View style={styles.seperator} />}
                  renderItem={(dataValue) => {
                    if (_.isEmpty(dataValue.item)) {
                      return <View style={styles.cellView} />;
                    }
                    const isMarketRepeated = !_
                      .chain(mainGamePlay.betSlips)
                      .find({ matchID: matchId })
                      .isEmpty()
                      .value();
                    const isContains = !_
                      .chain(mainGamePlay.betSlips)
                      .find({ uid: dataValue.item.uid, matchID: matchId, marketUID: liveMatch.market.uid })
                      .isEmpty()
                      .value();
                    return (
                      <View style={{ flex: 1 }}>
                        {(isMarketRepeated && !isContains) ?
                          <TouchableOpacity
                            disabled
                            style={[styles.oddButtonStyle, { backgroundColor: UIColors.lightGreyBackground, opacity: 0.4 }]}
                          >
                            <Image source={images.lockIcon} style={{ padding: spacing.border, alignSelf: 'flex-end', height: itemSizes.item10, width: itemSizes.item10 }} />
                            <Text style={[styles.oddsBox, { padding: spacing.border }]}>
                              {isMarketAvailable ? `${this.showOddsSpecifierName(liveMatch.market.uid, dataValue.item)}    ${dataValue.item.odds}` : 'N.A.'}
                            </Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            style={styles.oddButtonStyle}
                            onPress={() => (isMarketAvailable ? this.onPressOddContainer(liveMatch, dataValue.item) : null)}
                          >
                            <Text
                              style={isContains
                                ? styles.oddsBoxSelected
                                : styles.oddsBox}
                            >
                              {isMarketAvailable ? `${this.showOddsSpecifierName(liveMatch.market.uid, dataValue.item)}    ${dataValue.item.odds}` : 'N.A.'}
                            </Text>
                          </TouchableOpacity>
                        }
                      </View>
                    );
                  }}
                />}
            </View>
          </View>
        }
        {this.state.shouldShowMarkets ?
          <View>
            <Text style={{ textAlign: 'center', margin: spacing.small, fontSize: fontSizes.extraSmall, fontWeight: fontWeights.black, alignSelf: 'center', color: UIColors.secondaryText }}>
              {liveMatch.name}
            </Text>
            <MarketOdds
              matchID={matchId}
              previousMatchData={updatePrevMarket}
              onPressOdd={(marketUID, oddData) => this.onPressOdd(marketUID, oddData)}
              betSlips={mainGamePlay.betSlips}
              colorTimer={this.state.colorTimer}
              marketDataForMatch={updatedMarket}
              showOddsSpecifierName={(id, specifier) => this.showOddsSpecifierName(id, specifier)}
              refreshMarkets={() => this.props.refreshMarkets()}
            />
          </View>
          : null
        }
      </View>
    );
  }
}

MatchContainer.propTypes = {
  sportsBarPressed: PropTypes.func,
  sportsBarTitle: PropTypes.string,
  sportsBarIcon: PropTypes.object,
  liveSportsData: PropTypes.object,
  matchNameContainerPressed: PropTypes.func,
};

MatchContainer.defaultProps = {
  sportsBarPressed: () => { },
  sportsBarTitle: '',
  sportsBarIcon: {},
  liveSportsData: {},
  matchNameContainerPressed: () => { },
};


// gjgjgjg
const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  isLoading: state.loaderReducers.isLoading,
  tournaments: getTournaments(state),
  liveBettingReducer: state.liveBettingReducer,
});

const mapDispatchToProps = () => UserActions;

const MatchContainerScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchContainer);

export default MatchContainerScreen;

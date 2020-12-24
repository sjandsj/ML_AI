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
import { formateData } from '../../../utils/utils';

const styles = StyleSheet.create({
  betContainer: {
    flex: 1,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.blueBorder,
    width: '100%',
    marginBottom: spacing.small,
  },
  matchDetailContainer: {
    backgroundColor: UIColors.greyBackground,
    // height: itemSizes.defaultButtonHeight,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    // margin: spacing.extraSmall,
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

let markets;

class MatchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowMarkets: false,
      arrowImage: images.rightArrowBlack,
      marketState: markets,
    };
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

  onPressOdd(marketUID, oddData) {
    if (oddData.odds === '') {
      return;
    }
    const selectedOdd = oddData;
    const { betSlips, selectedMatch } = this.props.mainGamePlay;
    const liveMatch = this.props.liveSportsData.item;
    selectedOdd.matchName = this.getMatchName();
    selectedOdd.matchID = liveMatch.id;
    selectedOdd.marketUID = marketUID;
    selectedOdd.isOddsChanged = false;
    selectedOdd.sport = { name: this.props.matchItem.name };
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
    const liveMatch = this.props.liveSportsData.item;
    
    const name = liveMatch.name;
    return name;
  }


  // getMatchName() {
  //   const { selectedMatch } = this.props.mainGamePlay;
  //   const name = selectedMatch.name;
  //   return name;
  // }
  checkData(betSlips, dataValue) {
    const isContains = !_
      .chain(betSlips)
      .find({ uid: dataValue.uid, matchID: this.props.liveSportsData.item.id, marketUID: this.props.liveSportsData.item.market.uid })
      .isEmpty()
      .value();
    return isContains;
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

  render() {
    const { isLoading, mainGamePlay, tournaments } = this.props;
    const liveMatch = this.props.liveSportsData.item;
    const team = `${liveMatch.name}`
    const teamNames = team.split(' vs ')
    const matchId = liveMatch.id;
    var updatedMarket;
    if (liveMatch && !_.isEmpty(liveMatch.markets)) {
      markets = liveMatch.markets;
      updatedMarket = marketDataUpdated(markets);
    }
    const date = new Date(liveMatch.schedule_at);
    const matchDate = DateManager.formatDateWithDash(date);
    const hour = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let isMarketAvailable;
    let outcomes;
    if (liveMatch.market === null || _.isEmpty(liveMatch.market)) {
      isMarketAvailable = false;
    } else {
      outcomes = liveMatch.market.outcomes;

      isMarketAvailable = true;
    }
    return (
      <View style={styles.betContainer}>
        <TouchableOpacity
          onPress={() => this.showMarkets(liveMatch)}
          style={styles.matchDetailContainer}
        >
          <View style={styles.dateTimeContainer}>
            {/* <CustomText title="LIVE" textStyle={{ color: UIColors.newAppButtonGreenBackgroundColor, fontSize: fontSizes.mini }} /> */}
            <CustomText title={matchDate} textStyle={styles.dateAndTimeTextStyle} />
            <CustomText title={`${hour}:${minutes}`} textStyle={styles.dateAndTimeTextStyle} />
          </View>
          <View style={styles.teamNameContainer}>
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
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
            <View style={styles.viewForBlueBox}>
              <CustomText title={updatedMarket ? updatedMarket.length : 0} textStyle={styles.blueBoxTextStyle} />
            </View>
            <View>
              <Image source={this.state.arrowImage} style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
            </View>
          </View>
        </TouchableOpacity>
        {this.state.shouldShowMarkets === false &&
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {isMarketAvailable &&
              <CustomText title="3-way" textStyle={styles.betType} />
              }
            </View>
            
            <View>
              {isMarketAvailable === true &&
                <FlatList
                  extraData={this.props}
                  scrollEnabled={false}
                  keyExtractor={(_item, index) => `${index}odds`}
                  // style={styles.oddsList}
                  numColumns={3}
                  key={this.props.isPortrait ? 'v' : 'h'}
                  data={formateData(Object.values(outcomes), 2)}
                  ItemSeparatorComponent={() => <View style={styles.seperator} />}
                  // data={spcfrData.item.outcomes}
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
                          // onPress={() => props.onPressOdd(item.item.marketUID, dataValue.item)}
                          >
                            <Image source={images.lockIcon} style={{ padding: spacing.border, alignSelf: 'flex-end', height: itemSizes.item10, width: itemSizes.item10 }} />
                            <Text
                              style={[styles.oddsBox, { padding: spacing.border}]}
                            >
                              {isMarketAvailable ? `${this.showOddsSpecifierName(liveMatch.market.uid, dataValue.item)}    ${dataValue.item.odds}` : 'N.A.'}

                            </Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            style={styles.oddButtonStyle}
                            onPress={() => (isMarketAvailable ? this.onPressOddContainer(liveMatch, dataValue.item) : null)}
                          >
                            <Text
                              style={isContains
                                // style={checkData(props.betSlips, dataValue.item)
                                ? styles.oddsBoxSelected
                                : styles.oddsBox}
                            >
                              {isMarketAvailable ? `${this.showOddsSpecifierName(liveMatch.market.uid, dataValue.item)}    ${dataValue.item.odds}` : 'N.A.'}

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
              liveMatch={liveMatch}
              onPressOdd={(marketUID, oddData) => this.onPressOdd(marketUID, oddData)}
              betSlips={mainGamePlay.betSlips}
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
});

const mapDispatchToProps = () => UserActions;

const MatchContainerScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchContainer);

export default MatchContainerScreen;

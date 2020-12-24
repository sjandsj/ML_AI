import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import UserActions from '../../../actions';
import { UIColors, spacing, fontSizes, fontName } from '../../../utils/variables';
import Loader from '../../../components/Loader';
import { getTournaments } from '../../../selectors/tournaments';
import MarketOdds from './MarketOdds';
import Tournaments from './Tournaments';
import Footer from './Footer';
import BetSlipContainer from './BetSlipContainer';
import BetPlacedContainer from './BetPlacedContainer';
import Navigation from '../../../utils/navigation';

import { showPopupAlertWithTitle, showOptionAlert } from '../../../utils/showAlert';
import { mainGAmePlayLocalizeString } from '../../../localization/mainGamePlayLocalizeString';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { showOptionForBets, TournamentFilterType } from '../../../utils/enum';
import TournamentFilterTypeButton from './TournamentFilterTypeButton';
import { UserData } from '../../../utils/global';
import { SCREENS } from '../../../utils/av_constants';
import { images } from '../../../assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.primary,
  },
  upperHeader: {
    paddingHorizontal: spacing.small,
    flexDirection: 'row',
  },
  upperHeaderTitle: {
    flex: 0.5,
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
    color: UIColors.primaryText,
    paddingVertical: spacing.small,
  },
  backButton: {
    flex: 1,
    tintColor: UIColors.primaryText,
    resizeMode: 'contain',
  },
  tournamentTitle: {
    fontSize: fontSizes.extraExtraSmall,
    fontFamily: fontName.sourceSansProRegular,
  },
  tournamentTitleView: {
    backgroundColor: UIColors.defaultWhite,
    padding: spacing.small,
  },
  segmentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionView: {
    flex: 1,
  },
});

const sportsList = [
  { id: 1, name: 'Soccer' },
];
class MainGamePlayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBottomBetSlipView: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.props.mainGamePlay.isShowMarkets && this.props.mainGamePlay.selectedMatch && this.props.mainGamePlay.selectedMatch.status === 'in_progress'
        && this.props.mainGamePlay.marketsResponse) {
        this.props.getMarketsForSelectedMatchRequest(this.props.mainGamePlay.selectedMatch.id, true);
      }
    }, (UserData.UpdateOddsInterval * 1000));
  }

  onPressOdd(marketUID, oddData) {
    const selectedOdd = oddData;
    const { betSlips, selectedMatch } = this.props.mainGamePlay;
    selectedOdd.matchName = this.getMatchName();
    selectedOdd.matchID = selectedMatch.id;
    selectedOdd.marketUID = marketUID;
    selectedOdd.isOddsChanged = false;
    const repeatedValue = _.find(betSlips, {
      id: oddData.id, marketID: oddData.marketID, matchID: oddData.matchID,
    });
    if (!repeatedValue) {
      this.props.setBetSlips(selectedOdd);
      // setTimeout(() => this.calculateFoldAndStakeInBetSlips(), 300);
      if (betSlips.length >= 1) {
        this.setState({ showBottomBetSlipView: true });
      }
    }
    if (_.isEmpty(betSlips)) {
      this.props.setBetSlipContainerVisiblity(showOptionForBets.BET_SLIPS);
    }
  }

  onBetSlipPressed() {
    this.props.setBetSlipContainerVisiblity(showOptionForBets.BET_SLIPS);
  }

  onBetPlacedPressed() {
    this.props.setBetSlipContainerVisiblity(showOptionForBets.BET_PLACED);
    const data = {
      page: 0,
      perPage: 20,
    };
    this.props.getMyBetsRequest(data);
  }

  onRemoveBetFromBetSlips(bet) {
    const { betSlips } = this.props.mainGamePlay;
    if (betSlips && betSlips.length === 1) {
      this.props.setBetSlipContainerVisiblity(showOptionForBets.NONE);
    }

    this.props.deleteBetSlips(bet);
    if (this.props.mainGamePlay.isShowMarkets) {
      this.props.refreshMarkets();
    }
  }

  onSubmitBets() {
    const betSlipsToPost = {
      bet_slips: [],
    };
    const setSlip = (element) => {
      const slip = {};
      slip.match_id = element.matchID;
      slip.market_id = element.marketID;
      slip.market_uid = element.marketUID;
      slip.outcome_id = element.id;
      slip.odds = element.odds;
      slip.stake = element.stake;
      if (element.handicap) {
        slip.identifier = `{:handicap=>'${element.handicap}'}`;
      } else {
        slip.identifier = '{}';
      }
      return slip;
    };

    const { mainGamePlay } = this.props;
    if (mainGamePlay.betSlips.length > 1) {
      _.forEach(mainGamePlay.betSlips, (element) => {
        if (!_.isEmpty(this.props.comboBetStake) && this.props.comboBetStake > 0) {
          betSlipsToPost.bet_slips.push(setSlip(element));
        }
      });
      betSlipsToPost.bet_type = 'combo';
      betSlipsToPost.combo_bet_stake = parseFloat(this.props.comboBetStake);
    } else {
      _.forEach(mainGamePlay.betSlips, (element) => {
        if (!_.isEmpty(element.stake) && element.stake > 0) {
          betSlipsToPost.bet_slips.push(setSlip(element));
        }
      });
      betSlipsToPost.bet_type = '';
    }
    if (betSlipsToPost.bet_slips.length > 0
      && betSlipsToPost.bet_slips.length === mainGamePlay.betSlips.length) {
      this.props.postBetSlipsRequest(betSlipsToPost);
    } else {
      showPopupAlertWithTitle(
        commonLocalizeStrings.alert,
        commonLocalizeStrings.enterStakeValue,
      );
    }
  }

  getMatchName() {
    const { selectedMatch } = this.props.mainGamePlay;
    if (!selectedMatch.settings) {
      return '';
    }
    const teamInfo = selectedMatch.settings.team_info;
    const teams = _.values(teamInfo);
    const homeTeam = _.find(teams, { qualifier: commonLocalizeStrings.home });
    const awayTeam = _.find(teams, { qualifier: commonLocalizeStrings.away });
    const name = `${homeTeam.name} vs ${awayTeam.name}`;
    return name;
  }

  hideBetSlipContainer() {
    this.props.setBetSlipContainerVisiblity(false);
  }

  handleLoadMoreMyBets() {
    const {
      current_page,
      next_page,
      total_pages,
    } = this.props.mainGamePlay.myBetsMeta;
    if (current_page !== total_pages && !this.props.mainGamePlay.isLoadingMyGetBets) {
      const data = {
        page: next_page,
        perPage: 20,
      };
      this.props.getMyBetsRequest(data);
    }
  }

  isSelectedMatchLive() {
    return (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.InPlay ||
    (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.Today &&
      this.props.mainGamePlay.selectedMatch.status === 'in_progress'));
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

  // eslint-disable-next-line react/sort-comp
  renderBetSlipContainer = () => (
    <BetSlipContainer
      slips={this.props.mainGamePlay.betSlips}
      netOddsForComboBet={this.props.mainGamePlay.netOddsForComboBet}
      foldsInBetSlip={this.props.mainGamePlay.foldsInBetSlip}
      comboBetStake={this.props.comboBetStake}

      onSubmit={() => {
        if (UserData.BearerToken) {
          this.onSubmitBets();
        } else {
          showOptionAlert(
          commonLocalizeStrings.alert,
          commonLocalizeStrings.pleaseLogin,
          commonLocalizeStrings.ok,
          commonLocalizeStrings.cancel,
          text => text === 0 && this.loginAction(),
          );
        }
      }}
      isPortrait={this.props.isPortrait}
      onClose={() => {
        this.hideBetSlipContainer();
      }}
      onPressRemove={(bet) => {
        this.onRemoveBetFromBetSlips(bet);
      }}
      showOddsSpecifierName={this.showOddsSpecifierName}
      onPressStakeButton={(id) => {
        this.props.onPressStakeButton(id);
      }}
      hideEnterStakeContainer={() => this.props.hideEnterStakeContainer()}
      isLoading={this.props.mainGamePlay.isLoadingPlaceBet}
    />
  );

  renderBetPlacedContainer = () => (
    <BetPlacedContainer
      slips={this.props.mainGamePlay.myBets}
      isPortrait={this.props.isPortrait}
      onClose={() => {
        this.hideBetSlipContainer();
      }}
      hideEnterStakeContainer={() => this.props.hideEnterStakeContainer()}
      isLoading={this.props.mainGamePlay.isLoadingMyGetBets}
      handleLoadMoreMyBets={() => this.handleLoadMoreMyBets()}
    />
  );

  renderContainerForBets() {
    switch (this.props.mainGamePlay.showBetSlipContainer) {
      case showOptionForBets.BET_SLIPS:
        return this.renderBetSlipContainer();
      case showOptionForBets.BET_PLACED:
        return this.renderBetPlacedContainer();
      default:
        break;
    }
    return null;
  }

  loginAction() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WELCOME_SCREEN);
  }

  backButtonAction() {
    if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.Sports) {
      this.props.onPressSportsFilterButton(this.props.mainGamePlay.selectedSport.id);
    } else if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.Today) {
      this.props.onPressTodayFilterButton(this.props.mainGamePlay.selectedSport.id);
    } else {
      this.props.onPressInPlayFilterButton(this.props.mainGamePlay.selectedSport.id, 'live');
    }
  }

  render() {
    const { isLoading, mainGamePlay, tournaments } = this.props;
    const { selectedMatchRunningScore, selectedMatchRunningTime, tournamentFilterType } = mainGamePlay;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperHeader}>
          {mainGamePlay.isShowMarkets
            ?
              <TouchableOpacity style={{ flex: 0.5, paddingVertical: spacing.small }} onPress={() => this.backButtonAction()}>
                <Image source={images.backbutton} style={styles.backButton} />
              </TouchableOpacity>
            : <Text style={styles.upperHeaderTitle}>{mainGamePlay.selectedSport.name}</Text>
          }
          <View style={styles.segmentView}>
            <TournamentFilterTypeButton
              title={mainGAmePlayLocalizeString.sports}
              onPress={() => this.props.onPressSportsFilterButton(mainGamePlay.selectedSport.id)}
              isSelected={mainGamePlay.tournamentFilterType === TournamentFilterType.Sports}
            />
            <TournamentFilterTypeButton
              title={mainGAmePlayLocalizeString.today}
              onPress={() => this.props.onPressTodayFilterButton(mainGamePlay.selectedSport.id)}
              isSelected={mainGamePlay.tournamentFilterType === TournamentFilterType.Today}
            />
            <TournamentFilterTypeButton
              title={mainGAmePlayLocalizeString.inPlay}
              onPress={() => this.props.onPressInPlayFilterButton(mainGamePlay.selectedSport.id, 'live')}
              isSelected={mainGamePlay.tournamentFilterType === TournamentFilterType.InPlay}
            />
          </View>
        </View>
        {
          mainGamePlay.isShowMarkets
            ? (
              <View style={styles.sectionView}>
                <View style={styles.tournamentTitleView}>
                  <Text style={styles.tournamentTitle}>
                    {`${mainGamePlay.selectedTournament.title} / ${this.getMatchName()}`}
                    { this.isSelectedMatchLive() ? ` (Score: ${selectedMatchRunningScore} | Time: ${selectedMatchRunningTime})` : ''}
                  </Text>
                </View>
                <MarketOdds
                  onPressOdd={(marketUID, oddData) => this.onPressOdd(marketUID, oddData)}
                  betSlips={mainGamePlay.betSlips}
                  marketDataForMatch={mainGamePlay.matchMarketData}
                  showOddsSpecifierName={(id, specifier) => this.showOddsSpecifierName(id, specifier)}
                  refreshMarkets={() => this.props.refreshMarkets()}
                />
              </View>
            )
            : <Tournaments
              tournaments={tournaments}
              onPressMatch={(selectedMatch, selectedTournament) => {
                this.props.onPressMatch(selectedMatch, selectedTournament);
                this.props.getMarketsForSelectedMatchRequest(selectedMatch.id);
                if (this.props.mainGamePlay.selectedMatch.status === 'in_progress') {
                  // this.props.subscribeMatchToFirebase(selectedMatch.id);
                }
              }}
              refreshTournaments={() => {
                this.props.refreshTournaments();
              }}
            />
        }
        { this.renderContainerForBets() }
        <Footer
          slipCount={mainGamePlay.betSlips && mainGamePlay.betSlips.length}
          showBottomFullBetSlipView={this.state.showBottomBetSlipView}
          netOddsForComboBet={mainGamePlay.netOddsForComboBet}
          foldsInBetSlip={mainGamePlay.foldsInBetSlip}
          mainGamePlay={this.props.mainGamePlay}
          onBetSlipPressed={() => {
            this.onBetSlipPressed();
          }}
          onBetPlacedPressed={() => {
            if (UserData.BearerToken) {
              this.onBetPlacedPressed();
            } else {
              showOptionAlert(
                commonLocalizeStrings.alert,
                commonLocalizeStrings.pleaseLogin,
                commonLocalizeStrings.ok,
                commonLocalizeStrings.cancel,
                text => text === 0 && this.loginAction(),
                );
            }
          }}
          closeBottomBetSlipView={() => this.setState({ showBottomBetSlipView: false })}
        />
        {isLoading && <Loader isAnimating={isLoading} />}
      </SafeAreaView>
    );
  }
}

MainGamePlayContainer.propTypes = {
  isLoading: PropTypes.bool,
  isPortrait: PropTypes.bool.isRequired,
  mainGamePlay: PropTypes.object,
  tournaments: PropTypes.array,
  onPressMatch: PropTypes.func,
  setBetSlips: PropTypes.func,
  setTournamentsFilterType: PropTypes.func,
  setBetSlipContainerVisiblity: PropTypes.func,
  hideEnterStakeContainer: PropTypes.func,
  onPressStakeButton: PropTypes.func,
  deleteBetSlips: PropTypes.func,
  getMarketsForSelectedMatchRequest: PropTypes.func,
  postBetSlipsRequest: PropTypes.func,
  getBetsRequest: PropTypes.func,
  getTournamentsWithMatchesRequest: PropTypes.func,
  getTournamentsWithMatchesInPlayRequest: PropTypes.func,
  getTournamentsWithMatchesTodayRequest: PropTypes.func,
  updateSelectedMatchScoreAndTime: PropTypes.func,
  updateMarkets: PropTypes.func,
  refreshPagewithSelectedSport: PropTypes.func,
  refreshMarkets: PropTypes.func,
  refreshTournaments: PropTypes.func,
  subscribeMatchToFirebase: PropTypes.func,
  unsubscribeFirbaseInstance: PropTypes.func,
  onPressSportsFilterButton: PropTypes.func,
  onPressInPlayFilterButton: PropTypes.func,
  onPressTodayFilterButton: PropTypes.func,
  navigation: PropTypes.object,
  comboBetStake: PropTypes.number,
  getMyBetsRequest: PropTypes.func,
};

MainGamePlayContainer.defaultProps = {
  isLoading: false,
  mainGamePlay: { },
  tournaments: [],
  onPressMatch: () => { },
  setBetSlips: () => { },
  setBetSlipContainerVisiblity: () => { },
  hideEnterStakeContainer: () => { },
  onPressStakeButton: () => { },
  deleteBetSlips: () => { },
  getMarketsForSelectedMatchRequest: () => { },
  getTournamentsWithMatchesInPlayRequest: () => { },
  getTournamentsWithMatchesTodayRequest: () => { },
  postBetSlipsRequest: () => { },
  getBetsRequest: () => { },
  getTournamentsWithMatchesRequest: () => { },
  setTournamentsFilterType: () => { },
  updateSelectedMatchScoreAndTime: () => {},
  updateMarkets: () => {},
  refreshPagewithSelectedSport: () => { },
  refreshMarkets: () => { },
  refreshTournaments: () => { },
  subscribeMatchToFirebase: () => { },
  unsubscribeFirbaseInstance: () => { },
  onPressSportsFilterButton: () => { },
  onPressInPlayFilterButton: () => { },
  onPressTodayFilterButton: () => { },
  navigation: {},
  comboBetStake: 0,
  getMyBetsRequest: () => {},
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  isLoading: state.loaderReducers.isLoading,
  tournaments: getTournaments(state),
});

const mapDispatchToProps = () => UserActions;

const MainGamePlayContainerScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainGamePlayContainer);

export default MainGamePlayContainerScreen;

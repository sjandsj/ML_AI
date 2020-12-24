
import React, { Component } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserActions from '../../actions';
import Utils from '../../utils/utils';
import HeaderContainer from '../../components/HeaderContainer';
import SportsList from './components/SportsList';
import MainGamePlayContainer from './components/MainGamePlayContainer';
import EnterStakeValueContainer from './components/EnterStakeValueContainer';
import { SCREENS } from '../../utils/av_constants';
import { TournamentFilterType } from '../../utils/enum';
import { showOptionAlertWithSingleButton, showPopupAlertWithTitle } from '../../utils/showAlert';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import { marketDataUpdated } from '../../parser/marketParser';
import { defaultEnvironment } from '../../config/appConfig';

let betSlipId = null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
  },
});

class MainGamePlay extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = ({
      comboBetStake: 0,
    });
  }

  componentDidMount() {
    this.props.getSportsRequest();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // Storage.getItemWithKey(constants.USER_LIMIT, (result) => {
    //   let realityTime;
    //   if (result) {
    //     const time = result.reality_check_limit.range.split(' ');
    //     realityTime = Number(time[0]);
    //   } else {
    //     realityTime = 0;
    //   }
    //   this.props.screenProps.getUserActivityTimeInApp(realityTime);
    // });
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.refreshPagewithSelectedSport();
      },
    );
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.willFocusSubscription.remove();
  }


  onStakeValueSubmit(stake, betId) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(stake)) {
      showPopupAlertWithTitle('', 'Please enter a valid number');
    } else {
      const { mainGamePlay } = this.props;
      if (betId) {
        let newBetSlips = _.assign([], mainGamePlay.betSlips);
        newBetSlips = _.map(newBetSlips, (slip) => {
          const updatedSlip = slip;
          if (betId === slip.id) {
            updatedSlip.stake = stake;
            updatedSlip.toWin = (updatedSlip.odds * stake).toFixed(2);
          }
          return updatedSlip;
        });
        this.props.updateBetSlips(newBetSlips);
      } else {
        this.setState({ comboBetStake: stake });
      }
    }
  }

  onPressStakeButton(betId) {
    betSlipId = betId;
    this.props.setEnterStakeValueInBetSlipVisiblity(true);
  }

  onPressSportsFilterButton(id) {
    this.props.setTournamentsFilterType(TournamentFilterType.Sports);
    this.props.getTournamentsWithMatchesRequest(id);
  }
  
  onPressTodayFilterButton(id) {
    this.props.setTournamentsFilterType(TournamentFilterType.Today);
    this.props.getTournamentsWithMatchesTodayRequest(id);
  }

  onPressInPlayFilterButton(id, scope) {
    this.props.setTournamentsFilterType(TournamentFilterType.InPlay);
    this.props.getTournamentsWithMatchesInPlayRequest(id, scope);
  }

  // subscribeMatchToFirebase(selectedMatchId) {
  //   if (this.props.mainGamePlay.selectedMatch.id !== selectedMatchId && this.props.mainGamePlay.selectedMatch.id) {
  //     firebase.database().ref(`${defaultEnvironment}_match_odds_change/${this.props.mainGamePlay.selectedMatch.id}`).off();
  //   }
  //   firebase.database().ref(`${defaultEnvironment}_match_odds_change/${selectedMatchId}`).on('value', (snapshot) => {
  //     if (snapshot._value) {
  //       if (snapshot._value.match_status === 'ended') {
  //         showOptionAlertWithSingleButton('Alert', commonLocalizeStrings.matchFinshed, 'Ok', () => {
  //           this.onPressInPlayFilterButton(this.props.mainGamePlay.selectedSport.id, 'live');
  //         });
  //       }
  //       const updatedScore = snapshot._value.running_score;
  //       const updatedTime = snapshot._value.running_time;
  //       this.props.updateSelectedMatchScoreAndTime(updatedScore, updatedTime);
  //       if (snapshot._value.markets) {
  //         const updatedMarket = marketDataUpdated(snapshot._value.markets);
  //         this.props.updateMarkets(updatedMarket);
  //       }
  //     }
  //   });
  // }

  // unsubscribe a given match to firebase
  // unsubscribeFirbaseInstance(matchId) {
  //   firebase.database().ref(`${defaultEnvironment}_match_odds_change/${matchId}`).off();
  // }

  refreshMarkets() {
    this.props.getMarketsForSelectedMatchRequest(this.props.mainGamePlay.selectedMatch.id);
    const { mainGamePlay } = this.props;
    if (mainGamePlay.betSlips.length <= 2) {
      this.setState({ comboBetStake: 0 });
    }
  }

  refreshTournaments() {
    if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.InPlay) {
      this.props.getTournamentsWithMatchesInPlayRequest(this.props.mainGamePlay.selectedSport.id, 'live');
    } else if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.Today) {
      this.props.getTournamentsWithMatchesTodayRequest(this.props.mainGamePlay.selectedSport.id);
    } else {
      this.props.getTournamentsWithMatchesRequest(this.props.mainGamePlay.selectedSport.id);
    }
  }

  refreshPagewithSelectedSport() {
    if (this.props.mainGamePlay.selectedSport.id) {
      if (this.props.mainGamePlay.isShowMarkets) {
        this.refreshMarkets();
        // if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.InPlay) {
        //   this.subscribeMatchToFirebase(this.props.mainGamePlay.selectedMatch.id);
        // }
        // if (this.props.mainGamePlay.tournamentFilterType === TournamentFilterType.Today && this.props.mainGamePlay.selectedMatch.status === 'in_progress') {
        //   this.subscribeMatchToFirebase(this.props.mainGamePlay.selectedMatch.id);
        // }
      } else {
        this.refreshTournaments();
      }
    }
  }

  backButtonAction() {
    this.props.navigation.pop();
  }


  handleBackButton() {
    const { isShowMarkets, selectedMatch, tournamentFilterType } = this.props.mainGamePlay;
    if (isShowMarkets && selectedMatch.id && tournamentFilterType === TournamentFilterType.InPlay) {
      // this.unsubscribeFirbaseInstance(selectedMatch.id);
      this.onPressInPlayFilterButton(this.props.mainGamePlay.selectedSport.id, 'live');
      return true;
    }
    if (isShowMarkets && selectedMatch.id && tournamentFilterType === TournamentFilterType.Today) {
      // this.unsubscribeFirbaseInstance(selectedMatch.id);
      this.onPressTodayFilterButton(this.props.mainGamePlay.selectedSport.id);
      return true;
    }
    if (isShowMarkets && selectedMatch.id && tournamentFilterType === TournamentFilterType.Sports) {
      this.onPressSportsFilterButton(this.props.mainGamePlay.selectedSport.id);
      return true;
    }
    this.backButtonAction();
    return false;
  }

  hideEnterStakeContainer() {
    this.props.setEnterStakeValueInBetSlipVisiblity(false);
    betSlipId = null;
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    const { mainGamePlay } = this.props;
    return (
      <View style={styles.container}>
        <HeaderContainer
          openMenu={() => {
            this.props.navigation.openDrawer();
          }}
          homeButtonAction={() => {
            if (this.props.mainGamePlay.selectedMatch.id) {
              // this.unsubscribeFirbaseInstance(this.props.mainGamePlay.selectedMatch.id);
            }
            this.props.navigation.navigate(SCREENS.HOME_SCREEN);
          }}
        />
        <View style={[styles.subContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}>
          <SportsList isPortrait={isPortrait} />
          <MainGamePlayContainer
            isPortrait={isPortrait}
            onPressStakeButton={id => this.onPressStakeButton(id)}
            comboBetStake={this.state.comboBetStake}
            refreshPagewithSelectedSport={() => this.refreshPagewithSelectedSport()}
            refreshMarkets={() => this.refreshMarkets()}
            refreshTournaments={() => this.refreshTournaments()}
            // subscribeMatchToFirebase={matchId => this.subscribeMatchToFirebase(matchId)}
            // unsubscribeFirbaseInstance={matchId => this.unsubscribeFirbaseInstance(matchId)}
            onPressSportsFilterButton={id => this.onPressSportsFilterButton(id)}
            onPressInPlayFilterButton={(id, scope) => this.onPressInPlayFilterButton(id, scope)}
            onPressTodayFilterButton={id => this.onPressTodayFilterButton(id)}
          />
        </View>
        {mainGamePlay.showEnterStakeContainer &&
          <EnterStakeValueContainer
            hideEnterStakeContainer={() => this.hideEnterStakeContainer()}
            onStakeValueSubmit={(stake, betId) => this.onStakeValueSubmit(stake, betId)}
            betSlipId={betSlipId}
          />}
      </View>
    );
  }
}

MainGamePlay.propTypes = {
  screenProps: PropTypes.object,
  setEnterStakeValueInBetSlipVisiblity: PropTypes.func,
  mainGamePlay: PropTypes.object,
  getSportsRequest: PropTypes.func,
  updateBetSlips: PropTypes.func,
  getMarketsForSelectedMatchRequest: PropTypes.func,
  getTournamentsWithMatchesRequest: PropTypes.func,
  getTournamentsWithMatchesInPlayRequest: PropTypes.func,
  getTournamentsWithMatchesTodayRequest: PropTypes.func,
  updateSelectedMatchScoreAndTime: PropTypes.func,
  updateMarkets: PropTypes.func,
  setTournamentsFilterType: PropTypes.func,
  unsubscribeFirbaseInstance: PropTypes.func,
  navigation: PropTypes.object,
};

MainGamePlay.defaultProps = {
  screenProps: {},
  setEnterStakeValueInBetSlipVisiblity: () => { },
  mainGamePlay: {},
  getMarketsForSelectedMatchRequest: () => { },
  getTournamentsWithMatchesRequest: () => { },
  getTournamentsWithMatchesInPlayRequest: () => { },
  getTournamentsWithMatchesTodayRequest: () => { },
  updateSelectedMatchScoreAndTime: () => {},
  updateMarkets: () => {},
  setTournamentsFilterType: () => {},
  unsubscribeFirbaseInstance: () => {},
  getSportsRequest: () => {},
  updateBetSlips: () => { },
  navigation: { },
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
});

const mapDispatchToProps = () => UserActions;
const MainGamePlayScreen = connect(mapStateToProps, mapDispatchToProps)(MainGamePlay);
export default MainGamePlayScreen;

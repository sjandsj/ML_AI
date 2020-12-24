import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, SafeAreaView, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import UserActions from '../../actions';
import { UIColors, spacing, fontSizes, fontName, itemSizes, fontWeights } from '../../utils/variables';
import HeaderContainer from '../../components/HeaderContainer';
import MarketOdds from './components/MarketOdds';
// import Loader from '../../components/Loader';
import { getTournaments } from '../../selectors/tournaments';
import CustomText from '../../components/CustomText';
import { TournamentHeader } from '../../components/TournamentHeader';
import Loader from '../../components/Loader';

// import Tournaments from './Tournaments';
// import Footer from './Footer';
// import BetSlipContainer from './BetSlipContainer';
// import BetPlacedContainer from './BetPlacedContainer';
// import Navigation from '../../../utils/navigation';

// import { showPopupAlertWithTitle, showOptionAlert } from '../../../utils/showAlert';
// import { mainGAmePlayLocalizeString } from '../../../localization/mainGamePlayLocalizeString';
// import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
// import { showOptionForBets, TournamentFilterType } from '../../../utils/enum';
// import TournamentFilterTypeButton from './TournamentFilterTypeButton';
import { UserData } from '../../utils/global';
// import { SCREENS } from '../../../utils/av_constants';
import { images } from '../../assets/images';
import DateManager from '../../utils/dateManager';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
    flex: 1,
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
    margin: spacing.medium,
  },
  matchDetailContainer: {
    backgroundColor: UIColors.greyBackground,
    height: itemSizes.defaultButtonHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.small,
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
    // margin: spacing.small,
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
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
});

// eslint-disable-next-line react/prefer-stateless-function
class MarketsInMatchOdds extends Component {

  componentDidMount() {
    const match = this.props.navigation.state.params.selectedMatch;

    // this.timer = setInterval(() => {
    //   if (this.props.mainGamePlay.isShowMarkets && this.props.mainGamePlay.selectedMatch && this.props.mainGamePlay.selectedMatch.status === 'in_progress'
    //     && this.props.mainGamePlay.marketsResponse) {
    //     this.props.getMarketsForSelectedMatchRequest(match.id, true);
    //   }
    // }, (UserData.UpdateOddsInterval * 1000));
    this.props.getMarketsForSelectedMatchRequest(match.id, true);
  }


  onPressOdd(marketUID, oddData) {
    const selectedOdd = oddData;
    const { betSlips, selectedMatch } = this.props.mainGamePlay;

    selectedOdd.matchName = this.getMatchName();
    selectedOdd.matchID = selectedMatch.id;
    selectedOdd.marketUID = marketUID;
    selectedOdd.isOddsChanged = false;
    selectedOdd.sport = {name: this.props.navigation.state.params.gameName};
    
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
    const { selectedMatch } = this.props.mainGamePlay;
    const name = selectedMatch.name;
    return name;
    // if (!selectedMatch.settings) {
    //   return '';
    // }
    // const teamInfo = selectedMatch.settings.team_info;
    // const teams = _.values(teamInfo);
    // const homeTeam = _.find(teams, { qualifier: commonLocalizeStrings.home });
    // const awayTeam = _.find(teams, { qualifier: commonLocalizeStrings.away });
    // const name = `${homeTeam.name} vs ${awayTeam.name}`;
    // return name;
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

  _handleRefresh = () => {
    const match = this.props.navigation.state.params.selectedMatch;
    this.props.getMarketsForSelectedMatchRequest(match.id, true);
  }

  render() {
    const { isShowMarkets, mainGamePlay, tournaments } = this.props;
    const match = this.props.navigation.state.params.selectedMatch;
    const team = `${match.name}`;
    const teamNames = team.split(' vs ');
    const date = new Date(match.schedule_at);
    const matchDate = DateManager.formatDateWithDash(date);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title={this.props.navigation.state.params.tournamentSelected.title}
            openMenu={() => this.props.navigation.openDrawer()}
          />
          {/* <ScrollView style={{ flex: 1 }}> */}
          <View style={styles.sectionView}>
            <TournamentHeader
              gameName={this.props.navigation.state.params.gameName}
              tournamentName={this.props.navigation.state.params.tournamentSelected.title}
              gameIcon={this.props.navigation.state.params.gameIcon}
            />
            <View style={styles.matchDetailContainer}>
              <View style={styles.dateTimeContainer}>
                <CustomText title={matchDate} textStyle={styles.dateAndTimeTextStyle} />
                <CustomText title={`${hour}:${minutes}`} textStyle={styles.dateAndTimeTextStyle} />
              </View>
              <View style={styles.teamNameContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4}}>
                  <Text
                    style={styles.teamNameStyle}
                    numberOfLines={3}
                  >
                    {(teamNames && teamNames.length === 0) ? '' : teamNames[0]}
                  </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 1}}>
                  <Text
                    style={[styles.teamNameStyle, { margin: spacing.extraExtraSmall, color: UIColors.secondaryText }]}
                  >
                    Vs
                  </Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: spacing.extraExtraSmall, marginTop: spacing.extraExtraSmall, flex: 4}}>
                  <Text
                    style={styles.teamNameStyle}
                    numberOfLines={3}
                  >
                    {(teamNames && teamNames.length === 0) ? '' : teamNames[1]}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ textAlign: 'center', margin: spacing.small, fontSize: fontSizes.extraSmall, fontWeight: fontWeights.black, alignSelf: 'center', color: UIColors.secondaryText}}>
              {match.name}
            </Text>
            <MarketOdds
              onPressOdd={(marketUID, oddData) => this.onPressOdd(marketUID, oddData)}
              matchID={match.id}
              betSlips={mainGamePlay.betSlips}
              marketDataForMatch={mainGamePlay.matchMarketData}
              showOddsSpecifierName={(id, specifier) => this.showOddsSpecifierName(id, specifier)}
              refreshMarkets={() => this._handleRefresh()}
            />
          </View>
          {/* </ScrollView> */}
          {isShowMarkets && <Loader isAnimating={isShowMarkets} />}
        </ImageBackground>
      </View>
    );
  }
}

MarketsInMatchOdds.propTypes = {
  screenProps: PropTypes.object,
  listDataReducer: PropTypes.array,
  navigation: PropTypes.object,
  refreshMarkets: PropTypes.func,

};

MarketsInMatchOdds.defaultProps = {
  screenProps: {},
  listDataReducer: [],
  navigation: {},
  refreshMarkets: () => { },
};

const mapStateToProps = state => ({
  listDataReducer: state.listDataReducer,
  matchOddsReducer: state.matchOddsReducer,
  mainGamePlay: state.mainGamePlay,
  isShowMarkets: state.mainGamePlay.isShowMarkets,
  tournaments: getTournaments(state),
});

const mapDispatchToProps = () => UserActions;
const MarketOddsScreen = connect(mapStateToProps, mapDispatchToProps)(MarketsInMatchOdds);
export default MarketOddsScreen;

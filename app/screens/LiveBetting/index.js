import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  RefreshControl,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spacing, fontWeights, UIColors, fontSizes, itemSizes } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import HeaderContainer from '../../components/HeaderContainer';
import { SportBar } from './components/SportBar';
import MatchContainer from './components/MatchContainer';
import Loader from '../../components/Loader';
import { UserData } from '../../utils/global';
import { responsiveSize } from '../../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    margin: spacing.medium,
  },
  sportsHeader: {
    marginTop: spacing.medium,
    width: '100%',
    height: itemSizes.defaultButtonHeight,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.extraExtraSmall,
    justifyContent: 'space-between',
  },
  matchTextStyle: {
    marginLeft: spacing.medium,
    color: UIColors.primaryText,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.extraExtraSmall,
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

class LiveBetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtention: false,
      showFavExtention: false,
      showTournamentExtention: true,
      arrowImage: images.downGreyIcon,
      // colorTimer: false,
    };
    this.props.getLiveMatchesRequest(true);
    this.props.getMyFavoritesRequest();

    this.timer = setInterval(() => {
      // this.setState({ colorTimer: true });
      this.props.getLiveMatchesRequest(false);
      this.props.getMyFavoritesRequest();

    }, (UserData.UpdateOddsInterval * 1500));

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getIcon(sportName) {
    switch (sportName) {
      case 'Soccer':
        return images.footballIcon;
      case 'Basketball':
        return images.basketballIcon;
      case 'Handball':
        return images.handballIcon;
      case 'Vollyball':
        return images.volleyballIcon;
      case 'Ice Hockey':
        return images.icehokeyIcon;
      case 'Tennis':
        return images.tennisIcon;
      default:
        break;
    }
  }

  shouldExtendCmponent = (item) => {
    this.setState({ showExtention: !this.state.showExtention });
  }
  _handleRefresh = () => {
    
    this.props.getLiveMatchesRequest(true);
    this.props.getMyFavoritesRequest();
  }

  shouldFavExtend = () => {
    this.setState({ showFavExtention: !this.state.showFavExtention });
  }

  addRemoveFav = (action, matchId) => {
    switch (action) {
      case 'add':
        Alert.alert(
          'Confirm',
          'Add This Match To Favorites',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Add', onPress: () => {
                const data = {
                  matchId,
                };
                this.props.addToMyFavoritesRequest(data);
              },
            },
          ],
          { cancelable: false },
        );

        break;
      case 'remove':
        Alert.alert(
          'Confirm',
          'Remove This Match From Favorites',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Remove', onPress: () => {
                const data = {
                  matchId,
                };
                this.props.removeFromMyFavoritesRequest(data);
              },
            },
          ],
          { cancelable: false },
        );
        break;
      default:
        break;
    }
  }

  tournamentExtension = () => {
    this.setState({ showTournamentExtention: !this.state.showTournamentExtention})
    if (this.state.showTournamentExtention === false) {
      this.setState({ arrowImage: images.downGreyIcon });
    } else {
      this.setState({ arrowImage: images.rightArrowBlack });
    }
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    const isLoading = this.props.liveBettingReducer.isLoading;
    const liveMatches = this.props.liveBettingReducer.liveMatches;
    const favoriteMatches = this.props.liveBettingReducer.myFavorites;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title="Live Betting"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <ScrollView
            style={[styles.mainContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => this._handleRefresh()}
              />
            }
          >
            <SportBar
              sportsBarPressed={() => this.shouldFavExtend()}
              sportsBarIcon={images.highlightIcon}
              sportsBarTitle='My Live Favorites'
              // sportsCount={favoriteMatches.length}
            />
            {this.state.showFavExtention ?
              <FlatList
              data={favoriteMatches}
              extraData={this.props}
              renderItem={({ item }) => {
                return(
                <View style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <SportBar
                      sportsBarPressed={() => this.shouldExtendCmponent(item)}
                      sportsBarIcon={this.getIcon(item.name)}
                      sportsBarTitle={item.name}
                      sportsCount={item.matches && item.matches.length}
                    />
                  </View>
                    <View style={{ flex: 1, width: '100%' }}>
                      <FlatList
                        data={item.live_matches}
                        renderItem={ip => {
                          return(
                            <View style={[{ alignSelf: 'center', alignItems: 'center' }, isPortrait ? { width: '95%' } : { width: responsiveSize(570) }]}>
                              <TouchableOpacity
                                style={styles.sportsHeader}
                                // onPress={()=>this.tournamentExtension()}
                              >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                  <Text
                                    numberOfLines={2}
                                    style={styles.matchTextStyle}
                                  >
                                    {ip.item.tournament.name}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
                                  <View>
                                    <Image
                                      source={images.rightArrowWhite}
                                      style={{ height: itemSizes.iconRadius, width: itemSizes.iconRadius }}
                                    />
                                  </View>
                                </View>
                              </TouchableOpacity>
                              { this.state.showTournamentExtention ? 
                              <FlatList
                                data={ip.item.matches}
                                renderItem={singleMatchObj => {
                                  return(
                                  <MatchContainer
                                    addRemoveFav={matchId => this.addRemoveFav('remove', matchId)}
                                    starIcon={images.highlightIcon}
                                    colorTimer={this.state.colorTimer}
                                    liveSportsData={singleMatchObj.item}
                                  />
                                )}}
                              // keyExtractor={ip=> ip.id}
                              />
                            : null }
                            </View>
                          )}}
                       />
                  </View>
                  
                  {/* <View style={{ flex: 1, width: '100%' }}>
                    <Text style={{color: UIColors.newAppButtonGreenBackgroundColor, textAlign: 'center', alignSelf: 'center', fontSize: fontWeights.large, fontWeight: fontWeights.bold}}>
                      No matches available. 
                    </Text>
                  </View> */}
                  
                </View>
              )}}
            // keyExtractor={item => item.id}
            // extraData={selected}
            />
              // <FlatList
              //   data={favoriteMatches}
              //   extraData={this.props}
              //   renderItem={({ item }) => (
              //     <View style={[{ alignSelf: 'center', alignItems: 'center' }, isPortrait ? { width: '95%' } : { width: responsiveSize(570) }]}>
              //       <SportBar
              //         isPortrait={isPortrait}
              //         // sportsBarPressed={() => this.shouldFavExtend()}
              //         // sportsCount={item.matches.length}
              //         sportsBarIcon={this.getIcon(item.name)}
              //         sportsBarTitle={item.name}
              //       />
                 
              //         <View style={{ width: '100%'}}>
                        
              //           <FlatList
              //             data={item.live_matches}
              //             renderItem={ip => (
              //               <MatchContainer
              //                 addRemoveFav={matchId => this.addRemoveFav('remove', matchId)}
              //                 starIcon={images.highlightIcon}
              //                 // colorTimer={this.state.colorTimer}
              //                 matchCount={item.matches && item.matches.length}
              //                 liveSportsData={ip.item}
              //               />

              //             )}
              //           // keyExtractor={ip=> ip.id}
              //           />
              //       </View>
                    
              //     </View>
              //   )}
              // // keyExtractor={item => item.id}
              // // extraData={selected}
              // />
              : null
            }
            {(liveMatches && liveMatches.length === 0) ?
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                
                <Text style={{ color: UIColors.newAppButtonGreenBackgroundColor, textAlign: 'center', alignSelf: 'center', fontSize: fontSizes.large, fontWeight: fontWeights.bold}}>
                  No Live matches available. 
                </Text>
            </View>
            :
            <FlatList
              data={liveMatches}
              extraData={this.props}
              renderItem={({ item }) => {
                return(
                <View style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <SportBar
                      sportsBarPressed={() => this.shouldExtendCmponent(item)}
                      sportsBarIcon={this.getIcon(item.name)}
                      sportsBarTitle={item.name}
                      sportsCount={item.matches && item.matches.length}
                    />
                  </View>
                    <View style={{ flex: 1, width: '100%' }}>
                      
                      <FlatList
                        data={item.live_matches}
                        renderItem={ip => {
                          return(
                            <View style={[{ alignSelf: 'center', alignItems: 'center' }, isPortrait ? { width: '95%' } : { width: responsiveSize(570) }]}>
                              <TouchableOpacity
                                style={styles.sportsHeader}
                                // onPress={()=>this.tournamentExtension()}
                              >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                  <Text
                                    numberOfLines={2}
                                    style={styles.matchTextStyle}
                                  >
                                    {ip.item.tournament.name}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing.small }}>
                                  <View>
                                    <Image
                                      source={images.rightArrowWhite}
                                      style={{ height: itemSizes.iconRadius, width: itemSizes.iconRadius }}
                                    />
                                  </View>
                                </View>
                              </TouchableOpacity>
                              { this.state.showTournamentExtention ? 
                              <FlatList
                                data={ip.item.matches}
                                renderItem={singleMatchObj => {
                                  return(
                                  <MatchContainer
                                    addRemoveFav={matchId => this.addRemoveFav('add', matchId)}
                                    starIcon={images.greyStar}
                                    colorTimer={this.state.colorTimer}
                                    liveSportsData={singleMatchObj.item}
                                  />
                                )}}
                              // keyExtractor={ip=> ip.id}
                              />
                            : null }
                            </View>
                          )}}
                       />
                  </View>
                  
                  {/* <View style={{ flex: 1, width: '100%' }}>
                    <Text style={{color: UIColors.newAppButtonGreenBackgroundColor, textAlign: 'center', alignSelf: 'center', fontSize: fontWeights.large, fontWeight: fontWeights.bold}}>
                      No matches available. 
                    </Text>
                  </View> */}
                  
                </View>
              )}}
            // keyExtractor={item => item.id}
            // extraData={selected}
            />
                        
                      }
            
          </ScrollView>
          {isLoading && <Loader isAnimating={isLoading} />}
        </ImageBackground>
      </View>
    );
  }
}

LiveBetting.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
};

LiveBetting.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
};


const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  liveBettingReducer: state.liveBettingReducer,
});

const mapDispatchToProps = () => UserActions;
const LiveBettingScreen = connect(mapStateToProps, mapDispatchToProps)(LiveBetting);
export default LiveBettingScreen;

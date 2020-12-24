import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spacing, UIColors, fontSizes, fontWeights } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import HeaderContainer from '../../components/HeaderContainer';
import { SportBar } from './components/SportBar';
import MatchContainer from './components/MatchContainer';
import Loader from '../../components/Loader';
import { UserData } from '../../utils/global';

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
});

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtention: false,
    };
    const data = this.props.navigation.state.params.todayOrHighlight;
    this.props.getTodayRequest(data);
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
        return images.gameIcon;
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
    const data = this.props.navigation.state.params.todayOrHighlight;
    this.props.getTodayRequest(data);
  }

  getHeader() {
    switch (this.props.navigation.state.params.todayOrHighlight) {
      case 'highlight':
        return 'HIGHLIGHTS';
      case 'last_minutes':
        return "TODAY'S";
      default:
        return;
    }
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    const { isLoadingLBoard } = this.props.todayMatchReducer;
    const todayMatches = this.props.todayMatchReducer.todayMatches;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title={this.getHeader()}
            openMenu={() => this.props.navigation.openDrawer()}
          />
          {(todayMatches.length === 0) ?
              <View style={[styles.mainContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}>
                <Text style={{color: UIColors.newAppButtonGreenBackgroundColor, textAlign: 'center', alignSelf: 'center', fontSize: fontSizes.large, fontWeight: fontWeights.bold}}>
                  No matches available. 
                </Text>
              </View>
              : 
              <View style={[styles.mainContainer, { flexDirection: isPortrait ? 'column' : 'row' }]}>
            {/* <View style={{ flex: 1, alignItems: 'center' }}> */}
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => this._handleRefresh()}
                />
              }
              data={todayMatches}
              renderItem={item => (
                <MatchContainer
                matchItem={item}
                  matchCount={item.matches && item.matches.length}
                  liveSportsData={item}
                />
              )}
            // keyExtractor={ip=> ip.id}
            />
            {/* </View> */}
          </View>
            
          }
          
          {isLoadingLBoard && <Loader isAnimating={isLoadingLBoard} />}
        </ImageBackground>
      </View>
    );
  }
}

Today.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
};

Today.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
};


const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  liveBettingReducer: state.liveBettingReducer,
  todayMatchReducer: state.todayMatchReducer,
});

const mapDispatchToProps = () => UserActions;
const TodayScreen = connect(mapStateToProps, mapDispatchToProps)(Today);
export default TodayScreen;

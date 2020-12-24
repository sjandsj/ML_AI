import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UIColors, fontName, fontSizes, spacing } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import { SCREENS } from '../../utils/av_constants';
import HeaderContainer from '../../components/HeaderContainer';
import { Button } from './components/Buttons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
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
  },
  backdrop: {
    flex: 1,
  },
  topImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    margin: spacing.medium,
  },
  buttonView: {
    padding: 20,
  },
  textStyle: {
    color: UIColors.primaryText,
    fontFamily: fontName.sourceSansProBold,
    fontSize: fontSizes.medium,
  },
  subViewForButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

let menuItems = [];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1,
    };
    // this.props.getSportsRequest();
  }

  componentDidMount() {
    this.props.getSettingsRequest();
  }

  onPressSports() {
    this.props.navigation.navigate(SCREENS.MAIN_GAMEPLAY_SCREEN, {});
  }

  onPressCasino() {
    this.props.navigation.navigate(SCREENS.CASINO_SCREEN, {});
  }

  onPressLiveCasino() {
    this.props.navigation.navigate(SCREENS.LIVE_CASINO_SCREEN, {});
  }

  setHomeMenu = (isLoggedin) => {
    if (isLoggedin) {
      menuItems = [
        {
          title: 'SPORTS BETTING',
          value: 1,
          type: 'SPORTS BETTING',
          image: images.sportBettingIcon,
        },
        {
          title: 'LIVE BETTING',
          value: 1,
          type: 'LIVE BETTING',
          image: images.liveBettingIcon,
        },
        {
          title: 'HIGHLIGHTS',
          value: 1,
          type: 'HIGHLIGHTS',
          image: images.highlightIcon,
        },
        {
          title: 'LIVE CASINO',
          value: 6,
          type: 'LIVE CASINO',
          image: images.liveCasinoIcon,
        },
        {
          title: 'CASINO',
          value: 12,
          type: 'CASINO',
          image: images.casinoIcon,
        },
        {
          title: 'VIRTUAL GAMES',
          value: 13,
          type: 'VIRTUAL GAMES',
          image: images.virtualSportsIcon,
        },
        {
          title: 'SETTING',
          value: null,
          type: 'SETTING',
          image: images.settingIcon,
        },
        {
          title: 'FUND TRANSFERS',
          value: null,
          type: 'FUND TRANSFERS',
          image: images.HomeFundTranfer,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
      ];
    } else {
      menuItems = [
        {
          title: 'SPORTS BETTING',
          value: 1,
          type: 'SPORTS BETTING',
          image: images.sportBettingIcon,
        },
        {
          title: 'LIVE BETTING',
          value: 1,
          type: 'LIVE BETTING',
          image: images.liveBettingIcon,
        },
        {
          title: 'HIGHLIGHTS',
          value: 1,
          type: 'HIGHLIGHTS',
          image: images.highlightIcon,
        },
        {
          title: 'LIVE CASINO',
          value: 6,
          type: 'LIVE CASINO',
          image: images.liveCasinoIcon,
        },
        {
          title: 'CASINO',
          value: 12,
          type: 'CASINO',
          image: images.casinoIcon,
        },
        {
          title: 'VIRTUAL GAMES',
          value: 13,
          type: 'VIRTUAL GAMES',
          image: images.virtualSportsIcon,
        },
        {
          title: 'LOGIN/REGISTER',
          value: null,
          type: 'LOGIN/REGISTER',
          image: images.loginIcon,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
        {
          title: 'Forever',
          value: 'extra',
          type: 'Forever',
          image: images.sportBettingIcon,
        },
      ];
    }
    return menuItems;
  }

  buttonPressed(value, item) {

    if (item.title === 'SPORTS BETTING') {
      this.props.navigation.navigate('SportsBettingScreen');
    } else if (item.title === 'LIVE CASINO') {
      this.props.navigation.navigate(SCREENS.LIVE_CASINO_SCREEN, {});
    } else if (item.title === 'CASINO') {
      this.props.navigation.navigate(SCREENS.CASINO_SCREEN, {});
    } else if (item.title === 'LOGIN/REGISTER') {
      this.props.navigation.navigate('AuthenticationScreen', {});
    } else if (item.title === 'LIVE BETTING') {
      this.props.navigation.navigate('LiveBettingScreen', {});
    } else if (item.title === 'VIRTUAL GAMES') {
      this.props.navigation.navigate('VirtualGamesScreen', {});
    } else if (item.title === 'SETTING') {
      this.props.navigation.navigate('NewEditProfileScreen', {});
    } else if (item.title === 'FUND TRANSFERS') {
      this.props.navigation.navigate('FundsScreen', {});
    } else if (item.title === 'HIGHLIGHTS') {
      const todayOrHighlight = 'highlight';
      this.props.navigation.navigate('TodayScreen', {
        todayOrHighlight,
      });
    }
  }

  render() {
    const { isPortrait, isLoggedin } = this.props.screenProps;
    this.setHomeMenu(isLoggedin);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            title="Home"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <View style={[styles.container, { padding: 15 }]}>
            <FlatList
              data={menuItems}
              extraData={this.props}
              numColumns={3} // set number of columns
              renderItem={({ item, index }) => (
                <Button
                  onClick={value => this.buttonPressed(value, item)}
                  title={item.title}
                  iconImage={item.image}
                  value={item.value}
                />
              )}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

Home.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
  getSettingsRequest: PropTypes.func,
};

Home.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
  getSettingsRequest: () => { },
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
});

const mapDispatchToProps = () => UserActions;
const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeScreen;

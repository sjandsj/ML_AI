import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UIColors, fontName, fontSizes, spacing, itemSizes } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import HeaderContainer from '../../components/HeaderContainer';
import { Button } from './components/Button';
import { SportsButton } from './components/SportsButton';
import Loader from '../../components/Loader';

const menuItems = [
  {
    title: 'LIVE BETTING',
    value: 1,
    type: 'LIVE BETTING',
    image: images.liveBettingIcon,
    iconBackground: images.iconBackground,
  },
  {
    title: 'HIGHLIGHTS',
    value: 1,
    type: 'HIGHLIGHTS',
    image: images.highlightIcon,
    iconBackground: images.iconBackground,

  },
  {
    title: 'TODAY',
    value: 6,
    type: 'TODAY',
    image: images.calanderImage,
    iconBackground: images.iconBackground,
  },
  // {
  //   title: 'SOCCER',
  //   value: 6,
  //   type: 'SOCCER',
  //   image: images.footballIcon,
  //   iconBackground: images.iconBackgroundGrey,

  // },
];

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
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

let todayOrHighlight;


class SportsBetting extends Component {

  constructor(props){
    super(props);
    this.props.getAllSportsRequest();
  }

  buttonPressed(value, item) {
    if (item.title === 'LIVE BETTING') {
      this.props.navigation.navigate('LiveBettingScreen', {});
    } else if (item.title === 'HIGHLIGHTS') {
      todayOrHighlight = 'highlight';
      this.props.navigation.navigate('TodayScreen', {
        todayOrHighlight,
      });
    } else if (item.title === 'TODAY') {
      todayOrHighlight = 'last_minutes';
      this.props.navigation.navigate('TodayScreen', {
        todayOrHighlight,
      });
    } else if (item.title === 'SOCCER') {
      // this.props.navigation.navigate('FundsScreen', {});
      const gameSelected = item.title;
      this.props.navigation.navigate('CountryListScreen', {
        gameSelected,
      });
    }
  }

  sportPressed(gameSelected) {
    // if (gameSelected.number_of_matches===0 || null) {
    //   Alert.alert('Comming Soon');
    // } else {
      this.props.navigation.navigate('CountryListScreen', {
        gameSelected,
      });
   // }
  }


  sportSelected(gameSelected) {
    this.props.navigation.navigate('CountryListScreen', {
      gameSelected,
    });
  }

  render() {
    const sports = this.props.listDataReducer.sports;
    const { isLoadingLBoard } = this.props.listDataReducer;
     return (
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton={false}
            title="Sports Betting"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <View style={[{ paddingBottom: 0, padding: 15 }]}>
            <FlatList
              data={menuItems}
              // style={{backgroundColor: 'red'}}
              extraData={this.props}
              numColumns={3} // set number of columns
              renderItem={({ item, index }) => (
                <Button
                  onClick={value => this.buttonPressed(value, item)}
                  title={item.title}
                  iconImage={item.image}
                  value={item.value}
                  iconBackground={item.iconBackground}
                />   
              )}
            />
            </View>
            <View style={[{paddingTop: 0, padding: 15 }]}>
            <FlatList
              data={sports.sort((a, b) => (a.id.toString()).localeCompare(b.id.toString()))}
              extraData={this.props}
              numColumns={3} // set number of columns
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <SportsButton
                  onClick={value => this.sportPressed(item)}
                  title={item.name}
                  imageUrl={item.image_url}
                />
                
              )}
            />
          </View>
          {isLoadingLBoard && <Loader isAnimating={isLoadingLBoard} />}
        </ImageBackground>
      </View>
    );
  }
}

SportsBetting.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
};

SportsBetting.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
};


const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  listDataReducer: state.listDataReducer,
});

const mapDispatchToProps = () => UserActions;
const SportsBettingScreen = connect(mapStateToProps, mapDispatchToProps)(SportsBetting);
export default SportsBettingScreen;

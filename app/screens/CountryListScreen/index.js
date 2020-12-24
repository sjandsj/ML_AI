import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { UIColors, fontName, fontSizes, spacing, itemSizes, fontWeights } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images';
import HeaderContainer from '../../components/HeaderContainer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomText from '../../components/CustomText';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
  cellContainer: {
    flex: 1,
    height: itemSizes.defaultButtonHeight,
    margin: spacing.medium,
    borderBottomWidth: spacing.border,
    borderColor: UIColors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: itemSizes.iconExtraLarge,
    width: itemSizes.iconExtraLarge,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  viewForIconAndText: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInCell: {
    color: UIColors.secondaryText,
    marginLeft: 10,
    alignSelf: 'flex-end',
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.bold,
  },
  viewForBlueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.borderDouble,
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
  comingSoonText: {
    color: UIColors.newAppButtonGreenBackgroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.large,
    textAlign: 'center',
  },
});

let gameIcon;

class CountryList extends Component {
  constructor(props) {
    super(props);
    const id = this.props.navigation.state.params.gameSelected.id;
    const data = {
      sportsId: id,
    };
    this.props.getCountryListRequest(data);
  }

  componentWillMount() {
    gameIcon = this.props.navigation.state.params.gameSelected.image_url;
  }

  countrySelected(countrySelected) {
    const gameSelected = this.props.navigation.state.params.gameSelected;
    this.props.navigation.navigate('TournamentListScreen', {
      gameSelected,
      countrySelected,
    });
}

ListEmpty = () => {
  return (
    <View style={[styles.container, { margin: spacing.extraExtraLarge, justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
};

  _handleRefresh = () => {
    const id = this.props.navigation.state.params.gameSelected.id;
    const data = {
      sportsId: id,
    };
    this.props.getCountryListRequest(data);
  }

  render() {
    const { isLoadingLBoard } = this.props.listDataReducer;
    const countryList = this.props.listDataReducer.countries;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title={this.props.navigation.state.params.gameSelected.name}
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <FlatList
            data={countryList}
            keyExtractor={item => item.uid}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => this._handleRefresh()}
              />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.countrySelected(item)}
                style={styles.cellContainer}
              >
                <View style={styles.viewForIconAndText}>
                  <Image style={styles.iconStyle}
                    source={{uri: gameIcon}}
                  />
                  <CustomText title={item.name} textStyle={styles.textInCell} />
                </View>
                <View style={styles.viewForBlueBox}>
                  <CustomText title={item && item.number_of_matches} textStyle={styles.blueBoxTextStyle} />
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={this.ListEmpty}
          />
          {isLoadingLBoard && <Loader isAnimating={isLoadingLBoard} />}
        </ImageBackground>
      </View>
    );
  }
}

CountryList.propTypes = {
  screenProps: PropTypes.object,
  listDataReducer: PropTypes.array,
  navigation: PropTypes.object,
};

CountryList.defaultProps = {
  screenProps: {},
  listDataReducer: [],
  navigation: {},
};

const mapStateToProps = state => ({
  listDataReducer: state.listDataReducer,
});

const mapDispatchToProps = () => UserActions;
const CountryListScreen = connect(mapStateToProps, mapDispatchToProps)(CountryList);
export default CountryListScreen;

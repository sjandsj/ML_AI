import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import NavigationHeader from '../../components/NavigationHeader';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { images } from '../../assets/images';
import { UIColors, spacing, itemSizes, fontSizes } from '../../utils/variables';
import TopTab from '../../components/TopTab';
import SearchFilter from '../../components/SearchFilter';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: UIColors.appBackGroundColor,
    borderTopLeftRadius: spacing.large,
    borderTopRightRadius: spacing.large,
    marginTop: spacing.medium,
  },
});

class Market extends Component {

  constructor(props){
    super(props);
  }
    
  render() {
    return(
      <ImageBackground resizeMode={'repeat'} source={images.headerImage} style={{flex: 1}}>
        <NavigationHeader
          showLeftButton
          showLoginSignupPicker
          logo={images.logo}
        />
        <SearchFilter
          //filterContainer={{position: 'absolute', top: 30}}
        />
        <View style={styles.mainContainer}>

        </View>
        <TopTab />
      </ImageBackground>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = () => UserActions;

const MarketScreen = connect(mapStateToProps, mapDispatchToProps)(Market);

export default MarketScreen;

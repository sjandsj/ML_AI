import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import Navigation from '../../utils/navigation';
import { screenNames, appIntervals } from '../../utils/constant';
import { images } from '../../assets/images';
import { responsiveSize } from '../../utils/utils';
import { fontSizes, fontWeights, spacing, fontNames } from '../../utils/variables';

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    //justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'dimgrey',
  },
  textStyle: {
     marginTop: '50%',
    textAlign: 'center',
    color: 'black',
    fontSize: responsiveSize(50),
    fontWeight: fontWeights.black,
  },
  nameText: {
    fontWeight: fontWeights.black,
    fontFamily: fontNames.sourceSansProBoldItalic,
    fontStyle: 'italic',
    color: 'floralwhite',
  },
  inAssociationView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  creditView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  websiteName: {
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: responsiveSize(20),
    color: 'black',
  },
});

class Splash extends Component {
  constructor(props) {
    super(props);
    Navigation.sharedInstance().setAppNavigation(props.navigation);
  }

  componentDidMount() {
     setTimeout(() => { this.goToScreen() }, appIntervals.SPLASH_INTERVAL);
  }

  goToScreen() {
    // this.props.getSportsRequest();
    let screenName = screenNames.HOME_SCREEN;
    Navigation.sharedInstance().resetRouteName(screenName);
  }

  render() {
    return (
     <View style={styles.container}>
       <Text style={styles.textStyle}>
         Covid-19 Tracker
       </Text>
       <View style={styles.inAssociationView}>
        <Text style={{alignSelf: 'flex-end', textAlign: 'right', marginTop: responsiveSize(20), color: 'black'}}>
           In association with - &nbsp;
        </Text>
        <Text style={styles.websiteName}>
          covid19india.org
        </Text>
       </View>
       <View style={styles.creditView}>
        <Text style={{color: 'floralwhite'}}>
            By -:- &nbsp;
        </Text>
        <Text style={styles.nameText}>
           Shubhanshu Jain
        </Text>
       </View>
     </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashScreen;


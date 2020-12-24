
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopTabBar from './components/TabBar';
import UserActions from '../../actions/index';
import BetSlipContainer from './components/BetSlipContainer';
import SingleBetSlipContainer from './components/SingleBetSlipContainer';
import { UIColors, itemSizes, fontSizes, fontWeights } from '../../utils/variables';
import { images } from '../../assets/images/';
import HeaderContainer from '../../components/HeaderContainer';
import BackgroundMessageNew from '../../components/BackgroundMessageNew';
import { showPopupAlertWithTitle, showOptionAlert } from '../../utils/showAlert';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import { UserData } from '../../utils/global';
import Navigation from '../../utils/navigation';
import { SCREENS } from '../../utils/av_constants';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
  tabbarHeader: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: 0,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: itemSizes.defaultHeight,
  },
  menuItemText: {
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.medium,
    color: UIColors.newAppButtonGreenBackgroundColor,
  },
  styleView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class BetSlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalStacks: '',
      maxGain: 0,
      isUpdateData: false,
    };
  }
  onTabPress(tab, index) {
    this.setState({
      tabIndex: index,
    });
  }
  onSelectedItem(item) {
    this.onRemoveBetFromBetSlips(item);
  }

  onRemoveBetFromBetSlips(bet) {
    this.props.deleteBetSlips(bet);
  }

  onChangeText(text, type) {
    if (type === 'totalStacks') {
      this.setState({
        totalStacks: text,
      });
    }
    if (type === 'maxGain') {
      this.setState({
        maxGain: text,
      });
    }
  }

  onChangeTextSingle(text, item) {
    const { mainGamePlay } = this.props;
    const betSlipsData = mainGamePlay && mainGamePlay.betSlips;
    const textValue = text;// `${parseFloat(text)}`;
    item.stake = textValue === 'NaN' ? '' : textValue;
    for (let i = 0; i < betSlipsData.length; i++) {
      const itenValue = betSlipsData[i];
      if (itenValue.id === item.id && itenValue.marketID === item.marketID && itenValue.matchID === item.matchID) {
        betSlipsData[i] = item;
        break;
      }
    }
    this.setState({ isUpdateData: true });
  }

  onPlaceBet() {
    
    if (UserData.BearerToken) {
      const stackNumber = parseFloat(this.state.totalStacks);
      const betSlipsData = mainGamePlay && mainGamePlay.betSlips;
      if (betSlipsData && betSlipsData.length === 1) {
        if (isNaN(stackNumber)) {
          showPopupAlertWithTitle('', 'Please enter a valid number');
          return;
        }
      }
      
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
        slip.outcome_name = element.name;
        if (element.handicap) {
          slip.identifier = `{:handicap=>'${element.handicap}'}`;
        } else {
          slip.identifier = '{}';
        }
        return slip;
      };

      const { mainGamePlay } = this.props;
      if ( mainGamePlay.betSlips &&  mainGamePlay.betSlips.length > 1) {
        _.forEach(mainGamePlay.betSlips, (element) => {
          // if (!_.isEmpty(stackNumber) && stackNumber > 0) {
          betSlipsToPost.bet_slips.push(setSlip(element));
          // }
        });
        betSlipsToPost.bet_type = 'combo';
        betSlipsToPost.combo_bet_stake = parseFloat(stackNumber);

        if (betSlipsToPost.bet_slips.length > 0
          && betSlipsToPost.bet_slips.length === mainGamePlay.betSlips.length) {
          this.props.postBetSlipsRequest(betSlipsToPost);
          // this.setState({ totalStacks: '' });
        } else {
          this.showAler();
        }
      } else if ( mainGamePlay.betSlips &&  mainGamePlay.betSlips.length === 1) {
        _.forEach(mainGamePlay.betSlips, (element) => {
          if (!_.isEmpty(element.stake) && element.stake > 0) {
            betSlipsToPost.bet_slips.push(setSlip(element));
          }
        });
        if (betSlipsToPost.bet_slips.length > 0 && betSlipsToPost.bet_slips.length === mainGamePlay.betSlips.length) {
          this.props.postBetSlipsRequest(betSlipsToPost);
        } else {
          this.showAler();
        }
      }
    } else {
      showOptionAlert(
        commonLocalizeStrings.alert,
        commonLocalizeStrings.pleaseLogin,
        commonLocalizeStrings.ok,
        commonLocalizeStrings.cancel,
        text => text === 0 && this.loginAction(),
      );
    }
  }
  showAler() {
    showPopupAlertWithTitle(
      commonLocalizeStrings.alert,
      commonLocalizeStrings.enterStakeValue,
    );
  }

  loginAction() {
    Navigation.sharedInstance().pushToScreen(SCREENS.WELCOME_SCREEN);
  }

  render() {
    const { mainGamePlay, betSlipsOddsChanged } = this.props;
    const betSlipsData = mainGamePlay && mainGamePlay.betSlips;
    const isLoadingPlaceBet = this.props.mainGamePlay.isLoadingPlaceBet;
    const netOddsForComboBet = mainGamePlay && mainGamePlay.netOddsForComboBet;
    const foldsInBetSlip = mainGamePlay && mainGamePlay.foldsInBetSlip; 
    const walletLimit = this.props.settings && this.props.settings.walletLimit;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton={false}
            title="BET SLIP"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior={'padding'}>
            <ScrollView>
              {betSlipsData.length <= 0 &&
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: itemSizes.largeWidth,
                }}
                >
                  <BackgroundMessageNew
                    title={'No bets available'}
                  />
                </View>
              }
            
              {betSlipsData && betSlipsData.length === 1 ?
                <SingleBetSlipContainer
                  walletLimit={walletLimit}
                  onPlaceBet={() => this.onPlaceBet()}
                  onPressRow={item => this.onSelectedItem(item)}
                  menuItems={betSlipsData}
                  netOddsForComboBet={netOddsForComboBet}
                  foldsInBetSlip={foldsInBetSlip}
                  totalStacks={this.state.totalStacks}
                  maxGain={this.state.maxGain}
                  isUpdateData={this.state.isUpdateData}
                  onChangeText={(text, item) => this.onChangeTextSingle(text, item)}
                />
                :
                <BetSlipContainer
                  walletLimit={walletLimit}
                  onPlaceBet={() => this.onPlaceBet()}
                  onPressRow={item => this.onSelectedItem(item)}
                  menuItems={betSlipsData}
                  betSlipsOddsChanged={betSlipsOddsChanged}
                  netOddsForComboBet={netOddsForComboBet}
                  foldsInBetSlip={foldsInBetSlip}
                  totalStacks={this.state.totalStacks}
                  maxGain={this.state.maxGain}
                  onChangeText={(text, type) => this.onChangeText(text, type)}
                />
              }           
            </ScrollView>
          </KeyboardAwareScrollView>
        </ImageBackground>
        {isLoadingPlaceBet && <Loader isAnimating={isLoadingPlaceBet} />}
      </View>
    );
  }
}

BetSlip.propTypes = {
  isLoading: PropTypes.bool,
};

BetSlip.defaultProps = {
  isLoading: false,
};

const mapStateToProps = state => ({
  mainGamePlay: state.mainGamePlay,
  settings: state.getSettings,
});

const mapDispatchToProps = () => UserActions;

const BetSlipScreen = connect(mapStateToProps, mapDispatchToProps)(BetSlip);

export default BetSlipScreen;

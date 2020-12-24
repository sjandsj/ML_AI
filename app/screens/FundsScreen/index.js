import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Text,
  DatePickerAndroid,
  DatePickerIOS,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { commonLocalizeStrings } from '../../localization/commonLocalizeStrings';
import BackgrounMessage from '../../components/BackgroundMessage';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { UIColors, fontName, fontSizes, spacing, itemSizes, fontWeights } from '../../utils/variables';
import UserActions from '../../actions';
import { images } from '../../assets/images/';
import { SCREENS } from '../../utils/av_constants';
import HeaderContainer from '../../components/HeaderContainer';
import TabBar from '../../components/TabBar';
import CustomText from '../../components/CustomText';
import { transactionCatagory, calenderObject } from '../../utils/enum';
import Loader from '../../components/Loader';
import Games from '../PendingPlaysAndParlays/components/Games';
import { UserData } from '../../utils/global';
import CustomTextInput from '../../components/CustomTextInput';
import { responsiveSize } from '../../utils/utils';
import DateManager from '../../utils/dateManager';
import { InputKey, KeyboardType, ReturnKeyType } from '../../utils/constants';
import { isIOS } from '../../utils/platformSpecific';
import { showPopupAlertWithTitle } from '../../utils/showAlert';
import { isValidUsername } from '../../utils/validators';
import { toFixTwoDigitAfterDecimal } from '../../utils/utils_functions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbarHeader: {
    height: itemSizes.searchHeader,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.semiMedium,
    marginBottom: spacing.semiMedium,
    // marginBottom: 0,
    // width: '100%',
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    margin: spacing.medium,
  },
  blackText: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.extraSmall,
    fontWeight: fontWeights.bold,
  },
  textInput: {
    // flex: 1,
    fontSize: fontSizes.small,
    color: UIColors.primaryText,
    // backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    borderRadius: responsiveSize(5),
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
  },
  submitButton: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    margin: spacing.medium,
    borderRadius: spacing.small,
    justifyContent: 'center',
    alignItems: 'center',
    height: itemSizes.defaultButtonHeight,
  },
  submitButtonText: {
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.bold,
    color: UIColors.primaryText,
  },
  dropDownCointainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: itemSizes.itemSizes280,
  },
  dropDownCell: {
    width: '100%',
    height: itemSizes.defaultSmallButtonHeight,
    borderBottomWidth: spacing.borderDouble,
    borderBottomColor: UIColors.newAppButtonGreenBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownCellText: {
    color: UIColors.secondaryText,
    fontSize: fontSizes.medium,
    fontWeight: fontWeights.book,
  },
  dateContainer: {
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    height: responsiveSize(30),
    width: responsiveSize(150),
    // marginLeft: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.small,
    justifyContent: 'space-between',
    marginRight: spacing.small,
  },
  dateContainerText: {
    color: UIColors.primaryText,
  },
  pickerModal: {

  },
  pickeContainer: {
    flex: 1,
    backgroundColor: UIColors.clearColor,
    margin: spacing.medium,
    borderRadius: 3,
  },
  transactionHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: spacing.medium,
    width: responsiveSize(350),
    height: itemSizes.itemWidth,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
    borderRadius: spacing.small,
  },
  transactionListView: {
    // height: itemSizes.headerSize,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    margin: spacing.small,
    width: responsiveSize(350),
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'gray',
  },
});

let payTo;
let isOpenDOBPickerForFrom = false;
let isOpenDOBPickerForTo = false;
const date = new Date();
// let payTo;

class Funds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      username: '',
      amount: 0,
      transactionCatagoryState: transactionCatagory.all,
      transactionCatagoryString: 'All Transactions',
      catagoryModalVisible: false,
      from: date,
      // refrenceOfFrom: DateManager.formatReverseDateWithDash(date),
      to: date,
      // refrenceOfTo: DateManager.formatReverseDateWithDash(date),
      birthDate: date,
      isShowDatePicker: false,
      datepickerFlag: '',
      showTransaction: false,
      // isOpenDOBPicker
    };
  }

  componentWillMount() {
    this.showHistory();
  }

  onTabPress(tab, index) {
    this.setState({
      tabIndex: index,
    });
  }

  setModalVisible = (visible, valueSelected, stringToDisplay) => {
    this.setState({
      catagoryModalVisible: visible,
      transactionCatagoryState: valueSelected,
      transactionCatagoryString: stringToDisplay,
    });
  }

  verifyUsername = () => {
    if (!isValidUsername(this.state.username)) {
      showPopupAlertWithTitle('', 'Please enter a valid username');
    } else {
      this.props.getUserDetailsRequest(this.state.username);
    }
  }

  transferAmount = () => {
    if (!isValidUsername(this.state.username)) {
      showPopupAlertWithTitle('', 'Please enter a valid username and verify');
      return;
    } else if (this.state.amount < 1 || this.state.amount === '') {
      showPopupAlertWithTitle('', 'Please enter a valid amount');
      return;
    }
    const { payTo } = this.props.fundsTransferReducer;
    if (!_.isEmpty(payTo)) {
      Alert.alert(
        'Confirm',
        `Send ${toFixTwoDigitAfterDecimal(this.state.amount)} To ${this.state.username}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm', onPress: () => {
              const data = {
                userId: payTo.id,
                amount: toFixTwoDigitAfterDecimal(this.state.amount),
              };
              this.props.postTransferAmountRequest(data);
              // this.showHistory();
              this.setState({ amount: '' });
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      showPopupAlertWithTitle('', 'Please enter a valid username and verify');
    }
  }


  onChangeDobText(dob) {
    this.setState({ dob });
  }

  setDOBDate(newDate) {
    this.setState({ birthDate: newDate });
  }

  updateStateDOB(datepickerFlag) {
    this.setState({
      isShowDatePicker: !this.state.isShowDatePicker,
      datepickerFlag,
    });
  }

  dismissKeyBoard() {
    Keyboard.dismiss();
    if (this.state.isShowDatePicker) {
      this.setState({ isShowDatePicker: false });
    }
  }

  showDOBPicker() {
    Keyboard.dismiss();
    switch (this.state.datepickerFlag) {
      case 'from':
        isOpenDOBPickerForFrom = true;
        break;
      case 'to':
        isOpenDOBPickerForTo = true;
        break;
      default:
        break;
    }
    if (isIOS) {
      return (
        <View style={{ flex: 1 }}>
          <DatePickerIOS
            date={this.state.birthDate}
            mode="date"
            onDateChange={this.setDOBDate}
            minimumDate={new Date((date.getFullYear()), date.getMonth(), date.getDate())}
          />
          <View style={[styles.cellView, { flexDirection: 'row' }]}>
            <TouchableOpacity
              onPress={() => this.updateStateDOB()}
              style={styles.okCancelButton}
            >
              <Text style={styles.okCancelButtonText}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
    this.androidPicker();
    return null;
  }

  androidPicker = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: new Date(),
        minDate: this.minDate(date),
        maxDate: date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        switch (this.state.datepickerFlag) {
          case 'from':
            this.setState({ isShowDatePicker: false, from: date });
          case 'to':
            this.setState({ isShowDatePicker: false, to: date });
        }
      } else {
        this.setState({ isShowDatePicker: false });
      }
    } catch ({ code, message }) {
      console.warn('Warning !', message);
    }
  }

  minDate(date) {
    switch (this.state.datepickerFlag) {
      case 'from':
        return;
      case 'to':
        return new Date((this.state.from.getFullYear()), this.state.from.getMonth(), this.state.from.getDate());
    }
  }

  maxDate() {
    switch (this.state.datepickerFlag) {
      case 'from':
        return new Date((date.getFullYear()), date.getMonth(), date.getDate());
      case 'to':
        return new Date((date.getFullYear()), date.getMonth(), date.getDate());
    }
  }

  showHistory() {
    if (this.state.transactionCatagoryState === 'Select Category' || this.state.transactionCatagoryState === null) {
      alert('Please Select Category');
    } else {
      const data = {
        category: this.state.transactionCatagoryState,
        min_date: `${DateManager.formatDateWithDash(this.state.from)}`,
        max_date: `${DateManager.formatDateWithDash(this.state.to)}`,
      };
      this.props.getTransactionHistoryRequest(data);
      this.setState({ showTransaction: true });
    }
  }

  getIcon(transactionType) {
    switch (transactionType) {
      case 'debit':
        return images.downArrowRed;
      case 'credit':
        return images.upArrowGreen;
      default:
    }
  }

  render() {
    const { isPortrait } = this.props.screenProps;
    // const { isLoadingGetBets } = this.props.mainGamePlay;
    const isLoading = this.props.fundsTransferReducer.isLoadingLBoard;
    const transactionHistory = this.props.fundsTransferReducer.transactionHistory;
    const { payTo } = this.props.fundsTransferReducer;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBg}
          source={images.homeBackgroundImage}
        >
          <HeaderContainer
            showBackButton
            title="FUND TRANSFER"
            openMenu={() => this.props.navigation.openDrawer()}
          />
          <View style={styles.mainContainer}>
            <View style={styles.tabbarHeader}>
              <TabBar
                tabsList={[
                  'TRANSFER FUND',
                  'HISTORY',
                ]}
                onTabSelect={(tab, index) => this.onTabPress(tab, index)}
              />
            </View>
            {this.state.tabIndex === 0 &&
              <ScrollView style={{ flex: 1 }}>
                <View style={{
                  alignItems: 'center', justifyContent: 'space-between', height: responsiveSize(100), flexDirection: 'row', margin: spacing.medium,
                }}
                >
                  <CustomText title="Username" textStyle={styles.blackText} />
                  <View style={isPortrait ? { width: responsiveSize(200) } : { width: responsiveSize(400) }}>
                    <CustomTextInput
                      textInput={StyleSheet.flatten([styles.blackText, { marginLeft: spacing.medium, fontSize: fontSizes.extraSmall }])}
                      inputView={StyleSheet.flatten({
                        borderRadius: responsiveSize(5), backgroundColor: UIColors.primaryText, flex: 1, justifyContent: 'center',
                      })}
                      placeholder="Enter Here"
                      placeholderTextColor={UIColors.secondaryText}
                      value={this.state.username}
                      returnKeyType={ReturnKeyType.done}
                      onChangeText={value => this.setState({ username: value })}
                    />
                    <TouchableOpacity
                      onPress={() => this.verifyUsername()}
                      style={[StyleSheet.flatten(styles.textInputView), { marginTop: spacing.small, justifyContent: 'center' }]}
                    >
                      <CustomText title="Verify" textStyle={[StyleSheet.flatten(styles.textInput), { alignSelf: 'center' }]} />
                    </TouchableOpacity>
                  </View>
                </View>


                {!_.isEmpty(payTo) &&
                  <View>
                    <View style={{ justifyContent: 'center', margin: spacing.medium }}>
                      <CustomText title="Details" textStyle={styles.blackText} />
                    </View>
                    <View style={{
                      justifyContent: 'space-between', margin: spacing.medium, alignItems: 'center', flexDirection: 'row',
                    }}
                    >
                      <CustomText title="Username" textStyle={styles.blackText} />
                      {!_.isEmpty(payTo) &&
                        <CustomText title={payTo.username} textStyle={[styles.blackText, { marginLeft: spacing.medium, width: responsiveSize(200) }]} />
                      }
                    </View>
                    <View style={{
                      justifyContent: 'space-between', margin: spacing.medium, alignItems: 'center', flexDirection: 'row',
                    }}
                    >
                      <CustomText title="Name" textStyle={styles.blackText} />
                      {!_.isEmpty(payTo) &&
                        <CustomText title={`${payTo.first_name} ${payTo.last_name}`} textStyle={[styles.blackText, { marginLeft: spacing.medium, width: responsiveSize(200) }]} />
                      }

                    </View>
                    <View style={{
                      alignItems: 'center', justifyContent: 'space-between', height: responsiveSize(50), flexDirection: 'row', margin: spacing.medium,
                    }}
                    >
                      <CustomText title="Amount" textStyle={styles.blackText} />
                      <View style={isPortrait ? { width: responsiveSize(200) } : { width: responsiveSize(400) }}>
                        <CustomTextInput
                          textInput={StyleSheet.flatten([styles.blackText, { marginLeft: spacing.medium, fontSize: fontSizes.extraSmall }])}
                          inputView={StyleSheet.flatten({
                            borderRadius: responsiveSize(5), backgroundColor: UIColors.primaryText, flex: 1, justifyContent: 'center',
                          })}
                          keyboardType={'numeric'}
                          maxLength={10}
                          value={this.state.amount}
                          returnKeyType={ReturnKeyType.done}
                          onChangeText={value => this.setState({ amount: value })}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.transferAmount()}
                      style={styles.submitButton}
                    >
                      <CustomText title="SUBMIT" textStyle={styles.submitButtonText} />
                    </TouchableOpacity>
                  </View>

                }
              </ScrollView>
            }
            {this.state.tabIndex === 1 &&
              <ScrollView style={{ flex: 1 }}>
                <View style={{
                  alignItems: 'center', justifyContent: 'space-between', height: responsiveSize(80), flexDirection: 'row', margin: spacing.medium,
                }}
                >
                  <CustomText title="Transaction Category" textStyle={[styles.blackText, { marginRight: spacing.small }]} />
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, this.state.transactionCatagoryState)}
                    style={{
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: UIColors.newAppButtonGreenBackgroundColor, height: itemSizes.searchIcon, width: responsiveSize(200),
                    }}
                  >
                    <CustomText title={this.state.transactionCatagoryString} textStyle={[styles.textInput, { marginLeft: spacing.small }]} />
                    <Image source={images.downlIcon} style={{ marginRight: spacing.extraSmall, height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
                  </TouchableOpacity>
                  <Modal
                    supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
                    animationType="fade"
                    transparent
                    visible={this.state.catagoryModalVisible}
                    onRequestClose={() => {
                      console.log('Modal has been closed.');
                    }}
                  >
                    <View style={styles.dropDownCointainer}>
                      <View style={{
                        backgroundColor: UIColors.primaryText, width: itemSizes.itemSizes280, alignItems: 'center', justifyContent: 'center',
                      }}
                      >
                        <TouchableOpacity
                          onPress={() => { this.setModalVisible(!this.state.catagoryModalVisible, transactionCatagory.all, 'All Transactions'); }}
                          style={styles.dropDownCell}
                        >
                          <Text style={styles.dropDownCellText}>
                            All Transactions
                         </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { this.setModalVisible(!this.state.catagoryModalVisible, transactionCatagory.bet, 'Bet Transactions'); }}
                          style={styles.dropDownCell}
                        >
                          <Text style={styles.dropDownCellText}>
                            Bet Transactions
                         </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { this.setModalVisible(!this.state.catagoryModalVisible, transactionCatagory.transfer, 'Fund Transactions'); }}
                          style={styles.dropDownCell}
                        >
                          <Text style={styles.dropDownCellText}>
                            Fund Transactions
                         </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { this.setModalVisible(!this.state.catagoryModalVisible, transactionCatagory.comboBet, 'Combo Bet Transactions'); }}
                          style={styles.dropDownCell}
                        >
                          <Text style={styles.dropDownCellText}>
                            Combo Bet Transactions
                         </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => { this.setModalVisible(!this.state.catagoryModalVisible, transactionCatagory.user, 'Admin Transactions'); }}
                          style={styles.dropDownCell}
                        >
                          <Text style={styles.dropDownCellText}>
                            Admin Transactions
                         </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>


                <View style={{
                  justifyContent: 'space-between', height: responsiveSize(80), flexDirection: 'row', margin: spacing.medium,
                }}
                >
                  <CustomText title="Transaction Date" textStyle={[styles.blackText, { marginRight: spacing.small, marginTop: spacing.medium }]} />
                  <View style={{ width: responsiveSize(200), marginLeft: spacing.extraExtraLarge }}>
                    <View style={{
                      justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center',
                    }}
                    >
                      <CustomText title="From" textStyle={styles.blackText} />
                      <TouchableOpacity
                        onPress={() => this.updateStateDOB('from')}
                        style={styles.dateContainer}
                      >
                        <CustomText title={DateManager.formatDateWithDash(this.state.from)} textStyle={styles.textInput} />
                        <Image source={images.calendarIcon} style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center',
                    }}
                    >
                      <CustomText title="To" textStyle={styles.blackText} />
                      <TouchableOpacity
                        onPress={() => this.updateStateDOB('to')}
                        style={styles.dateContainer}
                      >
                        <CustomText title={DateManager.formatDateWithDash(this.state.to)} textStyle={styles.textInput} />
                        <Image source={images.calendarIcon} style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>


                <TouchableOpacity
                  onPress={() => this.showHistory()}
                  style={styles.submitButton}
                >
                  <CustomText title="SUBMIT" textStyle={styles.submitButtonText} />
                </TouchableOpacity>

                {this.state.showTransaction ?
                  <View style={{ flex: 1 }}>
                    <View style={isPortrait ?
                      styles.transactionHeader : [styles.transactionHeader, { width: '100%' }]}
                    >
                      <CustomText title="Date" textStyle={[styles.submitButtonText, { flex: 1 }]} />
                      <CustomText title="DESCRIPTION" textStyle={[styles.submitButtonText, { flex: 2 }]} />
                      <CustomText title="AMOUNT" textStyle={[styles.submitButtonText, { flex: 1 }]} />
                    </View>
                    {_.every(transactionHistory, { status: '0' }) ?
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText title="No Transaction Available For Selected Dates" textStyle={[styles.submitButtonText, { textAlign: 'center', color: UIColors.secondaryText, marginTop: spacing.extraLarge }]} />
                      </View>
                      :
                      <FlatList
                        data={transactionHistory}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={({ item }) => {
                          const date = new Date(item.created_at);
                          const transactionDate = DateManager.formatDateWithDash(date);
                          const hour = date.getHours();
                          const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
                          // const minutes = date.getMinutes();
                          return (
                            <View style={isPortrait ?
                              styles.transactionListView : [styles.transactionListView, { width: '100%' }]}
                            >
                              <View style={{ margin: spacing.small, flex: 1, justifyContent: 'center' }}>
                                <CustomText title={`${transactionDate},`} textStyle={styles.blackText} />
                                <CustomText title={`${hour}:${minutes}`} textStyle={styles.blackText} />
                              </View>
                              <View style={{ flex: 2, width: '100%', justifyContent: 'center' }}>
                                <CustomText title={item.remark} textStyle={styles.blackText} />
                              </View>
                              <View style={{ width: '100%', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}
                              >
                                <CustomText title={toFixTwoDigitAfterDecimal(item.amount)} textStyle={styles.blackText} />
                                <Image
                                  source={this.getIcon(item.transaction_type)}
                                  style={{ height: itemSizes.iconSmall, width: itemSizes.iconSmall }}
                                />
                              </View>
                            </View>
                          );
                        }}
                      />
                    }

                  </View>
                  : null

                }
                {this.state.isShowDatePicker && (isIOS ?
                  <Modal
                    visible={this.state.isShowDatePicker}
                    transparent
                  >
                    <View style={styles.pickerModal}>
                      {this.showDOBPicker()}
                    </View>
                  </Modal>
                  : <View style={styles.pickerModal}>
                    {this.showDOBPicker()}
                  </View>
                )
                }


              </ScrollView>
            }
          </View>
          {isLoading && <Loader isAnimating={isLoading} />}
        </ImageBackground>
      </View>
    );
  }
}

Funds.propTypes = {
  screenProps: PropTypes.object,
  mainGamePlay: PropTypes.object,
  navigation: PropTypes.object,
  getSettingsRequest: PropTypes.func,
};

Funds.defaultProps = {
  screenProps: {},
  mainGamePlay: {},
  navigation: {},
  getSettingsRequest: () => { },
};

const mapStateToProps = state => ({
  fundsTransferReducer: state.fundsTransferReducer,
});

const mapDispatchToProps = () => UserActions;
const FundsScreen = connect(mapStateToProps, mapDispatchToProps)(Funds);
export default FundsScreen;

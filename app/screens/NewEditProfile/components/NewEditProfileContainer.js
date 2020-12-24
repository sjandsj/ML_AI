import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserActions from '../../../actions';
import CustomTextInput from '../../../components/CustomTextInput';
import { profileLocalizeString } from '../../../localization/profileLocalizeStrings';
import { commonLocalizeStrings } from '../../../localization/commonLocalizeStrings';
import { UIColors, fontSizes, spacing, itemSizes, fontName } from '../../../utils/variables';
import { imageType } from '../../../utils/enum';
import ImageViewContainer from './ImageView';
import CustomButton from '../../../components/CustomButton';
import { InputKey, ReturnKeyType } from '../../../utils/constants';

const widthInput = '96%';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  mainContainer: {
    flex: 1,
    paddingTop: spacing.extraExtraLarge,
  },
  textStyle: {
    margin: spacing.large,
    color: UIColors.primaryText,
    fontSize: fontSizes.medium,
    fontFamily: fontName.sourceSansProSemiBold,
  },
  textInput: {
    height: itemSizes.defaultButtonHeight,
    fontSize: fontSizes.small,
    marginLeft: spacing.semiMedium,
    color: UIColors.primaryText,
    borderBottomWidth: 1,
    borderBottomColor: UIColors.defaultWhite,
    fontFamily: fontName.sourceSansProRegular,
  },
  textInputView: {
    width: '80%',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainView: {
    height: itemSizes.itemWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: itemSizes.defaultLargeButtonHeight,
    width: '100%',
  },
  imagePickerView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyboardScrollView: {
  },
  keyboardView: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: UIColors.focused,
    height: itemSizes.defaultHeight,
    width: widthInput,
    borderRadius: spacing.extraSmall,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: spacing.large,

  },
  saveButtonText: {
    color: UIColors.primary,
    fontSize: fontSizes.medium,
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: fontName.SourceSansProSemiBold,
  },
});

class NewEditProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      userName: props.userName,
    };
  }

  // eslint-disable-next-line react/sort-comp
  getTextInputReference(key, reference) {
    switch (key) {
      case InputKey.firstName:
        this.firstNameInput = reference;
        break;
      case InputKey.lastName:
        this.lastNameInput = reference;
        break;
      case InputKey.email:
        this.emailInput = reference;
        break;
      case InputKey.userName:
        this.userNameInput = reference;
        break;
      default:
        break;
    }
  }

  onChangeFirstNameText(firstName) {
    this.setState({ firstName });
  }

  onChangeLastNameText(lastName) {
    this.setState({ lastName });
  }

  onChangeEmailText(email) {
    this.setState({ email });
  }
  
  onChangeUserNameText(userName) {
    this.setState({ userName });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      userName,
      // selfieWithGovtId,
      // govtIdProof
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.keyboardView}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled
            style={styles.keyboardScrollView}
            extraHeight={100}
            keyboardShouldPersistTaps="handled"
            enableAutoAutomaticScroll
            enableOnAndroid
          >
            <View style={styles.mainContainer}>
              <View style={styles.subContainer}>
                {
                  <View style={styles.inputMainView}>
                    <CustomTextInput
                      textInput={[StyleSheet.flatten(styles.textInput), this.props.email ? { color: UIColors.disableText } : {}]}
                      inputView={StyleSheet.flatten(styles.textInputView)}
                      placeholder={profileLocalizeString.email}
                      placeholderTextColor={UIColors.defaultTextColor}
                      underlineColorAndroid={'transparent'}
                      inputKey={InputKey.email}
                      getTextInputReference={(key, reference) =>
                        this.getTextInputReference(key, reference)}
                      value={email}
                      returnKeyType={ReturnKeyType.next}
                      editable={!this.props.email}
                      onChangeText={value => this.onChangeEmailText(value)}
                    />
                  </View>}
                
                <View style={styles.inputMainView}>
                  <CustomTextInput
                    textInput={StyleSheet.flatten(styles.textInput)}
                    inputView={StyleSheet.flatten(styles.textInputView)}
                    placeholder={profileLocalizeString.username}
                    placeholderTextColor={UIColors.defaultTextColor}
                    underlineColorAndroid={'transparent'}
                    inputKey={InputKey.userName}
                    getTextInputReference={(key, reference) =>
                      this.getTextInputReference(key, reference)}
                    value={userName}
                    returnKeyType={ReturnKeyType.next}
                    // editable={false}
                    onChangeText={value => this.onChangeUserNameText(value)}
                  />
                </View>
                <View style={styles.inputMainView}>
                  <CustomTextInput
                    textInput={StyleSheet.flatten(styles.textInput)}
                    inputView={StyleSheet.flatten(styles.textInputView)}
                    placeholder={profileLocalizeString.firstName}
                    placeholderTextColor={UIColors.defaultTextColor}
                    underlineColorAndroid={'transparent'}
                    inputKey={InputKey.firstName}
                    getTextInputReference={(key, reference) =>
                      this.getTextInputReference(key, reference)}
                    value={firstName}
                    returnKeyType={ReturnKeyType.next}
                    onChangeText={value => this.onChangeFirstNameText(value)}
                  />
                </View>
                <View style={styles.inputMainView}>
                  <CustomTextInput
                    textInput={StyleSheet.flatten(styles.textInput)}
                    inputView={StyleSheet.flatten(styles.textInputView)}
                    placeholder={profileLocalizeString.lastName}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={UIColors.defaultTextColor}
                    inputKey={InputKey.lastName}
                    getTextInputReference={(key, reference) =>
                      this.getTextInputReference(key, reference)}
                    value={lastName}
                    returnKeyType={ReturnKeyType.next}
                    onChangeText={value => this.onChangeLastNameText(value)}
                  />
                </View>
                {/* <View style={styles.imagesViewContainer}>
                  <View style={styles.imagePickerView}>
                    <ImageViewContainer
                      isPortrait={this.props.isPortrait}
                      profileImage={this.props.profileImageForSelfie}
                      isShowPopupDialog={text => this.props.isShowPopupDialog(text)}
                      changeImageLoadingState={boolean => this.props.changeImageLoadingState(boolean)}
                      imageToShow={imageType.SelfieWithGovtId}
                      title={profileLocalizeString.selfieWithGovtId}
                    />
                  </View>
                  <View style={styles.imagePickerView}>
                    <ImageViewContainer
                      isPortrait={this.props.isPortrait}
                      profileImage={this.props.profileImageForGovtId}
                      isShowPopupDialog={text => this.props.isShowPopupDialog(text)}
                      changeImageLoadingState={boolean => this.props.changeImageLoadingState(boolean)}
                      imageToShow={imageType.GovtIdProof}
                      title={profileLocalizeString.govtIdProof}
                    />
                  </View>
                </View> */}
              </View>
            </View>
          </KeyboardAwareScrollView>
          <CustomButton
            buttonStyle={styles.saveButton}
            onPress={() => this.props.editProfileAction(this.state.firstName, this.state.lastName, this.state.email, this.state.userName)}
            buttonTitle={commonLocalizeStrings.save}
            textStyle={styles.saveButtonText}
          />
        </View>
      </SafeAreaView>
    );
  }
}

NewEditProfileContainer.propTypes = {
  isPortrait: PropTypes.bool,
  profileImageForSelfie: PropTypes.string,
  profileImageForGovtId: PropTypes.string,
  isShowPopupDialog: PropTypes.func,
  changeImageLoadingState: PropTypes.func,
  email: PropTypes.string,
  userName: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  editProfileAction: PropTypes.func,
};

NewEditProfileContainer.defaultProps = {
  isPortrait: true,
  profileImageForSelfie: '',
  profileImageForGovtId: '',
  isShowPopupDialog: () => {},
  changeImageLoadingState: () => {},
  email: '',
  userName: '',
  firstName: '',
  lastName: '',
  editProfileAction: () => {},
};

const mapStateToProps = state => ({
  isLoading: state.loaderReducers.isLoading,
});

const mapDispatchToProps = () => UserActions;

// eslint-disable-next-line max-len
const NewEditProfileContainerScreen = connect(mapStateToProps, mapDispatchToProps)(NewEditProfileContainer);

export default NewEditProfileContainerScreen;

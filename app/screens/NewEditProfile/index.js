import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Alert, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UIColors } from '../../utils/variables';
import { profileLocalizeString } from '../../localization/profileLocalizeStrings';
import NewEditProfileContainer from './components/NewEditProfileContainer';
import ChooseImagePopup from '../../components/ChooseImagePopup';
import Utils, { isNetworkConnected } from '../../utils/utils';
import { imageType } from '../../utils/enum';
import UserActions from '../../actions';
import Loader from '../../components/Loader';
import HeaderContainer from '../../components/HeaderContainer';
import { images } from '../../assets/images/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.newAppButtonGreenBackgroundColor,
  },
  imageBg: {
    height: '100%',
    width: '100%',
  },
});

class NewEditProfile extends Component {
  constructor(props) {
    super(props);
    this.utils = new Utils();
    this.state = {
      isPortrait: props.screenProps.isPortrait,
      // eslint-disable-next-line react/no-unused-state
      screenOrientation: props.screenProps.screenOrientation,
      isShowImagePopup: false,
      imageToShow: '',
      imageLoading: false,
    };
  }

  componentDidMount() {
    this.props.getProfileRequest();
  }

  async setAvaterSource(uri, multipartBody, imageId) {
    if (uri && uri.length > 0 && multipartBody) {
      switch (imageId) {
        case imageType.SelfieWithGovtId:
          await this.props.setSelfieWithGovtIdImage(uri);
          await this.uploadKycImages(multipartBody);
          break;
        case imageType.GovtIdProof:
          await this.props.setGovtIdProof(uri);
          await this.uploadKycImages(multipartBody);
          break;
        default:
          break;
      }
    }
  }

  uploadKycImages(paramsObject) {
    const { uploadKycImageRequest } = this.props;
    isNetworkConnected((isConnected) => {
      if (isConnected) {
        uploadKycImageRequest(paramsObject);
      }
    });
  }

  changeImageLoadingState(boolean) {
    this.setState({
      imageLoading: boolean,
    });
  }

  isShowPopupDialog = (imageId) => {
    this.setState({
      isShowImagePopup: !this.state.isShowImagePopup,
      imageToShow: imageId,
    });
  };

  backButtonAction() {
    this.props.navigation.pop();
  }

  editProfileAction(firstNameUpdated, lastNameUpdated, emailUpdated, usernameUpdated) {
    const paramsObject = {};
    const { getProfileState, resetProfileRequest } = this.props;
    const {
      firstName,
      lastName,
      email,
      userName,
    } = getProfileState;
    if (firstName !== firstNameUpdated) {
      paramsObject.first_name = firstNameUpdated;
    }
    if (lastName !== lastNameUpdated) {
      paramsObject.last_name = lastNameUpdated;
    }
    if (email !== emailUpdated) {
      paramsObject.email = emailUpdated;
    }
    if (userName !== usernameUpdated) {
      paramsObject.username = usernameUpdated;
    }
    resetProfileRequest(paramsObject);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderContainer
          showBackButton
          title={'Edit Profile'}
          openMenu={() => this.props.navigation.openDrawer()}
        />
        {this.props.getProfileState &&
          <NewEditProfileContainer
            isShowPopupDialog={text => this.isShowPopupDialog(text)}
            profileImageForSelfie={this.props.getProfileState.profileImageOfSelfieWithGovtId}
            profileImageForGovtId={this.props.getProfileState.profileImageOfGovtIdProof}
            email={this.props.getProfileState.email}
            userName={this.props.getProfileState.userName}
            firstName={this.props.getProfileState.firstName}
            lastName={this.props.getProfileState.lastName}
            changeImageLoadingState={() => this.changeImageLoadingState()}
            imageLoading={this.state.imageLoading}
            imageToShow={this.state.imageToShow}
            isPortrait={this.state.isPortrait}
            profile={this.props.getProfileState}
            editProfileAction={(firstName, lastName, email, username) => this.editProfileAction(firstName, lastName, email, username)}
          />
        }
        {
          this.state.isShowImagePopup &&
          <ChooseImagePopup
            isHaveImage={this.state.hasImage}
            isShowPopup={this.state.isShowImagePopup}
            setAvaterSource={(source, multipartBody, imageId) =>
              this.setAvaterSource(source, multipartBody, imageId)}
            isShowPopupDialog={isShow => this.isShowPopupDialog(isShow)}
            imageToShow={this.state.imageToShow}
            isPortrait={this.state.isPortrait}
          />
        }
        {this.props.getProfileState.isShowProfileOnLoad && <Loader isAnimating={this.props.getProfileState.isLoading} />}
        {this.props.getProfileState.isLoading && <Loader isAnimating={this.props.getProfileState.isLoading} />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  getProfileState: state.getProfile,
});

const mapDispatchToProps = () => UserActions;

const NewEditProfileScreen = connect(mapStateToProps, mapDispatchToProps)(NewEditProfile);

NewEditProfile.propTypes = {
  navigation: PropTypes.object,
  getProfileState: PropTypes.object,
  setSelfieWithGovtIdImage: PropTypes.func,
  setGovtIdProof: PropTypes.func,
  screenProps: PropTypes.objectOf(PropTypes.any),
  resetProfileRequest: PropTypes.func,
};

NewEditProfile.defaultProps = {
  navigation: {},
  getProfileState: {},
  setSelfieWithGovtIdImage: () => { },
  setGovtIdProof: () => { },
  screenProps: {},
  resetProfileRequest: () => { },
};


export default NewEditProfileScreen;


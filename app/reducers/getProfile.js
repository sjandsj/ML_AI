import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  RESET_POFILE_REQUEST,
  RESET_POFILE_SUCCESS,
  RESET_POFILE_FAILURE,
  UPLOAD_KYC_IMAGE_REQUEST,
  UPLOAD_KYC_IMAGE_SUCCESS,
  UPLOAD_KYC_IMAGE_FAILURE,
  UPDATE_WALLET_AMOUNT,
} from '../actions/profile';

import { SET_SELFIE_WITH_GOVT_ID_IMAGE, SET_GOVT_ID_PROOF } from '../actions/newEditProfile';

const initialState = {
  isLoading: false,
  profileImageOfSelfieWithGovtId: '',
  profileImageOfGovtIdProof: '',
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  isShowProfileOnLoad: false,
  isSelfieUpdated: false,
  isDocumentUpdated: false,
};

function getProfile(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }
  switch (action.type) {
    case RESET_POFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        editProfileResponse: {},
      };
    case RESET_POFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        editProfileResponse: action.data,
      };
    case RESET_POFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        editProfileResponse: action.data,
      };
    case UPLOAD_KYC_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        uploadKycResponse: {},
      };
    case UPLOAD_KYC_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        uploadKycResponse: action.data,
        profileImageOfSelfieWithGovtId: action.data.message.selfie_picture ? action.data.message.selfie_picture : '',
        profileImageOfGovtIdProof: action.data.message.govt_id_picture ? action.data.message.govt_id_picture : '',
        isSelfieUpdated: action.data.message.selfie_picture !== state.profileImageOfSelfieWithGovtId,
        isDocumentUpdated: action.data.message.govt_id_picture !== state.profileImageOfGovtIdProof,
      };
    case UPLOAD_KYC_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        uploadKycResponse: action.data,
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isShowProfileOnLoad: true,
        getProfileResponse: {},
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isShowProfileOnLoad: false,
        getProfileResponse: action.data,
        isDocumentUpdated: false,
        isSelfieUpdated: false,
        id: action.data && action.data.user && action.data.user.id,
        email: action.data && action.data.user && action.data.user.email,
        userName: action.data && action.data.user && action.data.user.username,
        firstName: action.data && action.data.user && action.data.user.first_name,
        lastName: action.data && action.data.user && action.data.user.last_name,
        profileImageOfSelfieWithGovtId: action.data && action.data.user && action.data.user.selfie_picture_url,
        profileImageOfGovtIdProof: action.data && action.data.user && action.data.user.govt_id_picture_url,
        walletAmount: action.data && action.data.user && action.data.user.wallet && action.data.user.wallet.available_amount,
        walletType: action.data && action.data.user && action.data.user.wallet && action.data.user.wallet.wallet_type,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        isShowProfileOnLoad: false,
        getProfileResponse: action.data,
      };
    case SET_SELFIE_WITH_GOVT_ID_IMAGE: {
      const imageUrl = action.url !== null ? action.url : '';
      return {
        ...state,
        profileImageOfSelfieWithGovtId: imageUrl,
      };
    }
    case SET_GOVT_ID_PROOF: {
      const imageUrl = action.url !== null ? action.url : '';
      return {
        ...state,
        profileImageOfGovtIdProof: imageUrl,
      };
    }
    case UPDATE_WALLET_AMOUNT: {
      return {
        ...state,
        walletAmount: action.walletAmount,
      };
    }
    default:
      return state;
  }
}
export default getProfile;

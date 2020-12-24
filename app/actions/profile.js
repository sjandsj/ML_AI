export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const UPLOAD_KYC_IMAGE_REQUEST = 'UPLOAD_KYC_IMAGE_REQUEST';
export const UPLOAD_KYC_IMAGE_SUCCESS = 'UPLOAD_KYC_IMAGE_SUCCESS';
export const UPLOAD_KYC_IMAGE_FAILURE = 'UPLOAD_KYC_IMAGE_FAILURE';

export const RESET_POFILE_REQUEST = 'RESET_POFILE_REQUEST';
export const RESET_POFILE_SUCCESS = 'RESET_POFILE_SUCCESS';
export const RESET_POFILE_FAILURE = 'RESET_POFILE_FAILURE';

export const UPDATE_WALLET_AMOUNT = 'UPDATE_WALLET_AMOUNT';

export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

export const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
});

export const getProfileSuccess = data => ({
  type: GET_PROFILE_SUCCESS,
  data,
});

export const getProfileFailure = () => ({
  type: GET_PROFILE_FAILURE,
});

export const resetProfileRequest = data => ({
  type: RESET_POFILE_REQUEST,
  data,
});

export const resetProfileSuccess = data => ({
  type: RESET_POFILE_SUCCESS,
  data,
});

export const resetProfileFailure = () => ({
  type: RESET_POFILE_FAILURE,
});

export const uploadKycImageRequest = data => ({
  type: UPLOAD_KYC_IMAGE_REQUEST,
  data,
});

export const uploadKycImageSuccess = data => ({
  type: UPLOAD_KYC_IMAGE_SUCCESS,
  data,
});

export const uploadKycImageFailure = () => ({
  type: UPLOAD_KYC_IMAGE_FAILURE,
});

export const setProfileImage = (url, name) => ({
  type: SET_PROFILE_IMAGE,
  url,
  name,
});

export const updateWalletAmount = walletAmount => ({
  type: UPDATE_WALLET_AMOUNT,
  walletAmount,
});

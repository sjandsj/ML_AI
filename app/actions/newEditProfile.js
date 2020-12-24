import {
  getProfileUrl,
  uploadProfileImagesUrl,
} from '../api/urls';

import { getApiAction, patchApiAction } from '../api/actions/apiActions';

export const GET_EDIT_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_EDIT_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_EDIT_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const SET_SELFIE_WITH_GOVT_ID_IMAGE = 'SET_SELFIE_WITH_GOVT_ID_IMAGE';
export const SET_GOVT_ID_PROOF = 'SET_GOVT_ID_PROOF';


export const setSelfieWithGovtIdImage = url => ({
  type: SET_SELFIE_WITH_GOVT_ID_IMAGE,
  url,
});

export const setGovtIdProof = url => ({
  type: SET_GOVT_ID_PROOF,
  url,
});

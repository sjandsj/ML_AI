export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE';
export const USER_LOGIN_STATUS = 'USER_LOGIN_STATUS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const GOOGLE_LOGIN_REQUEST = 'GOOGLE_LOGIN_REQUEST';
export const FACEBOOK_LOGIN_REQUEST = 'FACEBOOK_LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';

// export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST';
// export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
// export const GET_QUESTIONS_FAILURE = 'GET_QUESTIONS_FAILURE';

export const GET_USER_QUESTIONS_REQUEST = 'GET_USER_QUESTIONS_REQUEST';
export const GET_USER_QUESTIONS_SUCCESS = 'GET_USER_QUESTIONS_SUCCESS';
export const GET_USER_QUESTIONS_FAILURE = 'GET_USER_QUESTIONS_FAILURE';

export const SUBMIT_QUESTIONS_REQUEST = 'SUBMIT_QUESTIONS_REQUEST';
export const RSET_PASSWORD_REQUEST = 'RSET_PASSWORD_REQUEST';
export const RSET_PASSWORD_LINK_REQUEST = 'RSET_PASSWORD_LINK_REQUEST';
export const RESET_LOGOUT = 'RESET_LOGOUT';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const PASSWORD_RECOVERY_CONFIRMATION = 'PASSWORD_RECOVERY_CONFIRMATION';
// export const SECURITY_ANSWER_VERIFICATION = 'SECURITY_ANSWER_VERIFICATION';
export const PASSWORD_RECOVERY_SUCCESS = 'PASSWORD_RECOVERY_SUCCESS';
export const RESET_LINK_CONFIRMATIONS = 'RESET_LINK_CONFIRMATIONS';
export const RESET_LINK_RECOVERY_SUCCESS = 'RESET_LINK_RECOVERY_SUCCESS';
export const WELCOME = 'WELCOME';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_SIGNUP = 'AUTH_SIGNUP';
export const AUTH_FORGOT_PASSWORD = 'AUTH_FORGOT_PASSWORD';
export const AUTH_WELCOME = 'AUTH_WELCOME';

export const RESET_PASSWORD_MANUALLY_REQUEST = 'RESET_PASSWORD_MANUALLY_REQUEST';
export const RESET_PASSWORD_MANUALLY_SUCCESS = 'RESET_PASSWORD_MANUALLY_SUCCESS';
export const RESET_PASSWORD_MANUALLY_FAILURE = 'RESET_PASSWORD_MANUALLY_FAILURE';

export const userLoginRequest = (email, password) => {
  const body = {
    login: email,
    password,
  };
  return {
    type: LOGIN_REQUEST,
    body: JSON.stringify(body),
  };
};
export const userLoginSucces = data => ({
  type: LOGIN_REQUEST_SUCCESS,
  data,
});

export const userLoginFailure = () => ({
  type: LOGIN_REQUEST_FAILURE,
});


export const userLoginStatus = status => ({
  type: USER_LOGIN_STATUS,
  status,
});

export const userRegisterRequest = (paramsObject) => {
  // const securityObject = [{
  //   question_id: paramsObject.questionID,
  //   answer: paramsObject.securityAnswer,
  // }];
  const body = {
    email: paramsObject.email,
    username: paramsObject.username,
    password: paramsObject.password,
    // security_answers: securityObject,
  };
  return {
    type: REGISTER_REQUEST,
    body: JSON.stringify(body),
  };
};

export const googleLoginRequest = accessToken => ({
  type: GOOGLE_LOGIN_REQUEST,
  accessToken,
});

export const facebookLoginRequest = accessToken => ({
  type: FACEBOOK_LOGIN_REQUEST,
  accessToken,
});

// Logout request
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutRequestSuccess = () => ({
  type: LOGOUT_REQUEST_SUCCESS,
});

// // Get all security questions
// export const getSecurityQuestions = () => ({
//   type: GET_QUESTIONS_REQUEST,
// });

// export const getSecurityQuestionsSuccess = response => ({
//   type: GET_QUESTIONS_SUCCESS,
//   data: response,
// });

// export const getSecurityQuestionsFailed = () => ({
//   type: GET_QUESTIONS_FAILURE,
// });

// // Get user security questions
// export const getUserSecurityQuestions = email => ({
//   type: GET_USER_QUESTIONS_REQUEST,
//   email,
// });

// export const userSecurityQuestionsSuccess = response => ({
//   type: GET_USER_QUESTIONS_SUCCESS,
//   data: response,
// });

// export const userSecurityQuestionsFailed = () => ({
//   type: GET_USER_QUESTIONS_FAILURE,
// });

// // Submit security answer request
// export const submitSecurityQuestionsRequest = (email, id, answer) => {
//   const body = {
//     email,
//     answer,
//   };
//   return {
//     type: SUBMIT_QUESTIONS_REQUEST,
//     id,
//     email,
//     body: JSON.stringify(body),
//   };
// };

export const resetPasswordRequest = (email) => {
  const body = {
    email,
  };
  return {
    type: RSET_PASSWORD_REQUEST,
    body: JSON.stringify(body),
  };
};

export const resetPasswordLinkRequest = email => ({
  type: RSET_PASSWORD_LINK_REQUEST,
  email,
});

export const resetlogout = () => ({
  type: RESET_LOGOUT,
});

export const resetPasswordInAppRequest = body => ({
  type: RESET_PASSWORD_MANUALLY_REQUEST,
  body: JSON.stringify(body),

});
// Forgot Password Actions
export const openForgotPasswordView = () => ({
  type: FORGOT_PASSWORD,
});

export const openPasswordRecoveryConfirmationView = () => ({
  type: PASSWORD_RECOVERY_CONFIRMATION,
});

// export const openSecurityAnswerVerificationView = () => ({
//   type: SECURITY_ANSWER_VERIFICATION,
// });

export const openPasswordRecoverySuccessView = () => ({
  type: PASSWORD_RECOVERY_SUCCESS,
});

export const openResetLinkConfirmationView = () => ({
  type: RESET_LINK_CONFIRMATIONS,
});

export const openResetLinkRecoverySuccessView = () => ({
  type: RESET_LINK_RECOVERY_SUCCESS,
});

export const openWelcomeView = () => ({
  type: WELCOME,
});

// Auth Welcome View
export const openLoginView = () => ({
  type: AUTH_LOGIN,
});
export const openSignupView = () => ({
  type: AUTH_SIGNUP,
});
export const openAuthForgotPasswordView = () => ({
  type: AUTH_FORGOT_PASSWORD,
});
export const openAuthWelcomeView = () => ({
  type: AUTH_WELCOME,
});

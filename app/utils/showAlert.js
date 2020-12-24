import { Alert } from 'react-native';
import { updateApp } from './utils_functions';

export const ALERT = 'Alert!';
export const ERROR = 'Error';
export const AlertOptions = Object.freeze({ ok: 0, cancel: 1 });
export const AlertRealityCheckOptions = Object.freeze({ continue: 0, logout: 1, navigate: 2 });


export const showPopupAlert = (message) => {
  Alert.alert(
    '',
    message,
    [
      { text: 'OK' },
    ],
    { cancelable: false },
  );
};

export const showUpdateAlert = (message, url) => {
  Alert.alert(
    '',
    message,
    [
      { text: 'OK', onPress: () => { updateApp(url); } },
    ],
    { cancelable: false },
  );
};

export const showPopupAlertWithTitle = (title, message, action) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'OK', onPress: action },
    ],
  );
};

export const showOptionAlert = (title, message, buttonOk, buttonCancel, action) => {
  Alert.alert(
    title,
    message,
    [
      { text: buttonCancel, onPress: () => action(AlertOptions.cancel) }, // 1: Cancel
      { text: buttonOk, onPress: () => action(AlertOptions.ok) }, // 0: Ok
    ],
    {cancelable: false},
  );
};

export const showOptionAlertWithSingleButton = (title, message, buttonOk, action) => {
  Alert.alert(
    title,
    message,
    [
      { text: buttonOk, onPress: () => action(AlertOptions.ok) }, // 0: Ok
    ],
  );
};

export const showLogoutAlert = (title, logoutButtonText, staySigninText, action) => {
  Alert.alert(
    title,
    '',
    [
      { text: staySigninText },
      { text: logoutButtonText, onPress: () => action(AlertOptions.ok), style: 'destructive' },
    ],
  );
};

export const showAlertWithPromise = (title, message, okTitle, cancelTitle) => new Promise((resolve) => {
  Alert.alert(
    title,
    message,
    [
      { text: okTitle, onPress: () => resolve('ok') },
      { text: cancelTitle, onPress: () => resolve('cancel') },
    ],
    { cancelable: false },
  );
});

export const showAlertWithPromiseHasSingleButton = (title, message, okTitle) => new Promise((resolve) => {
  Alert.alert(
    title,
    message,
    [
      { text: okTitle, onPress: () => resolve('ok') },
    ],
    { cancelable: false },
  );
});

export const showRealityCheckAlert = (title, message, action) => {
  Alert.alert(
    title,
    message,
    [
      { text: 'Log Out', onPress: () => action(AlertRealityCheckOptions.logout), style: 'destructive' },
      { text: 'Continue', onPress: () => action(AlertRealityCheckOptions.continue) },
      { text: 'History', onPress: () => action(AlertRealityCheckOptions.navigate) },
    ],
    { cancelable: false },
  );
};


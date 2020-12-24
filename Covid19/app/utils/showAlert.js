import { Alert } from 'react-native';

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

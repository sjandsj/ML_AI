import { Linking } from 'react-native';

export const openMail = (mailID) => {
  Linking.openURL(`mailto:${mailID}`);
};

import { NetInfo } from 'react-native';

const handleFirstConnectivityChange = () => {
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange,
  );
};

const watchNetStatusChange = () => {
  NetInfo.getConnectionInfo().then(() => {
    NetInfo.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange,
    );
  });
};

export default function* () {
  yield watchNetStatusChange();
}


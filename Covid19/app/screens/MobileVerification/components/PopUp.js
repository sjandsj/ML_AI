import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Modal,
} from 'react-native';
import { spacing, fontWeights, UIColors, itemSizes, fontSizes } from '../../../utils/variables';
import { responsiveSize } from '../../../utils/utils';

const styles = StyleSheet.create({
  backGroundView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: itemSizes.itemSizes280,
  },
  popUpView: {
    borderRadius: 15,
    height:responsiveSize(400),
    backgroundColor: 'rgb(11, 29, 89)',
    width: responsiveSize(300),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginTop: spacing.extraExtraLarge,
    height: responsiveSize(100),
    width: responsiveSize(100),
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  bigText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'rgb(0, 218, 74)',
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
  },
  textStyle: {
    color: UIColors.appBackGroundColor,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.small,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: 'rgb(0, 218, 81)',
    height: 50,
    width: '100%',
  },
});

const PopUp = props => (
  <Modal
    supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
    animationType="fade"
    transparent
    visible={props.isModalVisible}
    onRequestClose={() => {
}}>
    <View style={styles.backGroundView}>
      <View style={styles.popUpView}>
        <Image style={styles.icon} />
        <Text style={styles.bigText}>
          Your account has been Created successfully  
        </Text>
        <TouchableOpacity
          onPress={props.loginAction}
          style={styles.loginButton}>
          <Text style={styles.textStyle}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

PopUp.propTypes = {
  isModalVisible: PropTypes.bool,
  loginAction: PropTypes.func,
};

PopUp.defaultProps = {
  isModalVisible: false,
  loginAction: () => {},
};
export default PopUp;

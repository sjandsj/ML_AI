import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { spacing } from '../../utils/variables';
import LanguageHeader from '../../components/LanguageHeader';
import CustomButton from '../../components/CustomButton';
import ImageAndText from './components/ImageAndText';
import DidntRecieveEmailButton from './components/DidntRecieveEmailButton';
import PopUp from './components/PopUp';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgb(0,16,58)',
    alignItems: 'center',
    padding: spacing.medium,
  },
  buttonView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})

class EmailVerification extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmationModalVisible: false
    };
  }

  loginWasPressed(){
    this.setModalVisible(!this.state.confirmationModalVisible);
    console.log('=====Login Pressed')
    // More login action code
  }

  setModalVisible = (visible) => {
    this.setState({ confirmationModalVisible : visible });
  }

  bakButtonAction(){
    console.log('===back button pressed');
  }

  langDropdownAction(){
    console.log('==========Dropdown preeses');
  }

  openEmailApp = () => {
    console.log('====open email app');
  }

  didntRecieveEmail(){
    console.log('=======didnt recieve email');
  }

  render(){
    
    return(
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={()=>this.bakButtonAction()}
          style={{alignSelf: 'flex-start'}} >
          <Text style={{color: 'rgb(47,77,125)'}} >
             {`<-   BACK`}
          </Text>
        </TouchableOpacity>
        <LanguageHeader
            showLangDropdown
            langDropdownPressed={()=>this.langDropdownAction()}
        />
        <ImageAndText />
        <View style={styles.buttonView}>
          <CustomButton
            title='OPEN EMAIL APP'
            buttonPressAction={()=>this.openEmailApp()}
          />
          {/* <CustomButton
            title='Dummy Button for Pop up'
            buttonPressAction={() => {
              this.setModalVisible(true);
            }}
          /> */}
          <PopUp
            isModalVisible={this.state.confirmationModalVisible}
            loginAction={() =>  this.loginWasPressed()}
          />
        </View>
        <DidntRecieveEmailButton 
          didntRecieveEmail={()=>this.didntRecieveEmail()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const EmailVerificationScreen = connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

export default EmailVerificationScreen;

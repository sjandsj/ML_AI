import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { spacing, fontSizes } from '../../utils/variables';
import LanguageHeader from '../../components/LanguageHeader';
import CustomButton from '../../components/CustomButton';
import ImageAndText from './components/ImageAndText';
import DidntRecieveCodeButton from './components/DidntRecieveCodeButton';
import OTPInputView from '@twotalltotems/react-native-otp-input'

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
  otpView: {
    marginTop: 0,
    alignSelf: 'center',
    width: '80%',
    height: 200,
  },
  underlineStyleBase: {
    marginTop: 0,
    width: 70,
    height: 90,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'rgb(11, 29, 89)',
    borderBottomColor: 'rgb(11, 29, 89)',
    borderBottomWidth: 1,
    margin: 10,
    fontSize: fontSizes.extraLarge,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    fontSize: fontSizes.extraLarge,
  },
})

class MobileVerification extends Component {

  constructor(props){
    super(props);
    this.state={
      code: '',
    }
  }

  didntRecieveCode(){
    console.log("=====diddn't recieve code was presswed");
  }
  
  continuePressed(){
    console.log('=====continue pressd', this.state.code);
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
        <ImageAndText
          mobileNumber={'7869611176'}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}} >
          <OTPInputView
              style={styles.otpView}
              pinCount={4}
              code={this.state.otpCode} 
              //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged = {code => { this.setState({code})}}
              // autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled = {(code => {
                  console.log(`Code is ${code}, you are good to go!`)
            })}
          />
        </View>
        <View style={styles.buttonView}>
        <DidntRecieveCodeButton 
          didntRecieveEmail={()=>this.didntRecieveCode()}
        />
          <CustomButton
            title='CONTINUE'
            buttonPressAction={()=>this.continuePressed()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const MobileVerificationScreen = connect(mapStateToProps, mapDispatchToProps)(MobileVerification);

export default MobileVerificationScreen;

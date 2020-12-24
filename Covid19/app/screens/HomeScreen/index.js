import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserActions from '../../actions';
import { View, Text , StyleSheet } from 'react-native';

class Home extends Component {
  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <Text>
          Here it begins
        </Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => UserActions;

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeScreen;

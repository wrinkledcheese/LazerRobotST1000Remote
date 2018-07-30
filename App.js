import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image
} from 'react-native';

import {
  Controller
} from './components/controller';

export default class App extends React.Component {

  render() {


    return (
      <View style={styles.container}>
        
        <Image
          style={ styles.backgroundImage }
          source={ require( './images/background.png' ) }
        />
        {
          /*                                                                   *
           * TODO: Add refs here and have the App maintain state.  The app will
           * have references which will be used to send the data via bluetooth
           * to the arduino.
           */
        }
        <Controller forward={true} reverse={true} position='left' />
        <Controller forward={true} reverse={true} position='right' />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height: '100%'
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover',
    position:'absolute',
    width:'100%',
    height:'100%',
  }
});

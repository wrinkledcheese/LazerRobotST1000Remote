import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image
} from 'react-native';

export default class App extends React.Component {

  render() {


    return (
      <View style={styles.container}>
        
        <Image
          style={ styles.backgroundImage }
          source={ require( './images/background.png' ) }
        />

        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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

import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import nipplejs from '../lib/nipplejs';

import { DirectionImage } from './directionImage.js';

const RIGHT = 'right';
const LEFT = 'left';
const FORWARD = 'forward';
const REVERSE = 'reverse';

export class Controller extends React.Component {

	/*																		   *
	 * modifications of movement from a position of rest anticipating forward
	 * movement
	 * axial is forward ( + ) or reverse( - )
	 * orthogonal is right( + ) or left( - )
	 */
	state = {
		axial:0,
		orthogonal:0
	}

	updateAxial = direction => {
		const { axial } = this.state;
		let axialAcceleration = 0;
		if( direction === FORWARD && axial < 5 ){
			axialAcceleration = 1;
		}else if( direction === REVERSE && axial > -5 ){
			axialAcceleration = -1;
		}
		if( axialAcceleration !== 0 ){
			this.setState( { axial: axial + axialAcceleration } );
		}
	}

	updateOrthogonal = direction => {
		const { orthogonal } = this.state;
		let orthogonalAcceleration = 0;
		if( direction === RIGHT && orthogonal < 5 ){
			orthogonalAcceleration = 1;
		}else if( direction === LEFT && orthogonal > -5 ){
			orthogonalAcceleration = -1;
		}
		if( orthogonalAcceleration !== 0 ){
			this.setState( { orthogonal: orthogonal + orthogonalAcceleration } );
		}
	}

	directionImage( direction ){
		const { orthogonal, axial } = this.state;
		let force;
		switch( direction ){
			case REVERSE:
				force = axial < 0 ? axial : 0;
				break;
			case FORWARD:
				force = axial > 0 ? axial : 0;
				break;
			case LEFT:
				force = orthogonal < 0 ? orthogonal : 0;
				break;
			case RIGHT:
				force = orthogonal > 0 ? orthogonal : 0;
				break;
		}
		return DirectionImage[ direction ][ Math.abs( force ) ];
	}

	directionPressHandler = direction => {
		switch( direction ){
			case FORWARD:
			case REVERSE:
				this.updateAxial( direction );
				break;
			case LEFT:
			case RIGHT:
				this.updateOrthogonal( direction );
				break;
		}
	}

	directionLongPressHandler = direction => {
		let start, end, modifier, operator;
		const increase = function( i ){ return i + 1; };
		const decrease = function( i ){ return i - 1 };
		const lessThan = function( a, b ){ return a < b;}
		const greaterThan = function( a, b ){ return a > b;}
		const { axial, orthogonal } = this.state;
		switch( direction ){
			case FORWARD:
				start = axial;
				end = 5;
				modifier = increase;
				operator = lessThan
				break;
			case REVERSE:
				start = axial;
				end = -5;
				modifier = decrease;
				operator = greaterThan;
				break;
			case LEFT:
				start = orthogonal;
				end = -5;
				modifier = decrease;
				operator = greaterThan;
				break;
			case RIGHT:
				start = orthogonal;
				end = 5;
				modifier = increase;
				operator = lessThan;
				break;
		}
		let timeoutRange = Math.abs( start ) + Math.abs( end );
		let timeoutRemaining = timeoutRange;
		for( let i = start; operator( i, end ); i = modifier( i ) ){
			--timeoutRemaining;
			
			setTimeout( () => {
				this.directionPressHandler( direction );
			}, 200 * ( timeoutRange - timeoutRemaining )
			)
		}

	}

	touchableDirection( direction ){
		const imageSource = this.directionImage( direction );
		return ()=>this.props[ direction ] ? ( <TouchableWithoutFeedback
				onPress={ e => { this.directionPressHandler( direction ) } }
				onLongPress={ e => {console.log( e.nativeEvent.locationX ); this.directionLongPressHandler( direction ) } }

				delayLongPress={1000}
				style={styles.touchables[ direction ]}
			>
				<Image
					style={styles.images.directionImage}
					source={ imageSource }
				/>
			</TouchableWithoutFeedback> ) : null;
	}


	render(){

		let directions = [];
		const Forward = this.touchableDirection( FORWARD );
		const Reverse = this.touchableDirection( REVERSE );
		const Left = this.touchableDirection( LEFT );
		const Right = this.touchableDirection( RIGHT );

		return (
		<View style={ styles.containers[ this.props.position ] }>
			<Forward />
			<Left />
			<Right />
			<Reverse />
		</View>
    );
	}
}

Controller.defaultProps = {
	position:'right'
}

const styles ={}
styles.containers = StyleSheet.create({
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    
  },
  left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top:0,
    right:0,
    left:0,
    
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    bottom:0,
    right:0,
    left:0, 
  }

 } );
styles.images = StyleSheet.create({
  directionImage:{
    flex:1,
    resizeMode:'contain',
	
    /*position:'absolute',
    /*top:0,
    /*bottom:0,
    /*right:0,
    /*left:0,
    /*height:'100%'*/
  }
 });
 styles.touchables = StyleSheet.create({
  	forward:{
  		flex:1,
  		position:'absolute',
  		top:'5%',
  		right:'5%',
  		height:'40%',
  		
  	},
  	reverse:{
  		flex:1,
  		position:'absolute',
  		bottom:'5%',
  		right:'5%',
  		height:'40%',
  	},
  	left:{
  		/*height:50,
  		width:50*/
  	},
  	right:{
  		/*height:50,
  		width:50*/
  	},
  }
);
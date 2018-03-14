'use strict';
import {
  StyleSheet,
	Dimensions,
} from 'react-native';
import {Size} from "./constStr.js";
var screenWidth=Dimensions.get('window').width;
var screenHeight=Dimensions.get('window').height;
module.exports = StyleSheet.create({
	inputView:{
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		padding:5,
	},
	textInput_user:{
		flex:1,
		height:40,
		fontSize:Size(16),
		marginLeft:5,
		//backgroundColor:'red'
	},
	icon_user:{
		width:30,
		height:20,
		resizeMode:	"contain",
	},
	line:{
		height:1,
		backgroundColor:'rgb(227,227,235)'
	},
	listFooter:{
		justifyContent:"center",
		alignItems:'center',
		width:screenWidth,
		padding:5,
		marginBottom:5
	},
	container:{
		flex:1,
		width:screenWidth,
		backgroundColor:'#f4f4f4'
	}
});
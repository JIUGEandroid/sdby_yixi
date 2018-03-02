'use strict';
import {
  StyleSheet,

} from 'react-native';
import {Size} from "./constStr.js";
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
});
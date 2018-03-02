'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {Size,baseColor} from '../Tools/constStr.js';
class navTitle extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	callBack(){
		if(this.props.goBack){
			this.props.goBack();
		}
	}

  render() {
    return (
      <View style={styles.container}>
      	<TouchableOpacity style={styles.left} onPress={this.callBack.bind(this)}>
      		<Image style={styles.imgBack} source={require("../icon/back.png")}/>
      		<Text style={styles.textBack}>返回</Text>
      	</TouchableOpacity>
      	<View style={styles.titleView}>
      		<Text style={styles.title}>{this.props.title?this.props.title:"title"}</Text>
      	</View>
      	<View style={styles.right}>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"row",
		height:45,
		backgroundColor:'#fff',
		borderBottomWidth:1,
		borderColor:'#e0e0e0',
		alignItems: 'center',
	},
	imgBack:{
		width:25,
		height:18,
		resizeMode:'contain',
		//backgroundColor:'green'
	},
	textBack:{
		fontSize:Size(18),
		color:baseColor,
	
	},
	title:{
		fontSize:Size(20),
		color:"#000000"
	},
	left:{
		//backgroundColor:'red',
		flexDirection:"row",
		width:70,
		height:45,
		alignItems:'center',

	},
	titleView:{
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
		height:45,
		//backgroundColor:'blue'
	},
	right:{
		width:70
	}
});

export default navTitle;
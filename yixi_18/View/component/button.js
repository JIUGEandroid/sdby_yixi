/**
 * 使用方式:<Button text={"注册"},onClick={this.onClick.bind(this)},style={style},textStyle={textStyle}>
 */

'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import constStyle from "../Tools/constStyle.js";
import {Size,baseColor} from "../Tools/constStr.js";
class button extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}


	/**
	 * [callBack description]点击事件的回调
	 * @return {[type]} [description]
	 */
	callBack(){
		if(this.props.onClick){
			this.props.onClick();
		}
	}

  render() {
    return (
    	<TouchableOpacity style={[styles.buttonView,this.props.style&&this.props.style]} onPress={this.callBack.bind(this)}>
    		<Text style={[styles.textView,this.props.textStyle&&this.props.textStyle]}>{this.props.text?this.props.text:"button"}</Text>
    	</TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
	buttonView:{
		width:100,
		height:40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:baseColor,
		borderRadius:5
	},
	textView:{
		fontSize:Size(14),
		color:"#fff"
	}
});


export default button;
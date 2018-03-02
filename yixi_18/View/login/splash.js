'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import {Size} from '../Tools/constStr.js';
import Tools from '../Tools/tool.js';

class splash extends Component {
	constructor(props) {
	  super(props);
		 this.timer="";
	  this.state = {};
	}

	goAPP(isLogin){
		let {navigator}=this.props;
		if(navigator){
			if(isLogin=="1"){
				navigator.push({
					name:"homePage",
				});
			}
			else{
				navigator.push({
					name:"login",
				});
			}
		}
	}

	componentDidMount() {
		Tools.getStorage("isLogin",(isLogin)=>{
			this.timer = setTimeout(()=>{
			  	this.goAPP(isLogin);
			},3000);
		});
	}

	componentWillUnmount() {
	    this.timer && clearTimeout(this.timer);
	 }

  render() {
    return (
	      <View style={styles.container}>
	      		<Image style={styles.logo} source={require('../icon/logo.png')}/>
	      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"#fff",
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo:{
		width:Size(130),
		height:Size(130),
		resizeMode:'contain'
	}
});


export default splash;
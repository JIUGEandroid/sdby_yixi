'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
class selectMerchant extends Component {
	constructor(props) {
  	  super(props);
  	
  	  this.state = {};
  	}
  	
  	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		<NavTitle title={"选择商家"} goBack={this.goBack.bind(this)}/>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		marginTop:iosMargin,
		flex:1,
		alignItems:'center'
	},
});


export default selectMerchant;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import LoadingShow from '../../../component/react-native-loading';
import Tools from '../../../Tools/tool.js';
import Toast from 'react-native-root-toast';
import AllListView from '../../../component/AllListView';
class myStaff extends Component {

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
      <View style={{flex:1,backgroundColor:"#fff"}}>
      	<View style={styles.container}>
      		<NavTitle title={"我的员工"} goBack={this.goBack.bind(this)}/>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
	    flex:1,
	    marginTop:iosMargin,
	    //backgroundColor:"#fff",
	  },
});


export default myStaff;
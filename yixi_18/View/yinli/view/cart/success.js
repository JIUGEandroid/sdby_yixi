'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Tools from "../../../Tools/tool.js";
import Toast from 'react-native-root-toast';
import NavTitle from '../../../component/navTitle';
import Button from '../../../component/button.js';
class success extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	toOrder(){
		let {navigator}=this.props;
/*	    if(navigator){
	        navigator.popToRoute({
	        	name:"homePage",
		        param:{
		            index:"shangcheng"
		        }
	        });
	    }*/

	    const routes = this.props.navigator.state.routeStack;
        let destinationRoute = '';
        for (let i=routes.length-1;i>=0;i--) {
        		console.log("destinationRoute:"+routes[i].name);
                if(routes[i].name == 'yinli'){
                        destinationRoute =this.props.navigator.getCurrentRoutes()[i]
                        //destinationRoute.param.index="zhangdan";
                        break;
                }
        }
        console.log("destinationRoute:destinationRoute="+JSON.stringify(destinationRoute));
        this.props.param.callBack();
        this.props.param.initData();
        this.props.navigator.popToRoute(destinationRoute);

	}

/*	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	    	this.props.param.callBack();
	        navigator.pop();
	    }
	}*/

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		{/*<NavTitle title={"订单提交成功"} goBack={this.goBack.bind(this)}/>*/}
      		<View style={styles.content}>
      			<Image style={styles.submittedIcon} source={require('../icon/submitted.png')}/>
      			<Text style={{fontSize:Size(30),color:"#1296db",marginTop:25,}}>提交成功</Text>
      			<Text style={{fontSize:Size(18),color:'#707070',marginTop:20}}>你已成功提交订单，立即去看看订单状态~</Text>
      			<Button text={"查看订单"} onClick={this.toOrder.bind(this)} style={{width:240,marginTop:30}} textStyle={{fontSize:Size(18)}} />
      		</View>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:iosMargin
	},
	content:{
		flex:1,
		justifyContent:"center",
		alignItems:'center',
	},
	submittedIcon:{
		width:90,
		height:90,
		resizeMode:'stretch',
	},
});


export default success;
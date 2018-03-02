'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
import commonStyle from "../Tools/constStyle.js";
import Button from "../component/button.js";
import Tools from "../Tools/tool.js";
import Toast from 'react-native-root-toast';

class login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user_phone:"",
	  	user_password:"",
	  };
	}

	goLogin(){
		let postData={};
		postData.mobile=this.state.user_phone;
		postData.pwd=this.state.user_password;
		Tools.post("http://yixi.bowyue.com/api/member/login",postData,(data)=>{
			Toast.show("登录成功");
			Tools.setStorage("isLogin","1");
			Tools.setStorage("account",this.state.user_phone);
			let {navigator}=this.props;
			if(navigator){
				navigator.push({
					name:"homePage"
				});
			}
		},(err)=>{
			Toast.show("登录失败");
		});
	}

	goRegister(){
		let {navigator}=this.props;
		if(navigator){
			navigator.push({
				name:"register",
				param:{
					isReset:false,
				}
			});
		}
	}

	forgetPsd(){
		let {navigator}=this.props;
		if(navigator){
			navigator.push({
				name:"register",
				param:{
					isReset:true,
				}
			});
		}
	}

  render() {
    return (
       <View style={styles.container}>
      	<View style={styles.logoView}>
      		<Image style={styles.logo} source={require("../icon/logo.png")} />
      	</View>
      	<View style={styles.userView}>
      		<View style={[commonStyle.inputView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/user.png")} />
      			<TextInput
      				keyboardType='numbers-and-punctuation'
      				placeholder="手机号" 
			        style={commonStyle.textInput_user}
			        onChangeText={(phone) => this.setState({user_phone:phone})}
			        value={this.state.user_phone}
			     />
      		</View>
      		<View style={commonStyle.line}/>
      		<View style={[commonStyle.inputView,{borderBottomLeftRadius:5,borderBottomRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/Lock.png")} />
      			<TextInput
      			    secureTextEntry={true}
      				placeholder="登录密码" 
			        style={commonStyle.textInput_user}
			        onChangeText={(password) => this.setState({user_password:password})}
			        value={this.state.user_password}
			     />
      		</View>
      	</View>
      	<View style={styles.passwordView}>
      		<TouchableOpacity onPress={this.forgetPsd.bind(this)}>
      			<Text style={{fontSize:Size(16),color:"#000000"}}>忘记密码？</Text>
      		</TouchableOpacity>
      	</View>
      	<View style={styles.registerView}>
      		<Button text={"登  录"} onClick={this.goLogin.bind(this)} style={[styles.codeButton,{width:290,height:45,borderRadius:6}]} textStyle={{fontSize:Size(20),color:"#fff"}} />
      	</View>
      	<View style={styles.agreeView}>
      		<Button text={"注 册"} onClick={this.goRegister.bind(this)} style={{backgroundColor:'#fff',width:140}} textStyle={{color:"#000000",fontSize:Size(17)}}/>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		padding:15,
		backgroundColor:'rgb(227,227,235)'
	},
	logoView:{
		marginTop:iosMargin,
		height:160,
		justifyContent:'center',
		alignItems:'center',
	},
	userView:{
		height:120,
		justifyContent:'center'
		//backgroundColor:'red'
	},
	passwordView:{
		flexDirection:'row-reverse',
		height:30,
		alignItems:'center',

	},
	registerView:{
		marginTop:10,
		height:140,
		alignItems:'center',
	},
	agreeView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	logo:{
		width:120,
		height:120,
		resizeMode:	"center",
	},
	line:{
		height:1,
		backgroundColor:'rgb(227,227,235)'
	},


});


export default login;
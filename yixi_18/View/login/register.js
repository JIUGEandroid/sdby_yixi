'use strict';

import React, { Component } from 'react';

import ReactNative,{
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
const {width, height} = Dimensions.get('window');
import commonStyle from "../Tools/constStyle.js";
import Button from "../component/button.js";
import NavTitle from "../component/navTitle.js";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Toast from 'react-native-root-toast';
import Tools from '../Tools/tool.js';
class register extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user_phone:"",
	  	user_code:"",
	  	user_password:"",
	  	user_d_password:"",
	  	isSelect:false,
	  	isKS:false,
	  };
	}

	getCode(){
		if(!Tools.isDataValid(this.state.user_phone)){
			Toast.show("请输入手机号");
			return;
		}
		let postData={};
		postData.mobile=this.state.user_phone;
		postData.is_member=1;
		console.log("123"+JSON.stringify(postData));
		Tools.post("http://yixi.bowyue.com/api/member/getyzm",postData,(data)=>{
			Toast.show(data);
			console.log("123"+JSON.stringify(data));
		},(err)=>{
			Toast.show(err);
		});
/*		if(!Tools.checkPhone(this.state.user_phone)){
			let postData={};
			postData.mobile=this.state.user_phone;
			postData.is_member=1;
			console.log("123"+JSON.stringify(postData));
			Tools.post("http://yixi.bowyue.com/api/member/getyzm",postData,(data)=>{
				Toast.show(data);
				console.log("123"+JSON.stringify(data));
			},(err)=>{
				Toast.show(err);
			});
		}
		else{
			Toast.show(Tools.checkPhone(this.state.user_phone));
		}*/		


	}

	goRegister(){
		if(!Tools.isDataValid(this.state.user_phone)){
			Toast.show("请输入手机号");
			return;
		}
		if(!Tools.isDataValid(this.state.user_code)){
			Toast.show("请输入验证码");
			return;
		}
		if(!Tools.isDataValid(this.state.user_password)){
			Toast.show("请输入密码");
			return;
		}
		if(!Tools.isDataValid(this.state.user_d_password)){
			Toast.show("请确认密码");
			return;
		}
		if(this.state.user_password!=this.state.user_d_password){
			Toast.show("两次输入的密码不一致");
			return;
		}
		if(!this.state.isSelect){
			Toast.show("请同意用户使用协议");
			return;
		}
		let postData={};
		postData.mobile=this.state.user_phone;
		postData.yzm=this.state.user_code;
		postData.pwd=this.state.user_password;
		postData.repwd=this.state.user_d_password;
		Tools.post("http://yixi.bowyue.com/api/member/register",postData,(data)=>{
			Toast.show("注册成功");
			let {navigator}=this.props;
			if(navigator){
				navigator.pop();
			}
		},(err)=>{
			Toast.show(err);
		});
	}

	goBack(){
		let {navigator}=this.props;
		if(navigator){
			navigator.pop();
		}
	}

	agreeYixi(){
		this.setState({
		  isSelect: !this.state.isSelect,
		});
	}

	psdOnfs(){
		this.setState({
		  isKS: true,
		});
	}

	psOnbr(){
		this.setState({
		  isKS: false,
		});
	}
	componentDidMount() {
	}


  render() {
    return (
      <View style={[styles.container,{marginBottom:this.state.keyboardSpace}]} >
      	<NavTitle title={this.props.param.isReset?"重置密码":"注册"} goBack={this.goBack.bind(this)}/>
      	<View style={styles.logoView}>
      		<Image style={styles.logo} source={require("../icon/logo.png")} />
      	</View>
      	<View style={styles.userView}>
      		<View style={[commonStyle.inputView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/user.png")} />
      			<TextInput
      				onFocus={this.psOnbr.bind(this)}
      				keyboardType='numbers-and-punctuation'
      				placeholder="手机号" 
			        style={commonStyle.textInput_user}
			        onChangeText={(phone) => this.setState({user_phone:phone})}
			        value={this.state.user_phone}
			     />
      		</View>
      		<View style={commonStyle.line}/>
      		<View style={[commonStyle.inputView,{borderBottomLeftRadius:5,borderBottomRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/validation.png")} />
      			<TextInput
      			    onFocus={this.psOnbr.bind(this)}
      				keyboardType='numbers-and-punctuation'
      				placeholder="验证码" 
			        style={commonStyle.textInput_user}
			        onChangeText={(code) => this.setState({user_code:code})}
			        value={this.state.user_code}
			     />
			     <Button text={"获取验证码"} onClick={this.getCode.bind(this)} style={styles.codeButton} textStyle={{fontSize:Size(16),color:"#fff"}} />
      		</View>
      	</View>
  		<View style={styles.passwordView}>	
      		<View style={[commonStyle.inputView,{borderTopLeftRadius:5,borderTopRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/Lock.png")} />
      			<TextInput
      				secureTextEntry={true}
      				onFocus={this.psdOnfs.bind(this)}
      				placeholder="密码为8-16位数字及字母的组合" 
			        style={commonStyle.textInput_user}
			        onChangeText={(password) => this.setState({user_password:password})}
			        value={this.state.password}
			     />
      		</View>
      		<View style={commonStyle.line}/>
      		<View style={[commonStyle.inputView,{borderBottomLeftRadius:5,borderBottomRightRadius:5}]}>
      			<Image style={commonStyle.icon_user} source={require("../icon/okLock.png")} />
      			<TextInput
      				secureTextEntry={true}
      				onFocus={this.psdOnfs.bind(this)}
      				placeholder="请再次填写密码" 
			        style={commonStyle.textInput_user}
			        onChangeText={(d_password) => this.setState({user_d_password:d_password})}
			        value={this.state.user_d_password}
			     />

      		</View>
      		{this.state.isKS&& <KeyboardSpacer topSpacing={-15}/>}
      	</View>
      	<View style={styles.registerView}>
      		<Button text={this.props.param.isReset?"确定重置密码":"注  册"} onClick={this.goRegister.bind(this)} style={[styles.codeButton,{width:290,height:45,marginLeft:10,borderRadius:6}]} textStyle={{fontSize:Size(20),color:"#fff"}} />
      	</View>
      	{!this.props.param.isReset&&(<View style={styles.agreeView}>
      		<TouchableOpacity onPress={this.agreeYixi.bind(this)}>
      			<Image style={styles.selectImg} source={this.state.isSelect?require("../icon/selected.png"):require("../icon/select.png")} />
      		</TouchableOpacity>
      		<Text style={{fontSize:Size(14)}}>同意<Text style={{color:'rgb(18,144,255)',fontSize:Size(14)}}>易汐科技用户使用协议</Text></Text>
      	</View>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:iosMargin,
		
		backgroundColor:'rgb(227,227,235)'
	},
	logoView:{
		height:140,
		justifyContent:'center',
		alignItems:'center',
	},
	userView:{
		height:120,
		justifyContent:'center',
		marginLeft:15,
		marginRight:15,
		//backgroundColor:'red'
	},
	passwordView:{
		height:120,
		justifyContent:'center',
		marginLeft:15,
		marginRight:15,
	},
	registerView:{
		height:80,
		justifyContent:'center',
		alignItems:'center',
	},
	agreeView:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
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
	codeButton:{
		width:80,
		height:30,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:baseColor,
		marginRight:10,
		borderRadius:4,
	},
	selectImg:{
		width:17,
		height:17,
		marginRight:5
	}

});


export default register;
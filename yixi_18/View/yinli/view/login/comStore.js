'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Button from '../../../component/button.js';
import Tools from '../../../Tools/tool.js';
import Toast from 'react-native-root-toast';
class comStore extends Component {
	constructor(props) {
	  super(props);
		this.img="";
	  this.state = {
	  	storeName:""
	  };
	}

	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}

	//头像上传 必须使用formData
	upImage(){
		let formData = new FormData();
		formData.append("name",this.props.param.imgData);
		return new Promise((resolve,reject)=>{
			  let uploadURL="http://yixip.bowyue.com/api/upload/image"
		      let formData = new FormData();
		      let file = {uri: this.props.param.imgData.uri, type: 'multipart/form-data', name: this.props.param.imgData.name};
		      formData.append("name",file);
		      fetch(uploadURL,{
		          method:'POST',
		          headers:{
		              'Content-Type':'multipart/form-data',
		          },
		          body:formData,
		      })
		      .then((response) => response.json())
		      .then((responseData)=>{
		      	//Toast.show("头像上传成功");
		      	if(responseData.code){
		      		this.img=responseData.data.file_name;
		      	}
		      	console.log("upImage:"+JSON.stringify(responseData));
				resolve();
		      })
		      .catch((error)=>{
		      	console.error('error失败',error);
		      	resolve();
		      });
	    });
	}

	onEnsure(){	
		console.log("onEnsure:"+JSON.stringify(this.props.param.imgData));
		if(this.state.storeName==""){
			Toast.show("请输入公司名/商户名");
			return;
		}
		let postData={};
		if(this.img!=""){
			postData={"username":this.props.param.userName,"store_name":this.state.storeName,"role":this.props.param.roleCode.toString(),"head_img":this.img};
		}
		else{
			postData={"username":this.props.param.userName,"store_name":this.state.storeName,"role":this.props.param.roleCode.toString()};
		}
		console.log("onEnsure:postData"+JSON.stringify(postData));
		this.upImage().then(()=>{
				Tools.post("http://yixip.bowyue.com/api/pmember/register",postData,(resData)=>{
					Toast.show("信息保存成功");
					Tools.setStorage("yinli_identity",this.props.param.roleCode.toString());
					let {navigator}=this.props;
				    if(navigator){
				        navigator.push({
				        	name:"yinli"
				        });
				    }
				},(err)=>{
					Toast.show("信息保存失败:"+err);
				});
		});
	}	

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		<NavTitle title={"商户名"} goBack={this.goBack.bind(this)}/>
      		<TextInput
      				placeholder={"请输入公司名/商户名"}
      				placeholderTextColor={"#707070"}
			        style={styles.TextInput}
			        onChangeText={(text) => this.setState({storeName:text})}
			        value={this.state.storeName}
			    />
			<View style={{backgroundColor:'#e0e0e0',height:1,width:270}}/>
			<Button text={"确 认"} onClick={this.onEnsure.bind(this)} style={{width:270,marginTop:30}} textStyle={{fontSize:Size(20)}} />
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
	TextInput:{
		marginTop:40,
		width:270,
		height:30,
		color:'#000000',
		fontSize:Size(18),
		//backgroundColor:'red'
	},
});


export default comStore;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin,screenWidth} from "../../../Tools/constStr.js";
import Button from '../../../component/button.js';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import Loading from "../../../component/loading.js";
import LoadingShow from '../../../component/react-native-loading';
import Toast from 'react-native-root-toast';
import Tools from '../../../Tools/tool.js';
class setStoreMessage extends Component {
	constructor(props) {
	  super(props);
	
		this.photoOptions = {
		    //底部弹出框选项
          title:'请选择',
          cancelButtonTitle:'取消',
          takePhotoButtonTitle:'拍照',
          chooseFromLibraryButtonTitle:'从相册选择',
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
		}
		this.img="";
		this.imgData={};
	  this.state = {
	  	store_name:"",
	  	user_name:"",
	  	imgResource:"",
	  	isUp:false,
	  	loadingWait:false,
      	loadingWaitText:"加载中",
	  };
	}


	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}



	openMycamera(){
       ImagePicker.showImagePicker(this.photoOptions, (response) => {

          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          
          else {
          	console.log("openMycamera:"+JSON.stringify(response));
          	let imgSource = {uri:response.uri };
          	let imgType = response.fileName.substring(response.fileName.lastIndexOf(".")+1);
          	this.imgData={uri: imgSource.uri, name: 'image.'+imgType};
          	
          	this.setState({
          		imgResource:imgSource
          	});
          }
        });
	}

	toNext(){

	}

	showLoading(text){
      this.setState({
        loadingWait: true,
        loadingWaitText:text,
      });
	 }

	closeLoading(){
	      this.setState({
	        loadingWait: false,
	      });
	}


	upImage(){
		let formData = new FormData();
		formData.append("name",this.imgData);
		console.log("upImage:"+JSON.stringify(formData));
		return new Promise((resolve,reject)=>{
			  this.showLoading("店铺图片上传中...");
			  let uploadURL="http://yixip.bowyue.com/api/upload/image"
		      let formData = new FormData();
		      let file = {uri: this.imgData.uri, type: 'multipart/form-data', name: this.imgData.name};
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
		      	this.closeLoading();
		      	if(responseData.code){
		      		this.img=responseData.data.file_name;
		      	}
		      	console.log("upImage:"+JSON.stringify(responseData));
				resolve();
		      })
		      .catch((error)=>{
		      	this.closeLoading();
		      	console.error('error失败',error);
		      	resolve();
		      });
	    });
	}
	onEnsure(){	
		//console.log("onEnsure:"+JSON.stringify(this.props.param.imgData));
		console.log("onEnsure:"+JSON.stringify(this.props.param.roleCode));
		if(!Tools.isDataValid(this.state.imgResource)){
			Toast.show("请选择店铺图片");
			return;
		}
		if(this.state.store_name==""){
			Toast.show("请输入店铺名称");
			return;
		}
		if(this.state.user_name==""){
			Toast.show("请输入您的真实名字");
			return;
		}
		
/*		this.upImage().then(()=>{
			Tools.post("http://yixip.bowyue.com/api/pmember/register",postData,(resData)=>{
				this.closeLoading();
				Toast.show("信息保存成功");
				Tools.setStorage("yinli_identity",this.props.param.roleCode.toString());
				let {navigator}=this.props;
			    if(navigator){
			        navigator.push({
			        	name:"yinli",
			        	param:{
			        		index:"shangcheng"
			        	}
			        });
			    }
			},(err)=>{
				this.closeLoading();
				Toast.show("信息保存失败:"+err);
			});
		});*/
		this.upImage().then(()=>{
			this.showLoading("店铺数据上传中...");
			let postData={};
			if(this.img!=""){
				postData={"username":this.state.user_name,"store_name":this.state.store_name,"role":this.props.param.roleCode.toString(),"head_img":this.img};
			}
			else{
				postData={"username":this.state.user_name,"store_name":this.state.store_name,"role":this.props.param.roleCode.toString()};
			}
			console.log("onEnsure:postData"+JSON.stringify(postData));
			Tools.post("http://yixip.bowyue.com/api/pmember/register",postData,(resData)=>{
				this.closeLoading();
				Toast.show("信息保存成功");
				Tools.setStorage("yinli_identity",this.props.param.roleCode.toString());

				Tools.post("http://yixip.bowyue.com/api/pmember/getPmember",{},(resData)=>{
			      		console.log("goYl:"+JSON.stringify(resData));
			      		//Tools.setStorage("user_info",JSON.stringify(resData));
	      				let key="user_info";
	      		        AsyncStorage.setItem(key.toLowerCase(),JSON.stringify(resData))
			            .then(()=> { 
			            	let {navigator}=this.props;
						    if(navigator){
						        navigator.push({
						        	name:"yinli",
						        	param:{
						        		index:"shangcheng"
						        	}
						        });
						    }
			            })
			            .catch((error) => {

			            })
			            .done();
				    },(err)=>{
				    	Toast.show(err);
				    });
			},(err)=>{
				this.closeLoading();
				Toast.show("信息保存失败:"+err);
			});
		});
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		<NavTitle title={" "} goBack={this.goBack.bind(this)}/>
			<TouchableOpacity style={styles.selectImgView} onPress={()=>this.openMycamera()}>
  				<View style={styles.selectImgView_left}>
  					<Text style={styles.commonText}>店铺商标</Text>
  				</View>
  				<View style={styles.selectImgView_right}>
  					<Image style={styles.selectImg} source={this.state.imgResource?this.state.imgResource:require('../icon/defaultImg.png')}/>
  					<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
  				</View>
  			</TouchableOpacity>
  			<View  style={{height:10,backgroundColor:'#f0f0f0'}}/>
			<View style={styles.itemView}>
  				 <Text style={styles.commonText}>店铺名称</Text>
  				 <View>
					 <TextInput
				        style={styles.TextInput}
				        onChangeText={(text) => this.setState({store_name:text})}
				        value={this.state.store_name}
				        placeholder={"输入店铺名称"}
				        placeholderTextColor={"#707070"}
				      />
				      <View style={{backgroundColor:'#e0e0e0',height:1,width:270,marginLeft:13}}/>
			      </View>
  			</View>
  			<View style={styles.itemView}>
  				 <Text style={styles.commonText}>真实姓名</Text>
  				 <View>
					 <TextInput
				        style={styles.TextInput}
				        onChangeText={(text) => this.setState({user_name:text})}
				        value={this.state.user_name}
				        placeholder={"输入您的真实姓名"}
				        placeholderTextColor={"#707070"}
				      />
				      <View style={{backgroundColor:'#e0e0e0',height:1,width:270,marginLeft:13}}/>
			      </View>
  			</View>
  			<Button text={"下一步"} onClick={this.onEnsure.bind(this)} style={{width:300,marginTop:50,alignSelf:'center'}} textStyle={{fontSize:Size(20)}} />
      		<LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		marginTop:iosMargin,
		flex:1,
		//alignItems:'center'
		//backgroundColor:'#f0f0f0'
	},
	selectImgView:{
		width:screenWidth,
		height:90,
		padding:10,
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor:'#fff'
	},
	selectImgView_right:{
		flexDirection:'row',
		alignItems:'center',
		width:140,
		justifyContent:'flex-end',
		//	backgroundColor:'red'
	},
	selectImgView_left:{
		justifyContent:'center'

	},
	selectImg:{
		width:65,
	    height:60,
	    resizeMode:'stretch',
	},
	youjiantouView:{
	    width:15,
	    height:25,
	    resizeMode:'stretch',
	    marginLeft:5,
  	},
  	commonText:{
  		fontSize:Size(19),
  		color:"#707070"
  	},
  	itemView:{
  		marginTop:10,
  		height:50,
  		padding:5,
  		paddingLeft:10,
  		alignItems:'center',
  		flexDirection:'row',
  		//backgroundColor:'#'
  	},
  	TextInput:{
  		flex:1,
  		marginRight:20,
  		marginLeft:13,
  		height:40,
  		fontSize:Size(17),
  		color:'#000000'
  		//backgroundColor:'red',
  	},

});


export default setStoreMessage;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import LoadingShow from '../../../component/react-native-loading';
import Tools from '../../../Tools/tool.js';
import Toast from 'react-native-root-toast';
import Button from '../../../component/button.js';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import KeyboardSpacer from 'react-native-keyboard-spacer';
class update extends Component {

	constructor(props) {
	  super(props);
	  this.role_name=["商家","销售","库管","司机","搬运","买家"];
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
		this.tag=[{"name":"中餐","code":0},{"name":"西餐","code":1},{"name":"火锅冒菜","code":2},{"name":"其他","code":3},{"name":"其他","code":4},{"name":"其他","code":5},{"name":"其他","code":6}];
	  	this.tagFlag=new Array();
	  	this.imgDianpuData={};
	  	this.imgYingyeData={};
	  	this.dianpuImg="";
	  	this.yingyeImg="";
	  this.state = {
	  	comInfo:{},
	  	userInfo:{},
	  	imgResource_dianpu:"",
	  	imgResource_yingye:"",
	  	isIdentity:false,
	  	identity:"",
	  	isMain:false,
	  	main:"",
	  	tags:[],
	  	tag:-1,
	  	onRefresh:"1",
	  	loadingWait:false,
      	loadingWaitText:"加载中",
      	isUpdate:0,
	  };
	}

	goBack(){
		let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
	}

	selectTag(i){
		this.tagFlag[i]=!this.tagFlag[i];
    	this.setState({
    		onRefresh:"1"
    	});
    }


    //设置店铺头像
	setDianpuImage(){
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
          	let imgSource = {uri:response.uri };
          	let imgType = response.fileName.substring(response.fileName.lastIndexOf(".")+1);
          	this.imgDianpuData={uri: imgSource.uri, name: 'image.'+imgType};
      		this.setState({
      			imgResource_dianpu:imgSource,
      		});
          }
        });
    }


    //设置营业执照图片
    setYingyeImage(){
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
          	let imgSource = {uri:response.uri };
          	let imgType = response.fileName.substring(response.fileName.lastIndexOf(".")+1);
          	this.imgYingyeData={uri: imgSource.uri, name: 'image.'+imgType};
      		this.setState({
      			imgResource_yingye:imgSource,
      		});
          }
        });
    }

    //上传店铺图片和营业执照
    upDianpuImage(name){
		return new Promise((resolve,reject)=>{
			console.log("upDianpuImage:"+name)
			  this.showLoading(name+"图片上传中...");
			  let uploadURL="http://yixip.bowyue.com/api/upload/image"
		      let formData = new FormData();
		      let file;

		      if(name=="店铺"){
		      	file = {uri: this.imgDianpuData.uri, type: 'multipart/form-data', name: this.imgDianpuData.name};
		      }
		      else{
		      	file = {uri: this.imgYingyeData.uri, type: 'multipart/form-data', name: this.imgYingyeData.name};
		      }		      
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
		      	if(name=="店铺"){
		      		this.dianpuImg=responseData.data.file_name;
		      		console.log("upDianpuImage:dianpu"+this.dianpuImg);
		      	}
		      	else{
		      		this.yingyeImg=responseData.data.file_name;
		      		console.log("upDianpuImage:yingye"+this.yingyeImg);
		      	}
		      	console.log("upImage:"+JSON.stringify(responseData));
				resolve("营业");
		      })
		      .catch((error)=>{
		      	this.closeLoading();
		      	console.error('error失败',error);
		      	resolve();
		      });
	    });
	}





    //提交认证
	onSubmit(){
		let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(reg.test(this.state.identity) === false){
			Toast.show("请输入正确的身份证号码");
			return;
		}
		if(!Tools.isDataValid(this.state.main)){
			Toast.show("请输入主营产品");
			return;
		}
/*		let num=0;
		for(let i=0;i<this.state.tags.length;i++){
			if(this.tagFlag[i]){
				num=num+1;
				break;
			}
		}
		if(num==0){
			Toast.show("请选择店铺标签");
			return;
		}*/
		if(!Tools.isDataValid(this.state.imgResource_dianpu)){
			Toast.show("请选择店铺头像");
			return;
		}
		if(!Tools.isDataValid(this.state.imgResource_yingye)){
			Toast.show("请选择营业执照");
			return;
		}
/*		let tagData=new Array();
		for(let i=0;i<this.state.tags.length;i++){
			if(this.tagFlag[i]){
				let data={"id":i+1,"name":this.state.tags[i].name};
				tagData.push(data);
			}
		}
		console.log("onSubmit:tagData="+JSON.stringify(tagData));*/
		this.upDianpuImage("店铺")
		.then((resData)=>this.upDianpuImage(resData))
		.then(()=>{
			//let postData={"idcard":this.state.identity,"main":this.state.main,"tabs":JSON.stringify(tagData),"store_logo":this.dianpuImg,"license_no_img":this.yingyeImg};
			let postData={"idcard":this.state.identity,"main":this.state.main,"store_logo":this.dianpuImg,"license_no_img":this.yingyeImg};
			console.log("upDianpuImage:"+"success"+JSON.stringify(postData));
			Tools.post("http://yixip.bowyue.com/api/pmember/check",postData,(resData)=>{
				Toast.show("保存成功");

				Tools.post("http://yixip.bowyue.com/api/pmember/getPmember",{},(resData)=>{
			      console.log("goYl:"+JSON.stringify(resData));
			      let key="user_info";
      		      AsyncStorage.setItem(key.toLowerCase(),JSON.stringify(resData))
		            .then(()=> { 
		            	let {navigator}=this.props;
					    if(navigator){
					        navigator.pop();
					    }
		            })
		            .catch((error) => {

		            })
		            .done();
			    },(err)=>{
			      Toast.show(err);
			    });

			},(err)=>{
				Toast.show(err);
			});
		});
		//let postData={"idcard":this.state.identity,"main":this.state.main,"tabs":[],"store_logo":,"license_no_img":};
	}


	//获取商家标签
	getTags(){
		if(this.state.isUpdate==0){
			Tools.post("http://yixip.bowyue.com/api/pmember/getTabs",{},(resData)=>{
				for(let i=0;i<resData.length;i++){
					this.tagFlag[i]=false;
				}
				this.setState({
				  tags: resData,
				});
			},(err)=>{
				Toast.show(err);
			});
		}
		else{
			this.setState({
			  tags:JSON.parse(this.state.userInfo.tabs),
			});
		}

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


	toIdentity(){
    	this.setState({
    	  isIdentity:!this.state.isIdentity,
    	});
    }

    toMain(){
    	this.setState({
    	  isMain: !this.state.isMain,
    	});
    }

	//读取本地用户信息
	componentWillMount() {
		Tools.getStorage("user_info",(resData)=>{
			let userInfo;
			let role=JSON.parse(resData).role;
			if(role==1){
				userInfo=JSON.parse(resData).business
			}
			else if(role==4){
				userInfo=JSON.parse(resData).driver;
			}
			this.setState({
			  comInfo: JSON.parse(resData),
			  userInfo:userInfo,
			  isUpdate:userInfo.check_status,
			},()=>{
				console.log("componentDidMount1:"+JSON.stringify(this.state.userInfo.store_name));
			});
	      
	      //this.getData();
	    });
	}


	componentDidMount() {
		//this.getTags();

	}



  render() {
    return (
        <View style={{flex:1,backgroundColor:"#fff"}} onPress={()=>this.selectAddress(rowData)}>
      	    <View style={styles.container}>
		        <NavTitle title={"升级认证"} goBack={this.goBack.bind(this)}/>
		        <ScrollView style={{flex:1}}>
			        <View style={styles.userInfoView}>
			        	<Image style={styles.touxiangIcon} source={{uri:this.state.comInfo.head_img}}/>
			        	<View style={styles.userInfoView_right}>
			        		<Text style={styles.userInfoView_text}>{this.state.userInfo.store_name}·<Text>{this.role_name[this.state.comInfo.role-1]}</Text></Text>
			        		<Text style={[styles.userInfoView_text,{fontSize:Size(16),marginTop:10}]}>{this.state.comInfo.mobile}</Text>
			        	</View>
			   		</View>
			   		<View style={{height:7,backgroundColor:'#f0f0f0'}}/>
			   		<View style={styles.itemView}>
			   			<Text style={styles.itemText}>名字</Text>
			   			<Text style={styles.itemText}>已完善</Text>
			   		</View>
			   		<View style={{height:0.5,backgroundColor:'#e0e0e0'}}/>
			   		<TouchableOpacity style={styles.itemView} onPress={this.state.isUpdate==0?()=>this.toIdentity():()=>{Toast.show("身份证号码已完善")}}>
			   			<Text style={styles.itemText}>身份证号</Text>
			   			<Text style={styles.itemText}>{this.state.isUpdate==0?"未验证":"已完善"}</Text>
			   		</TouchableOpacity>
			   		<View style={{height:0.5,backgroundColor:'#e0e0e0'}}/>
			   		{this.state.isIdentity&&this.state.isUpdate==0&&<View style={styles.TextInputView}>
			   			<TextInput
			   				keyboardType={"numeric"}
					        style={styles.TextInput}
					        onChangeText={(text) => this.setState({identity:text})}
					        value={this.state.identity}
					        placeholder={"输入身份证号码"}
					      />
			   		</View>}
			   		
			   		<TouchableOpacity style={styles.itemView} onPress={this.state.isUpdate==0?()=>this.toMain():()=>{Toast.show("主营信息已完善")}}>
			   			<Text style={styles.itemText}>主营</Text>
			   			<Text style={styles.itemText}>{this.state.isUpdate==0?"未验证":"已完善"}</Text>
			   		</TouchableOpacity>
			   		<View style={{height:0.5,backgroundColor:'#e0e0e0'}}/>
			   		{this.state.isMain&&this.state.isUpdate==0&&<View style={styles.TextInputView}>
			   			<TextInput
			   				multiline = {true}
					        style={[styles.TextInput]}
					        onChangeText={(text) => this.setState({main:text})}
					        value={this.state.main}
					        placeholder={"输入主营商品"}
					      />
					
			   		</View>}
			   		<KeyboardSpacer topSpacing={-15}/>
{/*			   		<View style={styles.tagView}>
	      				<Text style={styles.commonText}>标签</Text>
	      				<View style={styles.tagView_bottom}>
	      					{this.state.tags.map((item,i)=>{
	      						return(
	      							<TouchableOpacity key={i} onPress={this.state.isUpdate==0?()=>this.selectTag(i):()=>{console.log("已完善标签")}} style={this.tagFlag[i]||this.state.isUpdate!=0?styles.buttonView_select:styles.buttonView_noselect}>
	      								<Text style={[this.tagFlag[i]||this.state.isUpdate!=0?styles.buttonText_select:styles.commonText,{fontSize:Size(16)}]}>{item.name}</Text>
	      							</TouchableOpacity>
	      							)
	      					})}
	      				</View>
	      			</View>*/}
			   		<View style={{height:7,backgroundColor:'#f0f0f0'}}/>
			   		<TouchableOpacity style={styles.selectImgView} onPress={this.state.isUpdate==0?()=>this.setDianpuImage():()=>{Toast.show("店铺头像已完善")}}>
		      				<View style={styles.selectImgView_left}>
		      					<Text style={styles.commonText}>店铺头像</Text>
		      				</View>
		      				<View style={styles.selectImgView_right}>
		      					<Image style={styles.selectImg} source={this.state.isUpdate==0?(this.state.imgResource_dianpu?this.state.imgResource_dianpu:require('../icon/addImg.png')):{uri:this.state.userInfo.store_logo}}/>
		      					{this.state.isUpdate==0&&<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>}
		      				</View>
		      		</TouchableOpacity>
		      		<View style={{height:1,backgroundColor:'#e0e0e0'}}/>
		      		<TouchableOpacity style={styles.selectImgView} onPress={this.state.isUpdate==0?()=>this.setYingyeImage():()=>{Toast.show("营业执照已完善")}}>
		      				<View style={styles.selectImgView_left}>
		      					<Text style={styles.commonText}>营业执照</Text>
		      				</View>
		      				<View style={styles.selectImgView_right}>
		      					<Image style={styles.selectImg} source={this.state.isUpdate==0?(this.state.imgResource_yingye?this.state.imgResource_yingye:require('../icon/addImg.png')):{uri:this.state.userInfo.license_no_img}}/>
		      					{this.state.isUpdate==0&&<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>}
		      				</View>
		      		</TouchableOpacity>
		      		<View style={{height:this.state.isUpdate==0?7:1,backgroundColor:'#e0e0e0'}}/>
		      		{this.state.isUpdate==0&&<View style={{alignItems:'center',flex:1,justifyContent:'center',height:60}}>
		      			<Button text={"确定"} onClick={this.onSubmit.bind(this)} style={{width:280}} textStyle={{fontSize:Size(18)}} />
		      		</View>}
		      		<LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
	      		</ScrollView>
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
  	userInfoView:{
  		height:90,
  		flexDirection:'row',
  		alignItems:'center',
  		padding:15,
  		//backgroundColor:'#1296db'
  	},
  	touxiangIcon:{
	    width:80,
	    height:65,
	    resizeMode:'stretch',
	    borderRadius:7,
	 },
	 userInfoView_right:{
	 	flex:1,
	 	marginLeft:10,
	 	height:55,
	 	//justifyContent:'space-between'
	 },
	 userInfoView_text:{
	 	fontSize:Size(18),
	 	//color:"#fff",
	 	color:'#000000'
	 },
	 itemView:{
	 	height:45,
	 	flexDirection:'row',
	 	justifyContent:'space-between',
	 	alignItems:'center',
	 	//backgroundColor:'red',
	 	padding:10,
	 	paddingLeft:15,
	 	paddingRight:15,
	 },
	 itemText:{
	 	fontSize:Size(17),
	 	color:'#515151'
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
		width:85,
	    height:70,
	    resizeMode:'stretch',
	},
	youjiantouView:{
	    width:20,
	    height:15,
	    resizeMode:'stretch',
	    marginLeft:10,
  	},
  	commonText:{
  		fontSize:Size(17),
  		color:"#515151"
  	},
  	selectImgView:{
		height:90,
		padding:10,
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor:'#fff'
	},
	TextInputView:{
		height:40,
	},
	TextInput:{
  		flex:1,
  		marginRight:20,
  		marginLeft:15,
  		height:35,
  		fontSize:Size(17),
  		//backgroundColor:'red',
  	},
  	tagView:{
  		padding:15,
  		backgroundColor:'#fff',
  	},
  	tagView_bottom:{
  		flex:1,
  		flexDirection:'row',
  		//justifyContent:'space-around',
  		alignItems:'center',
  		flexWrap:"wrap",
  		//backgroundColor:'red'
  	},
  	buttonView_noselect:{
  		justifyContent:'center',
  		alignItems:'center',
  		padding:5,
  		marginLeft:7,
  		marginTop:7
  	},
  	buttonView_select:{
  		justifyContent:'center',
  		alignItems:'center',
  		paddingLeft:12,
  		paddingRight:12,
  		height:23,
  		borderRadius:2,
  		backgroundColor:'#1296db',
  		marginLeft:7,
  		marginTop:7
  	},
  	buttonText_select:{
  		color:"#fff",
  		fontSize:Size(18)
  	}
});


export default update;
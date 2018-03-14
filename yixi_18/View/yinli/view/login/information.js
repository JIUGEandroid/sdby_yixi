'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Button from '../../../component/button.js';
import Toast from 'react-native-root-toast';
import Tools from '../../../Tools/tool.js';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
class information extends Component {
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
		this.imgData={};
	  this.state = {
	  	imgResource:"",
	  	userName:"",
	  	role:"",
	  	roleCode:-1,
	  };
	}

	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}

	setRole(role,code){
		//Toast.show("callBack"+code);
		this.setState({
			role:role,
			roleCode:code
		});
	}

	toChooseRole(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.push({
	        	name:"chooseRole",
	        	param:{
	        		callBack:(role,code)=>this.setRole(role,code)
	        	}
	        });
	    }
	}

	onEnsure(){
		let {navigator}=this.props;
		if(!Tools.isDataValid(this.state.userName)){
			Toast.show("请输入你的真实姓名");
			return;
		}
		if(this.state.roleCode==-1){
			Toast.show("请输入你的身份");
			return;
		}
		if(this.state.roleCode==1){
		    if(navigator){
		    	navigator.push({
		    		name:"comStore",
		    		param:{
		    			imgData:this.imgData,
		    			userName:this.state.userName,
		    			role:this.state.role,
		    			roleCode:this.state.roleCode,
		    		}
		    	});
		    }
		}
		else if(this.state.roleCode==2 ||this.state.roleCode==3 || this.state.roleCode==5){
			if(navigator){
		    	navigator.push({
		    		name:"selectMerchant",

		    	});
		    }
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


  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      		<View style={styles.container}>
      			<NavTitle title={"注册"} goBack={this.goBack.bind(this)}/>
      			<TouchableOpacity style={styles.storeView} onPress={()=>this.openMycamera()}>
      				<Image style={styles.store_icon} source={this.state.imgResource?this.state.imgResource:require('../icon/store_icon.png')}/>
      			</TouchableOpacity>
      			<TextInput
      				placeholder={"请输入你的真实姓名"}
      				placeholderTextColor={"#707070"}
			        style={styles.TextInput}
			        onChangeText={(text) => this.setState({userName:text})}
			        value={this.state.userName}
			    />
			    <View style={{backgroundColor:'#e0e0e0',height:1,width:270}}/>
			    <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toChooseRole()}>
		            <View style={{flex:1}}>
			             <View style={styles.itemView_right}>
			                <Text style={{fontSize:Size(18),color:this.state.roleCode==-1?"#707070":"#000000"}}>{this.state.roleCode==-1?"请选择你的身份":this.state.role}</Text>
			                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
			             </View>
			             
		            </View>
	        	</TouchableOpacity>
	        	<View style={{backgroundColor:'#e0e0e0',height:1,width:270}}/>
	        	<Button text={"确 认"} onClick={this.onEnsure.bind(this)} style={{width:270,marginTop:60}} textStyle={{fontSize:Size(20)}} />
      		</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		marginTop:iosMargin,
		alignItems:'center',
	},
	storeView:{
		height:200,
		justifyContent:'center',
		alignItems:"center",
	},
	store_icon:{
		width:80,
	    height:80,
	    borderRadius:40,
	    resizeMode:'stretch',
	    //backgroundColor:'red'
	},
	TextInput:{
		width:270,
		height:30,
		color:'#000000',
		fontSize:Size(18),
		//backgroundColor:'red'
	},
	youjiantouView:{
	    width:16,
	    height:14,
	    resizeMode:'stretch',
	    marginRight:5,
	},
	itemView:{
		width:270,
	    marginTop:10,
	    height:45,
	    flexDirection:'row',
	    backgroundColor:'#fff'	,
	    alignItems:'center'
	},
	itemView_right:{
	    flex:1,
	    flexDirection:'row',
	    justifyContent:'space-between',
	    alignItems:'center'
	  },
});


export default information

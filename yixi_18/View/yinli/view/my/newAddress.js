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
import {Size,baseColor,iosMargin,screenWidth} from "../../../Tools/constStr.js";
import Button from '../../../component/button.js';
import LoadingShow from '../../../component/react-native-loading';
import Tools from '../../../Tools/tool.js';
import Toast from 'react-native-root-toast';
class newAddress extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	acceptName:this.props.param.addressData?this.props.param.addressData.name:"",
	  	tel:this.props.param.addressData?this.props.param.addressData.mobile:"",
	  	detailAddress:this.props.param.addressData?this.props.param.addressData.detail_address:"",
	  	loadingWait:false,
	  	loadingWaitText:"",
	  };
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

	goBack(){
		let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
	}

	onSubmit(){
		if(!Tools.isDataValid(this.state.acceptName)){
			Toast.show("请输入收货人信息",{position: 65});
			return;
		}
		if(!(/^1[34875]\d{9}$/.test(this.state.tel))){
			Toast.show("请输入正确的手机号",{position: 65});
			return;
		}
		if(!Tools.isDataValid(this.state.detailAddress)){
			Toast.show("请输入详细收货地址",{position: 65});
			return;
		}
		this.showLoading(this.props.param.code=="new"?"保存中":"修改中");
		let postData={};
		let url="";
		if(this.props.param.code=="new"){
			postData={"type":1,"name":this.state.acceptName,"mobile":this.state.tel,"detail_address":this.state.detailAddress};
			url="http://yixip.bowyue.com/api/paddress/add";
		}
		else if(this.props.param.code=="edit"){
			postData={"id":this.props.param.addressData.id,"name":this.state.acceptName,"mobile":this.state.tel,"detail_address":this.state.detailAddress};
			url="http://yixip.bowyue.com/api/paddress/edit"
		}
		Tools.post(url,postData,(resData)=>{
			this.closeLoading();
			Toast.show(this.props.param.code=="new"?"保存成功":"修改成功",{position: 65});
			this.props.param.callBack();
			this.goBack();
		},(err)=>{
			this.closeLoading();
			Toast.show(err,{position: 65});
		});
	}

	deleteAddress(){
		this.showLoading("删除中...");
		let postData={"id":this.props.param.addressData.id};
		Tools.post("http://yixip.bowyue.com/api/paddress/del",postData,(resData)=>{
			this.closeLoading();
			Toast.show("已删除",{position: 65});
			let {navigator}=this.props;
			this.props.param.callBack();
	        if(navigator){
	            navigator.pop();
	        }
		},(err)=>{
			Toast.show(err,{position: 65});
		});
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      	<View style={styles.container}>
      		{this.props.param.code=="edit"&&<NavTitle title={"修改地址"} goBack={this.goBack.bind(this)} rightImage={require("../icon/delete.png")} rightCallBack={this.deleteAddress.bind(this)}/>}
      		{this.props.param.code=="new"&&<NavTitle title={"添加新地址"} goBack={this.goBack.bind(this)} />}
      		<View style={styles.itemView}>
  				 <View style={{width:65,}}><Text style={styles.commonText}>收货人:</Text></View>
  				 <View style={{flex:1}}>
					 <TextInput
				        style={styles.TextInput}
				        onChangeText={(text) => this.setState({acceptName:text})}
				        value={this.state.acceptName}
				        placeholder={"收货人姓名"}
				        placeholderTextColor={"#707070"}

				      />
				     <View style={styles.line}/>
			      </View>
  			</View>
  			<View style={styles.itemView}>
  				  <View style={{width:65,}}><Text style={styles.commonText}>联系电话:</Text></View>
  				 <View style={{flex:1}}>
					 <TextInput
					 	keyboardType={"numeric"}
				        style={styles.TextInput}
				        onChangeText={(text) => this.setState({tel:text})}
				        value={this.state.tel}
				        placeholder={"联系电话"}
				        placeholderTextColor={"#707070"}
				      />
				      <View style={styles.line}/>
			      </View>
  			</View>
  			<View style={[styles.itemViewAddress,{height:80}]}>
  				 <View style={{width:65,}}><Text style={styles.commonText}>收货地址:</Text></View>
  				 <View style={styles.addressInput}>
					 <TextInput
					 	multiline = {true}
				        style={styles.TextInputAddress}
				        onChangeText={(text) => this.setState({detailAddress:text})}
				        value={this.state.detailAddress}
				        placeholder={"请填写详细收货地址"}
				        placeholderTextColor={"#707070"}
				      />
				      
			      </View>
  			</View>
  			<Button text={this.props.param.code=="new"?"保存并上传":"确认修改"} onClick={this.onSubmit.bind(this)} style={{width:screenWidth-20,marginTop:20,marginLeft:10,}} textStyle={{fontSize:Size(18)}} />
  			<LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
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
  commonText:{
  		fontSize:Size(19),
  		color:"#515151"
  	},
	itemView:{
		marginTop:5,
		height:50,
		padding:10,
		//paddingLeft:10,
		alignItems:'center',
		flexDirection:'row',
		//backgroundColor:'#'
	},
	TextInput:{
		flex:1,
		marginRight:20,
		marginLeft:5,
		//height:40,
		fontSize:Size(17),
		color:'#000000',
		//textAlignVertical: 'bottom',
		//backgroundColor:'red',
	},
	line:{
		backgroundColor:'#e0e0e0',
		height:1,
		marginLeft:5,
	},
	addressInput:{
		flex:1,
		borderWidth:1,
		borderColor:'#e0e0e0',
		marginLeft:5,
	},
	itemViewAddress:{
		marginTop:5,
		height:40,
		padding:10,
		//paddingLeft:10,
		//alignItems:'center',
		flexDirection:'row',
	},
	TextInputAddress:{
		flex:1,
		marginRight:20,
		marginLeft:2,
		//height:40,
		textAlignVertical: 'top',
		fontSize:Size(17),
		color:'#000000',
	}
});


export default newAddress;
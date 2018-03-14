'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Tools from "../../../Tools/tool.js";
import Toast from 'react-native-root-toast';
import LoadingShow from '../../../component/react-native-loading';
class confirmOrder extends Component {
	constructor(props) {
	  super(props);
	  this.listData=this.props.param.goodsData?this.props.param.goodsData:[];
	  this.listNum=this.props.param.goodsNum?this.props.param.goodsNum:[];
	  this.state = {
	  	accept_name:"",
	  	phone:"",
	  	address:"",
	  	addressId:"",
	  	driver_name:"",
	  	driver_license_plate:"",
	  	driver_id:"",
	  	loadingWait:false,
      	loadingWaitText:"加载中",
	  };
	}


	selectDriver(){
		let {navigator}=this.props;
	    if(navigator){
	    	navigator.push({
	    		name:'selectDriver',
	    		param:{
	    			callBack:(driverData)=>this.setDriverInfo(driverData)
	    		}
	    	});
	    }
	}

	//提交订单
	submit(){
		if(!Tools.isDataValid(this.state.accept_name)){
			Toast.show("请选择收货地址");
			return;
		}
		this.showLoading("提交中...");
		let postData={"carts":JSON.stringify(this.listData),"address_id":this.state.addressId};
		if(Tools.isDataValid(this.state.driver_name)){
			//console.log("submit:"+"idskamdksalklj");
			postData={"carts":JSON.stringify(this.listData),"address_id":this.state.addressId,"driver_p_member_id":this.state.driver_id};
		}
		console.log("submit"+JSON.stringify(postData));
		Tools.post("http://yixip.bowyue.com/api/porder/create",postData,(resData)=>{
			this.closeLoading();
			Toast.show("订单创建成功");
			this.toSuccess();
		},(err)=>{
			Toast.show(err);
			this.closeLoading();
		});

	}

	toSuccess(){
		let {navigator}=this.props;
	    if(navigator){
	    	navigator.push({
	    		name:'success',
	    		param:{
	    			callBack:()=>this.props.param.callBack(),
	    			initData:()=>this.props.param.initData(),
	    		}
	    	});
	    }
	}


	//设置司机信息
	setDriverInfo(driverData){
		this.setState({
		  driver_name:driverData.username,
		  driver_license_plate:driverData.driver.license_plate,
		  driver_id:driverData.id
		});
	}

	//设置收货地址信息
	setAddressInfo(addressData){
		this.setState({
		  accept_name: addressData.name,
		  phone:addressData.mobile,
		  address:addressData.detail_address,
		  addressId:addressData.id,
		});
	}

	//跳转到选择地址界面并返回选贼的地址
	getAddress(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.push({
	        	name:"address",
	        	param:{
	        		code:1,
	        		callBack:(addressData)=>this.setAddressInfo(addressData)
	        	}
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

	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}



	

	componentDidMount() {
	  console.log("confirmOrder:"+JSON.stringify(this.props.param.goodsData));
	  
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		<NavTitle title={"确认订单"} goBack={this.goBack.bind(this)}/>
      		<TouchableOpacity style={styles.address} onPress={()=>this.getAddress()}>
	      		<Image style={styles.addressIcon} source={require('../icon/location.png')}/>
	      		<View style={styles.address_right}>
	      			<View style={{height:20,flexDirection:'row',justifyContent:'space-between'}}>
	      				<View style={{flex:1}}>
		      				<Text numberOfLines={1} style={styles.addressText}>收货人: <Text style={{color:'#515151'}}>{this.state.accept_name}</Text></Text>
	      				</View>
	      				<Text style={[styles.addressText,{marginRight:10,color:"#515151"}]}>{this.state.phone}</Text>
	      			</View>
	      			<View style={styles.address_rightBottom}>
	      				<Text style={styles.addressText}>收货地址: </Text>
	      				<View style={{flex:1,marginRight:10}}>
		      				<Text numberOfLines={2} style={[styles.addressText,{color:'#515151',marginTop:2,fontSize:Size(17)}]}>{this.state.address}</Text>
		      			</View>
	      			</View>
	      		</View>
      		</TouchableOpacity>
      		<View style={{height:10,backgroundColor:'#f0f0f0'}} />
      		<ScrollView style={{flex:1}}>
      			{this.listData.map((item,i)=>{
      				return(
  						<View style={styles.listItem} key={i}>
				          <Image style={styles.listItem_img} source={{uri:item.logo}}/>
				          <View style={styles.listItem_textView}>
				            <Text style={{fontSize:Size(17)}}>{item.name}</Text>
				            <Text style={{fontSize:Size(16),color:"gray"}}>单价:{item.price}    <Text style={{}}>×{this.listNum[i]}</Text> </Text>
				            <Text style={{fontSize:Size(18),color:"#e16531"}}>¥{item.price*this.listNum[i]}</Text>
				            <View style={{backgroundColor:'#e1e8f1',height:0.8}}/>
				          </View>
				        </View>
      					);
      			})}
      			<TouchableOpacity style={styles.selectDriverView} onPress={()=>this.selectDriver()}>
		      		<Text style={{fontSize:Size(18),color:"#707070"}}>选择司机</Text>
		      		<View style={{flexDirection:'row',alignItems:'center'}}>
		      			<Text style={{fontSize:Size(18),color:"#515151"}}>{this.state.driver_name+" "+this.state.driver_license_plate}</Text>
		      			<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		      		</View>
	      		</TouchableOpacity>
	      		<View style={{backgroundColor:'#e1e8f1',height:0.8,marginLeft:10,marginRight:10}} />
      		</ScrollView>
      		<View style={styles.bottomView}>
	            <View style={styles.bottomView_left}>
	               <Text style={{marginLeft:20,fontSize:Size(17)}}>合计:</Text>
	               <Text style={{marginLeft:3,fontSize:Size(17),color:'red'}}>¥{this.props.param.allPrice}</Text>
	            </View>
	            <TouchableOpacity style={styles.bottomView_right} onPress={()=>this.submit()}>
	              <Text style={{color:'#fff',fontSize:Size(18)}}>提交</Text>
	            </TouchableOpacity>
          </View>
          <LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
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
	address:{
		paddingTop:10,
		paddingBottom:10,
		height:70,
		flexDirection:'row',
		//backgroundColor:'red',
		//alignItems:'center',
	},
	address_right:{
		flex:1,
	},
	addressIcon:{
		marginLeft:5,
		marginRight:5,
	    width:30,
	    height:30,
	    resizeMode:'contain',
	    marginTop:5,
	},
	address_rightBottom:{
		flex:1,
		flexDirection:'row',

	},
	addressText:{
		color:"#707070",
		fontSize:Size(17),

	},
	goodsView:{
		//backgroundColor:'red'
	},
	 listItem:{
	    height:90,
	    flexDirection:'row',
	    paddingLeft:10,
	    paddingTop:10,
	    paddingBottom:20,
	    paddingRight:10,
	    alignItems:'center'
	  },
	  listItem_img:{
	    height:70,
	    width:80,
	    resizeMode:'stretch',
	  },
	  listItem_textView:{
	    flex:1,
	    height:70,
	    marginLeft:10,
	    justifyContent:'space-between'
	    //backgroundColor:'red'
	  },
	  selectDriverView:{
	  	height:35,
	  	flexDirection:'row',
	  	marginLeft:10,
	  	marginRight:10,
	  	alignItems:'center',
	  	justifyContent:'space-between'
	  	//backgroundColor:'red'
	  },
	  youjiantouView:{
	    width:15,
	    height:13,
	    resizeMode:'stretch',
	    
	  },
	  bottomView:{
	  	height:40,
	  	flexDirection:'row'
	  },
	bottomView_left:{
	    flex:1,
	    flexDirection:'row',
	    alignItems:'center'
	    //backgroundColor:'red'
	  },
  bottomView_right:{
    backgroundColor:'rgb(84,132,236)',
    justifyContent:'center',
    alignItems:'center',
    width:100,
  },
    bottomView:{
    height:40,
    backgroundColor:"#f0f0f0",
    flexDirection:'row'
  },
    
});


export default confirmOrder;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin,screenWidth} from "../../../Tools/constStr.js";
class chooseGoodsType extends Component {
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

	toUpGoods(code,name){
		if(this.props.param.callBack){
			this.props.param.callBack({"code":code,"name":name});
			let {navigator}=this.props;
	        if(navigator){
	            navigator.pop();
	        }
		}
	}


  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      	<View style={styles.container}>
      		<NavTitle title={"选择商品类型"} goBack={this.goBack.bind(this)}/>
      		<TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toUpGoods(1,"干杂")}>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>干杂</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
	        <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toUpGoods(2,"冻品")}>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>冻品</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#f0f0f0',
		marginTop:iosMargin
	},
	oujiantouView:{
	    width:16,
	    height:14,
	    resizeMode:'stretch',
	    marginRight:5,
	},
	itemView:{
	    marginTop:10,
	    height:45,
	    flexDirection:'row',
	    backgroundColor:'#fff'	,
	    alignItems:'center'
	},
	itemView_right:{
		marginLeft:10,
	    flex:1,
	    flexDirection:'row',
	    justifyContent:'space-between',
	    alignItems:'center'
	  },
	youjiantouView:{
	    width:16,
	    height:16,
	    resizeMode:'contain',
	    marginRight:10,
	},
});


export default chooseGoodsType;
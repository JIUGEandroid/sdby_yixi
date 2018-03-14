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
import Tools from '../../../Tools/tool.js';
//用户类型：1商家,2销售,3库管,4司机,5搬运,6买家
class chooseRole extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	curCode:-1,
	  };
	}

/*	setCurCode(code,role){
		this.setState({
			curCode:code
		},()=>{
			this.props.param.callBack(role,this.state.curCode);
			let {navigator}=this.props;
		    if(navigator){
		        navigator.pop();
		    }	
		});
	}*/

	toCompleteInfo(code,role){
		console.log("toCompleteInfo:"+code);
		let {navigator}=this.props;
	    if(navigator){
	        navigator.push({
	        	name:"setStoreMessage",
	        	param:{
	        		role:role,
	        		roleCode:code
	        	}
	        });
	    }
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      	<View style={styles.container}>
      		<View style={styles.nav}>
      			<Text style={styles.navText}>选择身份</Text>
      		</View>
      		<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
      		<TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toCompleteInfo(6,"买家")}>
          		<Image style={styles.icon} source={require('../icon/luru.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>买家</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
	        <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toCompleteInfo(1,"商家")}>
          		<Image style={styles.icon} source={require('../icon/shengji.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>商家</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
	        <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toCompleteInfo(2,"销售")}>
          		<Image style={styles.icon} source={require('../icon/luru.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>销售</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             
	            </View>
	        </TouchableOpacity>
	         <TouchableOpacity style={[styles.itemView]} onPress={()=>this.toCompleteInfo(4,"司机")}>
          		<Image style={styles.icon} source={require('../icon/luru.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>司机</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
	        <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toCompleteInfo(3,"库管")}>
          		<Image style={styles.icon} source={require('../icon/shengji.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>库管</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	            </View>
	        </TouchableOpacity>
	        <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toCompleteInfo(5,"搬运")}>
          		<Image style={styles.icon} source={require('../icon/luru.png')}/>
	            <View style={{flex:1}}>
		             <View style={styles.itemView_right}>
		                <Text style={{fontSize:Size(18)}}>搬运</Text>
		                <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
		             </View>
		             
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
		backgroundColor:'#f0f0f0'
	},
	nav:{
		backgroundColor:'#fff',
		flexDirection:'row',
		marginTop:iosMargin,
		height:45,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	navText:{
		color:"#2c2c2c",
		fontSize:Size(20)
	},
	youjiantouView:{
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
	    flex:1,
	    flexDirection:'row',
	    justifyContent:'space-between',
	    alignItems:'center'
	  },
	icon:{
	    width:20,
	    height:16,
	    resizeMode:'contain',
	    marginLeft:10,
	    marginRight:15,
	  },
});
export default chooseRole;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  text,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ListView
} from 'react-native';
import AllListView from '../../../component/AllListView';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Toast from 'react-native-root-toast';
import Tools from '../../../Tools/tool.js';
import LoadingShow from '../../../component/react-native-loading';
class myStore extends Component {
	constructor(props) {
	  super(props);
	  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.listData=new Array();
	  this.state = {
	      count:0,
	      loaded:false,
	      dataSource:this.ds,
	      loadingWait:false,
	      loadingWaitText:"加载中",
	      searchMsg:""
	  };
	}

	goBack(){
		let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
	}

	getData(){

		let postData={"p_member_id":this.props.param.userInfo.p_member_id};
		console.log("myStore:getData="+JSON.stringify(postData));
		Tools.post("http://yixip.bowyue.com/api/pgoods/index",postData,(resData)=>{
			console.log("myStore:getData="+JSON.stringify(resData));
			this.closeLoading();
			if(resData.length>0){
				this.listData=resData;
				this.setState({
				   	dataSource:this.ds.cloneWithRows(this.listData),
             		count:this.listData.length,
             		loaded:true,
				});
			}
			else{
				this.setState({
				   	dataSource:this.ds.cloneWithRows([]),
             		count:0,
             		loaded:true,
				});
			}
		},(err)=>{
			this.closeLoading();
			Toast.show(err);
		});
	}

	toSearch(){
      if(!Tools.isDataValid(this.state.searchMsg)){
        Toast.show("请输入搜索内容");
        return;
      }
      this.showLoading("加载中...");
      let postData={"p_member_id":this.props.param.userInfo.p_member_id,"name":this.state.searchMsg};
      console.log("getDatadianpu:"+JSON.stringify(postData));
      Tools.post("http://yixip.bowyue.com/api/pgoods/index",postData,(resData)=>{
         this.closeLoading();
			if(resData.length>0){
				this.listData=resData;
				this.setState({
				   	dataSource:this.ds.cloneWithRows(this.listData),
             		count:this.listData.length,
				});
			}
			else{
				this.setState({
				   	dataSource:this.ds.cloneWithRows([]),
             		count:0,
				});
			}
      },(err)=>{
      	this.closeLoading();
        Toast.show(err);
      });
    }

    _onRefresh(){
    	
    	this.getData();
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




	renderRow(rowData,i,j){
	    return(
	      <View>
	        <View style={styles.listItem}>
	          <Image style={styles.listItem_img} source={{uri:rowData.logo}}/>
	          <View style={styles.listItem_textView}>
	            <Text style={{fontSize:Size(17)}}>{rowData.name}</Text>
	            <Text style={{fontSize:Size(16),marginTop:5,color:"gray"}}>库存 <Text style={{color:"#9ebed5"}}>{rowData.stock}</Text> 件</Text>
	            <Text style={{fontSize:Size(18),marginTop:13,color:"#e16531"}}>¥{rowData.price}<Text style={{color:"gray",fontSize:Size(15)}}>/件</Text></Text>
	          </View>
	        </View>
	        <View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
	      </View>
	      );
	  }

    componentDidMount() {
      this.showLoading("加载中...");
      this.getData();
    }

  render() {
    return (
       <View style={{backgroundColor:"#fff",flex:1}}>
        	
	      	<View style={styles.container}>

	      		<View style={styles.topView}>
		      		<TouchableOpacity style={styles.top_leftView} onPress={()=>this.goBack()}>
		      			<Image style={styles.top_Icon} source={require('../icon/return.png')}/>
		      		</TouchableOpacity>
		      		<View style={styles.top_centerView}>
		      			<Image style={styles.center_icon} source={require('../icon/myseach.png')}/>
		      			<TextInput
	                  		returnKeyType={'search'}
	  	      				underlineColorAndroid="transparent"
	  	      				//multiline = {true}
	  	      				placeholder="舌尖上的中国推荐之重庆毛肚"
	  	      				placeholderTextColor="#707070"
	  				        style={styles.textInput}
	  				        onChangeText={(text) => this.setState({searchMsg:text})}
	  				        value={this.state.searchMsg}
	                 		onSubmitEditing={this.toSearch.bind(this)}
	                 // numberOfLines={1}
					      />
		      		</View>
	      		</View>
	      		<View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
	      		<View style={styles.maiView}>
	              {this.state.loaded&&<ListView
	                onRefresh={this._onRefresh.bind(this)}
	                count={this.state.count}
	                dataSource={this.state.dataSource}
	                renderRow={this.renderRow.bind(this)}
	              />}
	          	</View>
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
    backgroundColor:'#fff'
  },
  topView:{
		height:35,
		flexDirection:'row',
		alignItems:'center',
		//backgroundColor:'red'
	},
	top_leftView:{
		height:25,
		width:35,
		justifyContent:'center',
		alignItems:'center',
	},
	top_centerView:{
		height:25,
		flex:1,
		borderRadius:3,
		marginRight:10,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#e0e0e0'
	},
	textInput:{
		flex:1,
		height:25,
		fontSize:Size(15),
		marginTop:3,
    	marginLeft:5,
		//backgroundColor:'red'
	},
	top_Icon:{
		height:23,
		width:23,
		resizeMode:"contain"
	},
	center_icon:{
		marginLeft:8,
		height:15,
		width:15,
		resizeMode:'contain',
		//backgroundColor:'green'
	},
	maiView:{
	    flex:1,
	},
	 listItem:{
	    height:90,
	    flexDirection:'row',
	    paddingLeft:20,
	    paddingTop:15,
	    paddingBottom:15,
	    paddingRight:10,
	    alignItems:'center'
	  },
	  listItem_img:{
	    height:60,
	    width:70,
	    resizeMode:'stretch',
	  },
	  listItem_textView:{
	    width:120,
	    height:60,
	    marginLeft:10,
	    justifyContent:'space-around'
	    //backgroundColor:'red'
	  },
});


export default myStore;
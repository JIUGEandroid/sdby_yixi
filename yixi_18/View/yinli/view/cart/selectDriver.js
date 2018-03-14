'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Tools from "../../../Tools/tool.js";
import Toast from 'react-native-root-toast';
import LoadingShow from '../../../component/react-native-loading';
import AllListView from '../../../component/AllListView';
class selectDriver extends Component {

	constructor(props) {
	  super(props);
	this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	  	searchMsg:"",
	  	loadingWait:false,
      	loadingWaitText:"加载中",
      	dataSource:this.ds,
      	count:0,
	  };
	}


	getData(msg){
		let postData={"role":"4"};
		if(msg){
			postData={"role":"4","username":msg};
		}
		Tools.post("http://yixip.bowyue.com/api/pmember/index",postData,(resData)=>{
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
			Toast.show(err);
		});
	}


	toSearch(){
		if(!Tools.isDataValid(this.state.searchMsg)){
	        Toast.show("请输入搜索内容");
	        return;
     	 }
     	 this.showLoading("加载中...");
     	 this.getData(this.state.searchMsg);
	}

	backDriverInfo(rowData){
		this.props.param.callBack(rowData);
		this.goBack();
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

	goBack(){
		let {navigator}=this.props;
	    if(navigator){
	        navigator.pop();
	    }
	}

	renderRow(rowData,i,j){
		return(
			<TouchableOpacity onPress={()=>this.backDriverInfo(rowData)} activeOpacity={0.5}>
				<View style={styles.listItem}>
					<Image style={styles.listItem_touxiang} source={{uri:rowData.head_img}}/>
					<View style={styles.listItem_textView}>
						<View style={styles.listItem_driverInfo}>	
							<Text numberOfLines={2} style={{fontSize:Size(18)}}>{rowData.username}<Text style={{fontSize:Size(17)}}>·{rowData.mobile}</Text></Text>
						</View>
						<Text style={{fontSize:Size(18),color:'#515151'}}>车牌号:{rowData.driver.license_plate}</Text>
						<Text style={{fontSize:Size(16),color:'#515151'}}>常跑路线:{rowData.driver.line_start}--{rowData.driver.line_end}</Text>
					</View>
				</View>
				<View style={{height:1,backgroundColor:'#e0e0e0'}}/>
			</TouchableOpacity>
			);
	}


	componentDidMount() {
	  this.showLoading("加载中...");
	  this.getData();
	}

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}> 
      	<View style={styles.container}>
      		<NavTitle title={"选择司机"} goBack={this.goBack.bind(this)}/>
      		<View style={styles.searchView}>
      			<View style={styles.top_centerView}>
	      			<Image style={styles.center_icon} source={require('../icon/myseach.png')}/>
	      			<TextInput
	                    returnKeyType={'search'}
	      				underlineColorAndroid="transparent"
	      				//multiline = {true}
	      				placeholder="请输入司机姓名"
	      				placeholderTextColor="#707070"
				        style={styles.textInput}
				        onChangeText={(text) => this.setState({searchMsg:text})}
				        value={this.state.searchMsg}
				        onSubmitEditing={this.toSearch.bind(this)}
				      />
      			</View>
      		</View>
      		<View style={{flex:1}}>
              <AllListView
                onRefresh={this._onRefresh.bind(this)}
                count={this.state.count}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
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
	searchView:{
		height:40,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#e0e0e0'
	},
	top_centerView:{
		height:25,
		marginLeft:10,
		marginRight:10,
		borderRadius:4,

		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff'
	},
	textInput:{
		flex:1,
		height:25,
		fontSize:Size(15),
		marginTop:3,
        marginLeft:5,
		//backgroundColor:'red'
	},
	center_icon:{
		marginLeft:8,
		height:15,
		width:15,
		resizeMode:'contain',
		//backgroundColor:'green'
	},
	listItem:{
		flex:1,
		height:90,
		padding:10,
		flexDirection:'row',
		alignItems:'center',
		
	},
	listItem_driverInfo:{
		flexDirection:'row',
		height:30,
		//backgroundColor:'red'
	},
	listItem_touxiang:{
		width:60,
		height:60,
		borderRadius:30,
		resizeMode:'stretch',
	},
	listItem_textView:{
		marginLeft:10,
		height:70,
		flex:1,
		justifyContent:'space-around',
		//backgroundColor:'red'
	}
});


export default selectDriver;
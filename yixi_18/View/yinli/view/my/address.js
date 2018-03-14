'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import LoadingShow from '../../../component/react-native-loading';
import Tools from '../../../Tools/tool.js';
import Toast from 'react-native-root-toast';
import AllListView from '../../../component/AllListView';
class address extends Component {

	constructor(props) {
	  super(props);
	    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.listData=[];
	  this.state = {
      count:0,
      loaded:false,
      dataSource:this.ds,
      loadingWait:false,
      loadingWaitText:"加载中",
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

  returnBack(){
    this.showLoading("加载中...");
    this.getData();
  }

	toAddAdress(){
	    let {navigator}=this.props;
      if(navigator){
          navigator.push({
            name:"newAddress",
            param:{
              callBack:()=>this.returnBack(),
              code:"new"
            }
          });
      }
	}

  getData(){
    let postData={"type":"1"};
    Tools.post("http://yixip.bowyue.com/api/paddress/index",postData,(resData)=>{
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

  selectAddress(rowData){
    let {navigator}=this.props;
    this.props.param.callBack(rowData);
    if(navigator){
        navigator.pop();
    }
  }

  toEditAddress(rowData){
      let {navigator}=this.props;
      if(navigator){
          navigator.push({
            name:"newAddress",
            param:{
              callBack:()=>this.returnBack(),
              code:"edit",
              addressData:rowData,
            }
          });
      }
  }

  renderRow(rowData,i,j){
    return(
      <TouchableOpacity style={styles.listItem} onPress={this.props.param.code==1?()=>this.selectAddress(rowData):()=>{}} activeOpacity={this.props.param.code==1? 0.5:1}>
        <View style={styles.listItem_top}>
            <View style={styles.listItem_top_text}>
              <Text numberOfLines={2} style={{fontSize:Size(18)}}>{rowData.detail_address}</Text>
            </View>
            <TouchableOpacity  onPress={()=>this.toEditAddress(rowData)} >
              <Image style={styles.listItem_edtiIcon} source={require('../icon/edit.png')}/>
            </TouchableOpacity>
        </View>
        <View style={styles.listItem_bottom}>
           <Text style={{fontSize:Size(17),color:'#707070'}}>收货人:{rowData.name}<Text>  {rowData.mobile}</Text></Text>
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
      <View style={{flex:1,backgroundColor:"#fff"}}>
      	  <View style={styles.container}>
		      <NavTitle title={"收货地址"} goBack={this.goBack.bind(this)}/>
		      <View style={styles.content}>
		      	<View style={{flex:1}}>
              <AllListView
                onRefresh={this._onRefresh.bind(this)}
                count={this.state.count}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
		      	</View>
		      	<TouchableOpacity style={styles.bottomView} onPress={()=>this.toAddAdress()}>
		      		<Image style={styles.addIcon} source={require('../icon/zengjia.png')}/>
		      		<Text style={{color:"#1296db",fontSize:Size(20)}}>新增地址</Text>
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
    marginTop:iosMargin,
    //backgroundColor:"#fff",
  },
  content:{
  	flex:1,
  },
  bottomView:{
  	height:45,
  	borderTopWidth:1,
  	borderColor:'#e0e0e0',
  	flexDirection:"row",
  	alignItems:'center',
  	justifyContent:'center'
  },
  addIcon:{
  	width:25,
    height:25,
    resizeMode:'contain',
    marginRight:3,
  },
  listItem:{
    height:70,
    padding:10,

  },
  listItem_top:{
    height:30,
    flexDirection:'row',
    justifyContent:'space-between',
    //alignItems:'center',
    //backgroundColor:'red'
  },
  listItem_bottom:{
    flex:1
  },
  listItem_edtiIcon:{
    width:20,
    height:20,
    resizeMode:"contain",
    //marginRight:10,
  },
  listItem_top_text:{
    flex:1,
    //justifyContent:'center',
  }

});


export default address;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
var dismissKeyboard = require('dismissKeyboard');
import  ScrollableTabView from "react-native-scrollable-tab-view";
import ZhangdanTab from "./zhangdanTab.js";
import Tools from '../../../Tools/tool.js';
import LoadingShow from '../../../component/react-native-loading';
import Toast from 'react-native-root-toast';
import AllListView from '../../../component/AllListView';
class zhangdan extends Component {
  constructor(props) {
    super(props);
    this.dataTypes=[{"name":"1"},{"name":"2"},{"name":"3"},{"name":"4"}]
    this.tabIconNames=[require('../icon/daifahuo.png'),require('../icon/yunshuzhong.png'),require('../icon/yiwancheng.png'),require('../icon/quanbu.png')]
    this.tabNames=["代发货","运输中","已完成","全部订单"];
    this.orderId=[2,4,6,-1]
    this.userInfo={};
    this.state = {
      searchMsg:"",
      selectTag:"sell",
    };
  }



  toZhangben(){
    dismissKeyboard();
  }

  changTag(tag){
    this.setState({
      selectTag:tag
    });
  }

  componentDidMount() {

  }

  render() {
    let tabNames = this.tabNames;
    let tabIconNames = this.tabIconNames;
    return (
      <View style={styles.container}>
      	<View style={styles.topView}>
            <View style={styles.top_centerView}>
              <Image style={styles.center_icon} source={require('../icon/myseach.png')}/>
              <TextInput
                returnKeyType={'search'}
                placeholder="搜索账单"
                placeholderTextColor="#707070"
                style={styles.textInput}
                onChangeText={(text) => this.setState({searchMsg:text})}
                value={this.state.searchMsg}
              />
            </View>
            <TouchableOpacity style={styles.top_rightView} onPress={()=>this.toZhangben()}>
              <Image style={styles.top_Icon} source={require('../icon/zhangben.png')}/>
              <Text style={{color:"gray"}}>账本</Text>
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
        <View style={styles.twoView}>
            <TouchableOpacity style={styles.twoItem} onPress={()=>this.changTag("sell")}>
              <View style={styles.twoItem_left}>
                <Image style={styles.twoItem_leftIcon} source={require('../icon/maichu.png')}/>
                <Text style={{color:"gray",fontSize:Size(20)}}>卖出</Text>
              </View>
              {this.state.selectTag=="sell"&&<View style={{height:3,backgroundColor:"#1296db",width:100}}/>}
            </TouchableOpacity>
            <View style={{backgroundColor:'#e0e0e0',width:1,marginTop:15,marginBottom:15}}/>
            <TouchableOpacity style={styles.twoItem} onPress={()=>this.changTag("buy")}>
              <View style={styles.twoItem_left}>
                <Image style={styles.twoItem_leftIcon} source={require('../icon/mairu.png')}/>
                <Text style={{color:"gray",fontSize:Size(20)}}>买入</Text>
              </View>
             {this.state.selectTag=="buy"&&<View style={{height:3,backgroundColor:"#1296db",width:100}}/>}
            </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <ScrollableTabView
            tabBarBackgroundColor={"#fff"}
            renderTabBar={() => <ZhangdanTab tabNames={tabNames} tabIconNames={tabIconNames}/>}
            tabBarPosition='top'
            initialPage={3}>
            {this.dataTypes.map((item,i)=>{
                return(
                  <OrderIndex key={i}  tabLabel={"key"+i} selectTag={this.state.selectTag} tabName={this.tabNames[i]} orderId={this.orderId[i]} navigator={this.props.navigator}/>
                  );
            })}
          </ScrollableTabView>

        </View>
      </View>
    );
  }
}

class OrderIndex extends Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.goodsData=[{"num":"20180223894234","date":"2018-12-25 14:30","state":"待确认","data":[{"img":require('../icon/test_cart1.png'),"title":"当日新鲜极品毛肚","price":360,"num":3},
                                                                                          {"img":require('../icon/test_cart2.png'),"title":"当日新鲜极品毛肚","price":360,"num":1}]
                }];
    this.orderType=["未确认","已确认","已出库","已发车","已送达","已收货"];
    this.userInfo={};
    this.selectTag=this.props.selectTag;
    this.driver_name="";
    this.driver_id=0;
    this.kuguan_name="";
    this.kuguan_id=0;
    this.state = {
      dataSource:this.ds,
      loadingWait:false,
      loadingWaitText:"加载中",
      count:0,
    };
  }

  getData(){
    let order_role;
    if(this.selectTag=="buy"&&this.userInfo.role==1){
      order_role="buyer";
    }
    else if(this.selectTag=="sell"&&this.userInfo.role==1){
      order_role="business"
    }
    let postData={"order_role":order_role};
    if(this.props.orderId!=-1){
      postData={"order_role":order_role,"order_status":this.props.orderId}
    }
    //this.goodsData=[];
    console.log("OrderIndex:postData="+JSON.stringify(postData)+"  "+this.selectTag);
    Tools.post("http://yixip.bowyue.com/api/porder/index",postData,(resData)=>{
      this.closeLoading();
      console.log("OrderIndex:resData="+JSON.stringify(resData));
      if(resData.length>0){
        this.goodsData=resData;
       
        console.log("OrderIndex:orderState="+this.orderState);
        this.setState({
          dataSource:this.ds.cloneWithRows(this.goodsData),
          count:this.goodsData.length,
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
      //Toast.show(err);
      this.setState({
        dataSource:this.ds.cloneWithRows([]),
        count:0,
      });
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


  //取消订单
  cancelOrder(rowData){
    let postData={};
    if(this.userInfo.role==1||this.userInfo.role==6){
      postData={"order_id":rowData.id,"order_role":"buyer"};
    }
    Tools.post("http://yixip.bowyue.com/api/porder/del",postData,(resData)=>{
      Toast.show("订单已取消");
      this.showLoading("刷新数据中...");
      this.getData();
    },(err)=>{
      Toast.show(err);
    });
  }

  setDriver(driver){
    this.driver_name=driver.username;
    this.driver_id=driver.id;
    Toast.show("已选择司机"+this.driver_name+this.driver_id);
  }

  setKuguan(kuguan){
    this.kuguan_name=kuguan.username;
    this.kuguan_id=kuguan.id;
    Toast.show("已选择库管"+this.kuguan_name+this.kuguan_id);
  }


  //确认订单
  ensureOrder(rowData){
    console.log("ensureOrder:store_p_member_id="+JSON.stringify(rowData.store_p_member_id));
    console.log("ensureOrder:driver_p_member_id="+JSON.stringify(rowData.driver_p_member_id));
    let {navigator}=this.props;
    if(rowData.driver_p_member_id==0&&this.driver_id==0){
      if(navigator){
          navigator.push({
            name:"selectDriver",
            param:{
              callBack:(driver)=>this.setDriver(driver)
            }
          });
      }
      return;
    }
    if(rowData.store_p_member_id==0&&this.kuguan_id==0){
      if(navigator){
          navigator.push({
            name:"selectKuguan",
            param:{
              callBack:(kuguan)=>this.setKuguan(kuguan)
            }
          });
      }
      return;
    }
    //Toast.show("success");
    let postData={"order_id":rowData.id,"store_p_member_id":this.kuguan_id};
    if(rowData.driver_p_member_id==0){
        postData={"order_id":rowData.id,"store_p_member_id":this.kuguan_id,"driver_p_member_id":this.driver_id};
    }
    Tools.post("http://yixip.bowyue.com/api/porder/businesssure",postData,(resData)=>{
      Toast.show("已确认");
      this.getData();
    },(err)=>{
      Toast.show(err);
    });
  }

  componentDidMount() {
    console.log("OrderIndex:"+"componentDidMount");
    this.showLoading("加载中...");
    Tools.getStorage("user_info",(resData)=>{
      this.userInfo=JSON.parse(resData);
      console.log("userInfo:"+JSON.stringify(this.userInfo.role));
      this.getData();
    });
  }

  componentWillReceiveProps(nextProps){
    console.log("OrderIndex:postData="+JSON.stringify(nextProps.selectTag));
    this.showLoading("加载中...");
    this.selectTag=nextProps.selectTag;
    //this.goodsData=[];
    this.getData();
  }


  renderRow(rowData,i,j){
    console.log("OrderIndex:"+JSON.stringify(rowData.item));
    return(
      <View>
      <View style={styles.listItem}>
        <View style={styles.listItemTop}>
          <Text style={{fontSize:Size(15)}}>单号:"{rowData.order_sn}"</Text>
          <Text style={{fontSize:Size(14),marginLeft:10}}>{rowData.add_ymd}</Text>
          <Text style={{fontSize:Size(18),marginLeft:15,color:'rgb(237,142,46)'}}>{this.orderType[rowData.order_status-1]}</Text>
        </View>

        <View>
          {rowData.item&&rowData.item.map((item,i)=>{
              return(
                <View>
                    <View style={styles.listItem_item}>
                      <Image style={styles.listItem_img} source={{uri:item.goods_logo}}/>
                      <View style={styles.listItem_textView}>
                        <Text style={{fontSize:Size(18)}}>{item.goods_name}</Text>
                        <Text style={{fontSize:Size(20),marginTop:13,color:"#e16531"}}>¥{item.goods_price}<Text style={{color:"gray",fontSize:Size(17)}}>/件</Text></Text>
                      </View>
                      <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{marginLeft:10,fontSize:Size(20)}}>× {item.num}</Text>
                      </View>
                    </View>
                     <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
                </View>
                );
          })}
        </View>
        <View style={styles.listItem_bottom}>
            <View style={styles.listItem_bottomTop}>
              <Text style={{fontSize:Size(15),marginRight:10}}>共<Text style={{fontSize:Size(18)}}>{rowData.item&&rowData.item.length}</Text>件商品</Text>   
              <Text style={{marginRight:5}}>合计 ¥{rowData.price}</Text>   
            </View>
            <View style={styles.listItem_bottomBottom}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Image style={styles.dianhuaIcon} source={require('../icon/dianhua.png')}/>
                <Text style={{marginLeft:3, fontSize:Size(17)}}>联系买家</Text>                                                                  
              </View>
              <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                {this.selectTag=="buy"&&rowData.order_status==1&&<TouchableOpacity style={[styles.button,{backgroundColor:'#b0b0b0'}]} onPress={()=>this.cancelOrder(rowData)}>
                    <Text style={{color:'#fff',fontSize:Size(15)}}>取消订单</Text>
                </TouchableOpacity>}
                {this.selectTag=="sell"&&this.userInfo.role==1&&rowData.order_status==1&&<TouchableOpacity style={[styles.button,{marginLeft:10}]}  onPress={()=>this.ensureOrder(rowData)}>
                    <Text style={{color:'#fff',fontSize:Size(15)}}>确认订单</Text>
                </TouchableOpacity>}
              </View>
            </View>
        </View>

      </View>
        <View style={{height:10,backgroundColor:'#f0f0f0'}} />
      </View>
      );
  }


  render(){
    return(
      <View style={{flex:1}}>
        <View style={{height:1,backgroundColor:'#f0f0f0'}} />
        <AllListView
          style={styles.ListView}
          onRefresh={this._onRefresh.bind(this)}
          count={this.state.count}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
         <LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  },
  topView:{
      marginTop:iosMargin,
      height:50,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:"#fff"
    },
  top_centerView:{
      height:25,
      flex:1,
      borderRadius:3,
      marginLeft:10,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#e0e0e0'
  },
  top_rightView:{
    height:25,
    width:70,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  center_icon:{
    marginLeft:8,
    height:15,
    width:15,
    resizeMode:'contain',
    //backgroundColor:'green'
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
  twoView:{
    height:50,
    flexDirection:'row',
  },
  twoItem:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  twoItem_left:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginBottom:5,
    //backgroundColor:'blue'
  },
  twoItem_leftIcon:{
    height:30,
    width:30,
    resizeMode:"contain"
  },
    content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1
  },
  ListView:{
      backgroundColor:'#f0f0f0'
    },
  listItemTop:{
    height:20,
    flexDirection:'row'
  },
  listItem:{
    padding:10,
    backgroundColor:'#fff'
  },
  listItem_img:{
    height:70,
    width:80,
    resizeMode:'stretch',
  },
  listItem_textView:{
    width:160,
    height:70,
    marginLeft:10,
    justifyContent:'space-between'
    //backgroundColor:'red'
  },
  listItem_item:{
    height:90,
    flexDirection:'row',
    paddingTop:15,
    paddingBottom:15,
    alignItems:'center',
   // backgroundColor:'red'
  },
  listItem_bottom:{
    height:60,
  },
  listItem_bottomTop:{
    height:30,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  listItem_bottomBottom:{
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  dianhuaIcon:{
    height:18,
    width:18,
    resizeMode:'contain',
  },
  button:{
    width:65,
    height:24,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#1296db',
    borderRadius:1
  }
});


export default zhangdan;
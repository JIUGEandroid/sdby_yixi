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
import ZhangdanTab from "./zhangdanTab.js"
class zhangdan extends Component {
  constructor(props) {
    super(props);
    this.dataTypes=[{"name":"1"},{"name":"2"},{"name":"3"},{"name":"4"}]
    this.tabIconNames=[require('../icon/daifahuo.png'),require('../icon/yunshuzhong.png'),require('../icon/yiwancheng.png'),require('../icon/quanbu.png')]
    this.tabNames=["代发货","运输中","已完成","全部订单"];
    
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
                underlineColorAndroid="transparent"
                multiline = {true}
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
              {this.state.selectTag=="sell"&&<View style={{height:5,backgroundColor:"#1296db",width:100}}/>}
            </TouchableOpacity>
            <View style={{backgroundColor:'#e0e0e0',width:1,marginTop:15,marginBottom:15}}/>
            <TouchableOpacity style={styles.twoItem} onPress={()=>this.changTag("buy")}>
              <View style={styles.twoItem_left}>
                <Image style={styles.twoItem_leftIcon} source={require('../icon/mairu.png')}/>
                <Text style={{color:"gray",fontSize:Size(20)}}>买入</Text>
              </View>
             {this.state.selectTag=="buy"&&<View style={{height:5,backgroundColor:"#1296db",width:100}}/>}
            </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <ScrollableTabView
            tabBarBackgroundColor={"#fff"}
            renderTabBar={() => <ZhangdanTab tabNames={tabNames} tabIconNames={tabIconNames}/>}
            tabBarPosition='top'
            initialPage={0}>
            {this.dataTypes.map((item,i)=>{
                return(
                  <OrderIndex key={i}  tabLabel={"key"+i} />
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
    this.state = {
      dataSource:this.ds,
    };
  }

  cancelOrder(){

  }

  ensureOrder(){

  }

  renderRow(rowData,i,j){
    return(
      <View style={styles.listItem}>
        <View style={styles.listItemTop}>
          <Text style={{fontSize:Size(15)}}>单号:"{rowData.num}"</Text>
          <Text style={{fontSize:Size(14),marginLeft:10}}>{rowData.date}</Text>
          <Text style={{fontSize:Size(18),marginLeft:15,color:'rgb(237,142,46)'}}>{rowData.state}</Text>
        </View>

        <View>
          {rowData.data.map((item,i)=>{
              return(
                <View>
                    <View style={styles.listItem_item}>
                      <Image style={styles.listItem_img} source={item.img}/>
                      <View style={styles.listItem_textView}>
                        <Text style={{fontSize:Size(18)}}>{item.title}</Text>
                        <Text style={{fontSize:Size(20),marginTop:13,color:"#e16531"}}>¥{item.price}<Text style={{color:"gray",fontSize:Size(17)}}>/件</Text></Text>
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
              <Text style={{fontSize:Size(15),marginRight:10}}>共<Text style={{fontSize:Size(18)}}>{rowData.data.length}</Text>件商品</Text>   
              <Text style={{marginRight:5}}>合计 ¥{720.00}</Text>   
            </View>
            <View style={styles.listItem_bottomBottom}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Image style={styles.dianhuaIcon} source={require('../icon/dianhua.png')}/>
                <Text style={{marginLeft:3, fontSize:Size(17)}}>联系买家</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#b0b0b0'}]} onPress={()=>this.cancelOrder()}>
                    <Text style={{color:'#fff',fontSize:Size(15)}}>取消订单</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{marginLeft:10}]}  onPress={()=>this.ensureOrder()}>
                    <Text style={{color:'#fff',fontSize:Size(15)}}>确认订单</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
      );
  }

    componentDidMount() {
      this.setState({
          dataSource:this.ds.cloneWithRows(this.goodsData),
      });
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{height:10,backgroundColor:'#f0f0f0'}} />
        <ListView
            style={styles.ListView}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
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
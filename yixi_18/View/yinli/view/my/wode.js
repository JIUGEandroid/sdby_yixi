'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Tools from '../../../Tools/tool.js';
class wode extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      comInfo:"",
      userInfo:"",
    };
  }

  toUpGoods(){
      let {navigator}=this.props;
      if(navigator){
          navigator.push({
              name:"upGoods"
          });
      }
  }

  toAddress(){
    let {navigator}=this.props;
      if(navigator){
          navigator.push({
              name:"address",
              param:{
                code:0,
              }
          });
      }
  }

  toUpdate(){
      let {navigator}=this.props;
      if(navigator){
          navigator.push({
              name:"update"
          });
      }
  }

  toMyStore(){
      let {navigator}=this.props;
      if(navigator){
          navigator.push({
              name:"myStore",
              param:{
                userInfo:this.state.userInfo,
              }
          });
      }
  }


  toMyStaff(){
      let {navigator}=this.props;
      if(navigator){
          navigator.push({
              name:"myStaff"
          });
      }
  }


  componentWillMount() {
      Tools.getStorage("user_info",(resData)=>{
          let userInfo;
          let role=JSON.parse(resData).role;
          if(role==1){
            userInfo=JSON.parse(resData).business
          }
          else if(role==4){
            userInfo=JSON.parse(resData).driver;
          }
          this.setState({
            comInfo: JSON.parse(resData),
            userInfo:userInfo,
          },()=>{
            console.log("componentDidMount:wode="+JSON.stringify(this.state.userInfo.store_name));
          });
          
          //this.getData();
      });
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={{backgroundColor:"#fff",flex:1}}>
          <View style={styles.container}>
            <View style={styles.nav}>
              <Image style={styles.messageIcon} source={require('../icon/xiaoxi.png')}/>
            </View>
            <View style={styles.userInfoView}>
              <Image style={styles.touxiangIcon} source={this.state.userInfo.store_logo?{uri:this.state.userInfo.store_logo}:require('../icon/fd1.png')}/>
              <View style={styles.userInfoView_midView}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:Size(20)}}>{this.state.comInfo.username}</Text>
                  {this.state.userInfo.check_status!=0&&<View style={styles.passView}>
                    <Text style={{color:'#fff',fontSize:Size(11)}}>已认证</Text>
                  </View>}
                </View>
                <Text style={{fontSize:Size(18),marginTop:25,color:"#707070"}}>{this.state.userInfo.store_name}</Text>
              </View>
              <View style={styles.userInfoView_rightView}>
                  <View style={styles.vipView}>
                    <Image style={styles.dunpaiIcon} source={require('../icon/dunpai.png')}/>
                    <Text style={{fontSize:Size(14),color:'#fff'}}>普通会员</Text>
                  </View>
              </View>
            </View>
            <TouchableOpacity style={styles.itemView} onPress={()=>this.toUpGoods()}>
               <Image style={styles.icon} source={require('../icon/luru.png')}/>
               <View style={{flex:1}}>
                 <View style={styles.itemView_right}>
                    <Text style={{fontSize:Size(18)}}>录入商品</Text>
                    <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
                 </View>
                 <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toUpdate()}>
               <Image style={styles.icon} source={require('../icon/shengji.png')}/>
               <View style={{flex:1}}>
                 <View style={styles.itemView_right}>
                    <Text style={{fontSize:Size(18)}}>升级认证</Text>
                    <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
                 </View>
                 
               </View>
            </TouchableOpacity>
             <TouchableOpacity style={styles.itemView} onPress={()=>this.toMyStore()}>
               <Image style={styles.icon} source={require('../icon/dianpu.png')}/>
               <View style={{flex:1}}>
                 <View style={styles.itemView_right}>
                    <Text style={{fontSize:Size(18)}}>我的店铺</Text>
                    <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
                 </View>
                 <View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemView,{marginTop:0}]} onPress={()=>this.toAddress()}>
               <Image style={styles.icon} source={require('../icon/shouhuo.png')}/>
               <View style={{flex:1}}>
                 <View style={styles.itemView_right}>
                    <Text style={{fontSize:Size(18)}}>收货地址</Text>
                    <Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
                 </View>
                 
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemView} onPress={()=>this.toMyStaff()}>
               <Image style={styles.icon} source={require('../icon/yuangong.png')}/>
               <View style={{flex:1}}>
                 <View style={styles.itemView_right}>
                    <Text style={{fontSize:Size(18)}}>我的员工</Text>
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
    marginTop:iosMargin,
    flex:1,
    backgroundColor:'#f0f0f0'
  },
  nav:{
    height:45,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  messageIcon:{
    height:25,
    width:25,
    resizeMode:'contain',
    marginRight:20,
  },
  userInfoView:{
    height:100,
    backgroundColor:'#fff',
    flexDirection:'row',
    paddingLeft:15,
    paddingTop:15,
    paddingBottom:15,
    //backgroundColor:'red'
  },
  touxiangIcon:{
    width:85,
    height:70,
    resizeMode:'stretch',
    borderRadius:7,
  },
  userInfoView_midView:{
    flex:1,
    marginLeft:10,
    marginTop:5,
  },
  userInfoView_rightView:{
    width:90,
    //backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
  },
  vipView:{
    height:55,
    width:80,
    backgroundColor:'#1296db',
    borderTopLeftRadius:30,
    borderBottomLeftRadius:30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    shadowColor:"#000000",
    shadowRadius:2,
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:0}
  },
  dunpaiIcon:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  itemView:{
    marginTop:10,
    height:45,
    flexDirection:'row',
    backgroundColor:'#fff',
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
    height:20,
    resizeMode:'contain',
    marginLeft:10,
    marginRight:15,
  },
  youjiantouView:{
    width:20,
    height:15,
    resizeMode:'stretch',
    marginRight:5,
  },
  passView:{
      padding:2,
      height:13,
      justifyContent:'center',
       alignItems:'center',
      backgroundColor:'#1b9dfa',
      borderRadius:2,
      marginLeft:5,
    },
});


export default wode;
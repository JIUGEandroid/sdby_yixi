'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
    TouchableOpacity

} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
import Tools from '../Tools/tool.js';
import Toast from 'react-native-root-toast';
class application extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  goYl(){
    let {navigator}=this.props;
/*    if(navigator){
          navigator.push({
            name:"chooseRole",
          });
        }*/
    Tools.post("http://yixip.bowyue.com/api/pmember/getPmember",{},(resData)=>{
      console.log("goYl:"+JSON.stringify(resData));
      Tools.setStorage("user_info",JSON.stringify(resData));
      if(navigator){
        navigator.push({
          name:"yinli",
          param:{
            index:"shangcheng"
          }
        });
      }
    },(err)=>{
      //Toast.show(err);
        if(navigator){
          navigator.push({
            name:"chooseRole",
          });
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
            <Text style={styles.navText}>易汐应用</Text>
        </View>
        <View style={styles.content}>
            <TouchableOpacity style={styles.appView} onPress={()=>this.goYl()}>
              <Image style={styles.icon} source={require("../icon/yinli.png")} />
              <Text style={{marginTop:5,fontSize:Size(16)}}>银犁交易平台</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#3975cb",
  },
  nav:{
    marginTop:iosMargin,
    height:45,
    alignItems: 'center',
    backgroundColor:"#3975cb",
    justifyContent:'center',
  },
  navText:{
    fontSize:Size(22),
    color:"#fff",

  },
  content:{
    flex:1,
    backgroundColor:'#fff'
  },
  appView:{
    marginTop:10,
    height:100,
    width:100,
    justifyContent:'center',
    alignItems:'center',
  },
  icon:{
    //backgroundColor:'red',
    width:60,
    height:60,
    resizeMode: "contain",
  }
});


export default application;
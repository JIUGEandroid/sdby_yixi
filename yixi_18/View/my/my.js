'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  StatusBar
} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
import Tools from '../Tools/tool.js';
import Button from "../component/button.js";

class my extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      user_id:"",
    };
  }

  quit(){
    this.cleanStorage().then(()=>{
          let {navigator}=this.props;
          if(navigator){
            navigator.push({
              name:"login",
            });
          }
    });
     
  }

  cleanStorage(){
    let key="isLogin";
    return new Promise((resolve,reject)=>{
      AsyncStorage.setItem(key.toLowerCase(),"0")
        .then(()=> {
          resolve();
        })
        .catch((error) => {

        })
        .done();
     });
  }

  componentDidMount() {
    Tools.getStorage("account",(account)=>{
      this.setState({
        user_id:account 
      }); 
    });
  }

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.nav}>
            <Text style={styles.navText}>我的设置</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.content_text}>当前登录账号：{this.state.user_id}</Text>
        </View>
        <View style={styles.bottom_view}>
            <Button text={"退出登录"} onClick={this.quit.bind(this)} style={{backgroundColor:"#d0d0d0",height:30,width:130}} textStyle={{fontSize:Size(20),color:"gray"}} />
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
  content_text:{
    marginTop:50,
    fontSize:Size(22),
    color:"gray",
  },
  content:{
    height:390,
    backgroundColor:'#fff',
    alignItems:'center',
  },
  bottom_view:{
    flex:1,
    backgroundColor:"#fff",
    justifyContent:'center',
    alignItems:'center'
  }
});


export default my;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
class message extends Component {
  render() {
    return (
      <View style={{flex:1,marginTop:iosMargin,alignItems:'center'}}>
      	<Text style={{fontSize:Size(20),marginTop:50}}>当前不支持发送和接受消息</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default message;
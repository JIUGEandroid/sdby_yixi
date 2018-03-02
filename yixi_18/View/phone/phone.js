'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {Size,baseColor,iosMargin} from "../Tools/constStr.js";
var adata=[{data:'A'},{data:'B'},{data:'C'},{data:'D'},{data:'E'},{data:'F'},{data:'G'},{data:'H'},{data:'J'},{data:'K'},{data:'L'},{data:'M'},{data:'N'},{data:'O'},{data:'P'},{data:'Q'},{data:'R'},{data:'S'},{data:'T'},{data:'U'},{data:'V'},{data:'W'},{data:'X'},{data:'Y'},{data:'Z'},{data:'#'}]

class phone extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      search:"",
    };
  }

  srollTo(char){

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.top_view}>
               <View style={[styles.top_item,{backgroundColor:'#769fda'}]}>
                <Text style={styles.top_item_text}>好友</Text>
              </View>
              <View style={[styles.top_item,{borderTopRightRadius:5,borderBottomRightRadius:5}]}>
                <Text style={styles.top_item_text}>通话记录</Text>
              </View>
          </View>
        </View>
        <View style={styles.search_view}>
           <Image style={styles.search_img} source={require("../icon/search.png")} />
           <TextInput
              placeholder="搜索好友" 
              style={styles.textInput}
              onChangeText={(text) => this.setState({search:text})}
              placeholderTextColor={'#e9e9e9'}
           />
        </View>
        <View style={styles.midview}>
            <View style={styles.midview_item}>
                <Image style={styles.mid_img} source={require("../icon/newFriend.png")} />
                <Text style={styles.mid_text}>新的朋友</Text>
            </View>
            <View style={{backgroundColor:"#e0e0e0",height:0.5}}/>
            <View style={styles.midview_item}>
                <Image style={styles.mid_img} source={require("../icon/recentContact.png")} />
                <Text style={styles.mid_text}>最近联系</Text>
            </View>
        </View>
        <View style={styles.content}>
          
        </View>
        <View style={styles.LetterList}>
          {adata.map((item,i)=>{
            return(<TouchableOpacity  onPress={()=>this.srollTo(item.data)} key={i}><Text key={i} style={{fontSize:Size(15)}}>{item.data}</Text></TouchableOpacity>)
          })}
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
  search_view:{
    height:30,
    backgroundColor:"#3975cb",
    flexDirection:'row',
    alignItems:'center'
  },
  search_img:{
    marginLeft:10,
    height:15,
    width:15,
    resizeMode: "contain",
  },
  textInput:{
    height:25,
    width:250,
    marginLeft:5,
    fontSize:Size(18),
    color:"#e9e9e9"
  },
  content:{
    flex:1,
    backgroundColor:'#fff',
  },
  top_view:{
    flexDirection:'row',
    width:200,
    height:30,
    borderWidth:0.5,
    borderColor:'#769fda',
    borderRadius:5
  },
  top_item:{
    flex:1,
    backgroundColor:'#3975cb',
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  top_item_text:{
    color:"#fff",
    fontSize:Size(16),
  },
  midview:{
    height:100,
  },
  midview_item:{
    height:50,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center'
  },
  mid_img:{
    marginLeft:10,
    height:37,
    width:37,
    resizeMode: "contain",
  },
  mid_text:{
    fontSize:Size(20),
    marginLeft:10
  },
  LetterList:{
    position:'absolute',
    width:15,
    height:880,
    flexWrap:"wrap",
    right:5,
    top:160,
    //backgroundColor:'red'
  },
});


export default phone;
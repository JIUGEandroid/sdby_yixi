'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
class gouwuche extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.listData=[{"title":"当日新鲜极品毛肚","store":"时代博越干杂店","price":360,"img":require('../icon/test_cart1.png')},
                  {"title":"当日新鲜极品毛肚","store":"时代博越干杂店","price":180,"img":require('../icon/test_cart2.png')},
                  {"title":"当日新鲜极品毛肚","store":"时代博越干杂店","price":220,"img":require('../icon/test_cart3.png')}
                  ,{"title":"当日新鲜极品毛肚","store":"时代博越干杂店","price":450,"img":require('../icon/test_cart4.png')},
                  {"title":"当日新鲜极品毛肚","store":"时代博越干杂店","price":450,"img":require('../icon/test_cart4.png')}];
    this.listNum=new Array();
    this.listTag=new Array();
    this.sumPrice=0;
    this.state = {
      dataSource: this.ds,
      tag:0,
      allPrice:0,
      selctAll:false,
    };
  }

  getData(){
      for(let i=0;i<this.listData.length;i++){
        this.listNum[i]=1;
        this.listTag[i]=false;
      }
     this.setState({
          dataSource:this.ds.cloneWithRows(this.listData),
      });
  }

  addNum(i){
    this.listNum[i]=this.listNum[i]+1;
    this.setState({
        tag:1
    });
    if(this.listTag[i]){
      this.countSum();
    }
  }

  subNum(i){
    if(this.listNum[i]>1){
      this.listNum[i]=this.listNum[i]-1;
          this.setState({
              tag:1
          });
      if(this.listTag[i]){
        this.countSum();
      }
    }
  }


  delete(){

  }

  submit(){

  }

  countSum(){
    this.sumPrice=0;
    for(let i=0;i<this.listTag.length;i++){
      if(this.listTag[i]){
        this.sumPrice=this.sumPrice+this.listNum[i]*this.listData[i].price;
      }
    }
    this.setState({
      allPrice:this.sumPrice,
    });
  }

  selectItem(rowData,j){
    this.listTag[j]=!this.listTag[j];
    this.setState({
      tag:1,
    },()=>this.countSum());
  }

  selctAll(){

    for(let i=0;i<this.listTag.length;i++){
      if(this.state.selctAll){
        this.listTag[i]=false;
      }
      else{
        this.listTag[i]=true;
      }
    }
    this.setState({
      selctAll:!this.state.selctAll
    },()=>this.countSum());
  }

  componentDidMount() {
    this.getData();
  }




  renderRow(rowData,i,j){
    return(
      <View>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={()=>this.selectItem(rowData,j)}>
            <Image style={styles.circle} source={this.listTag[j]?require('../icon/circle_sx.png'):require('../icon/circle.png')}/>
          </TouchableOpacity>
          <Image style={styles.listItem_img} source={rowData.img}/>
          <View style={styles.listItem_textView}>
            <Text style={{fontSize:Size(17)}}>{rowData.title}</Text>
            <Text style={{fontSize:Size(16),marginTop:5,color:"gray"}}>{rowData.store}</Text>
            <Text style={{fontSize:Size(18),marginTop:13,color:"#e16531"}}>¥{rowData.price}<Text style={{color:"gray",fontSize:Size(15)}}>/件</Text></Text>
          </View>
          <View style={{flex:1,height:70}}>
              <View style={{flexDirection:'row',height:25,alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.subNum(j)}>
                  <Image style={styles.addIcon} source={require('../icon/sub.png')}/>
                </TouchableOpacity>
                <Text  style={{fontSize:Size(20),marginLeft:2,marginRight:2,color:"#000000"}}>{this.listNum[j]}</Text>
                <TouchableOpacity onPress={()=>this.addNum(j)}>
                  <Image style={styles.addIcon} source={require('../icon/add.png')}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{flex:1,justifyContent:"flex-end"}} onPress={()=>this.delete(j)}>
                  <View style={styles.deleteView}>
                     <Image style={styles.deleteIcon} source={require('../icon/delete.png')}/>
                  </View>
              </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
      </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.nav}>
            <Text style={{fontSize:Size(18)}}>购物车</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.maiView}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
          </View>
          <View style={styles.bottomView}>
            <View style={styles.bottomView_left}>
               <TouchableOpacity onPress={()=>this.selctAll()}>
                   <Image style={styles.circle} source={this.state.selctAll?require('../icon/circle_sx.png'):require('../icon/circle.png')}/>
               </TouchableOpacity>
               <Text style={{fontSize:Size(15)}}>全选</Text>
               <Text style={{marginLeft:15,fontSize:Size(17)}}>合计:</Text>
               <Text style={{marginLeft:3,fontSize:Size(17)}}>¥{this.state.allPrice}</Text>
            </View>
            <TouchableOpacity style={styles.bottomView_right} onPress={()=>this.submit()}>
              <Text style={{color:'#fff',fontSize:Size(18)}}>提交订单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f0f0f0',
  },
  nav:{
    marginTop:iosMargin,
    height:45,
    backgroundColor:'#f0f0f0',
    justifyContent:"center",
    alignItems:"center"
  },
  content:{
    flex:1,
    backgroundColor:'#fff'
  },
  maiView:{
    flex:1,
  },
  bottomView:{
    height:40,
    backgroundColor:"#f0f0f0",
    flexDirection:'row'
  },
  listItem:{
    height:100,
    flexDirection:'row',
    paddingTop:20,
    paddingBottom:20,
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
    //backgroundColor:'red'
  },
  circle:{
    marginLeft:5,
    marginRight:5,
    width:20,
    height:20,
    resizeMode:'contain',
  },
  addIcon:{
    width:30,
    height:30,
    resizeMode:'stretch',
  },
  deleteView:{
    height:27,
    width:27,
    borderRadius:14,
    borderWidth:1,
    borderColor:"#e16531",
    justifyContent:'center',
    alignItems:'center',
    marginLeft:40
  },
  deleteIcon:{
    width:20,
    height:20,
    resizeMode:'stretch',
  },
  bottomView_left:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
    //backgroundColor:'red'
  },
  bottomView_right:{
    backgroundColor:'rgb(84,132,236)',
    justifyContent:'center',
    alignItems:'center',
    width:130,
  }
});


export default gouwuche;
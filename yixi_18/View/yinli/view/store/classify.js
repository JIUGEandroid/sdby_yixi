'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  text,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ListView,
   Linking
} from 'react-native';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Tools from "../../../Tools/tool.js";
import Toast from 'react-native-root-toast';
import LoadingShow from '../../../component/react-native-loading';
import AllListView from '../../../component/AllListView';
class classify extends Component {
	constructor(props) {
	  super(props);
	
	  this.listNum=new Array();

	  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      /*this.listData=[{"title":"当日新鲜极品毛肚","kucun":"1380","price":360,"img":require('../icon/test_cart1.png')},
          {"title":"当日新鲜极品毛肚","kucun":"1380","price":180,"img":require('../icon/test_cart2.png')},
          {"title":"当日新鲜极品毛肚","kucun":"1380","price":220,"img":require('../icon/test_cart3.png')}];*/
	    this.listData=new Array();
		  this.state = {
		  	count:0,
		  	dataSource: this.ds,
		  	searchMsg:"",
		  	loadingWait:false,
      		loadingWaitText:"加载中",
		  };
	}


	getData(){
      let postData={"category":this.props.param.code};
      console.log("getDatadianpu:"+JSON.stringify(postData));
      Tools.post("http://yixip.bowyue.com/api/pgoods/index",postData,(resData)=>{
      	this.closeLoading();
         console.log("getData111:"+JSON.stringify(resData[0].mobile));
        if(resData.length>0){
          this.listData=resData;
          for(let i=0;i<this.listData.length;i++){
            this.listNum[i]=0;
          }
          this.setState({
            dataSource:this.ds.cloneWithRows(this.listData),
            count:this.listData.length,
          })
        }
        else{
        	this.setState({
	            dataSource:this.ds.cloneWithRows([]),
	            count:0,
          	})
        }
      },(err)=>{
      	this.closeLoading();
        Toast.show(err);
      });

/*		for(let i=0;i<this.listData.length;i++){  
	        this.listNum[i]=0;
	    }
     	this.setState({
          	dataSource:this.ds.cloneWithRows(this.listData),
     	});*/
  	}

  	addToCart(rowData,j){
      if(this.listNum[j]<=0){
        Toast.show("请选择数量");
        return;
      }
      this.showLoading("保存中...");
      let postData={"goods_id":rowData.id,"num":this.listNum[j]};
      console.log("addToCart:"+JSON.stringify(postData));
      Tools.post("http://yixip.bowyue.com/api/pcart/add",postData,(resData)=>{
      	this.closeLoading();
        Toast.show("保存成功");
      },(err)=>{
      	this.closeLoading();
        Toast.show(err);
      });
  	}

  	toMyCart(){
        let {navigator}=this.props;
        if(navigator){
            this.props.param.callBack();
            navigator.pop();
        }
  	}

    toSearch(){
      if(!Tools.isDataValid(this.state.searchMsg)){
        Toast.show("请输入搜索内容");
        return;
      }
      let postData={"p_member_id":this.props.param.storeData?this.props.param.storeData.p_member_id:"","name":this.state.searchMsg};
      console.log("getDatadianpu:"+JSON.stringify(postData));
      Tools.post("http://yixip.bowyue.com/api/pgoods/index",postData,(resData)=>{
      	this.closeLoading();
        console.log("getData:"+JSON.stringify(resData));
        if(resData.length>0){
          this.listData=resData;
          for(let i=0;i<this.listData.length;i++){
            this.listNum[i]=0;
          }
          this.setState({
            dataSource:this.ds.cloneWithRows(this.listData),
            count:this.listData.length,
          })
        }
        else{
	        this.setState({
	            dataSource:this.ds.cloneWithRows([]),
	            count:0,
	        })
        }
      },(err)=>{
      	this.closeLoading();
        Toast.show(err);
        this.setState({
            dataSource:this.ds.cloneWithRows([]),
            count:0,
        })
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

    goBack(){
        let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }

  	addNum(i){
	    this.listNum[i]=this.listNum[i]+1;
	    this.setState({
	        tag:1
	    });
    }

  subNum(i){
    if(this.listNum[i]>0){
      this.listNum[i]=this.listNum[i]-1;
          this.setState({
              tag:1
          });
    }
  }

	  componentDidMount() {
	  	this.showLoading("加载中...");
	    this.getData();
	  }

	renderRow(rowData,i,j){
	    return(
	      <View>
	        <View style={styles.listItem}>
	          <Image style={styles.listItem_img} source={{uri:rowData.logo}}/>
	          <View style={styles.listItem_textView}>
	            <Text style={{fontSize:Size(17)}}>{rowData.name}</Text>
	            <Text style={{fontSize:Size(16),marginTop:5,color:"gray"}}>库存 <Text style={{color:"#9ebed5"}}>{rowData.stock}</Text> 件</Text>
	            <Text style={{fontSize:Size(18),marginTop:13,color:"#e16531"}}>¥{rowData.price}<Text style={{color:"gray",fontSize:Size(15)}}>/件</Text></Text>
	          </View>
	          <View style={{flex:1,height:70,alignItems:'center'}}>
	              <View style={{flexDirection:'row',height:25,alignItems:'center'}}>
	                <TouchableOpacity onPress={()=>this.subNum(j)}>
	                  <Image style={styles.addIcon} source={require('../icon/sub.png')}/>
	                </TouchableOpacity>
	                <Text  style={{fontSize:Size(20),marginLeft:2,marginRight:2,color:"#000000"}}>{this.listNum[j]}</Text>
	                <TouchableOpacity onPress={()=>this.addNum(j)}>
	                  <Image style={styles.addIcon} source={require('../icon/add.png')}/>
	                </TouchableOpacity>
	              </View>
	              <TouchableOpacity style={{flex:1,justifyContent:"flex-end"}} onPress={()=>this.addToCart(rowData,j)}>
	                  <View style={styles.deleteView}>
	                     <Image style={styles.deleteIcon} source={require('../icon/cart_dp.png')}/>
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
       <View style={{backgroundColor:"#fff",flex:1}}>
      	<View style={styles.container}>
      		<View style={styles.topView}>
	      		<TouchableOpacity style={styles.top_leftView} onPress={()=>this.goBack()}>
	      			<Image style={styles.top_Icon} source={require('../icon/return.png')}/>
	      		</TouchableOpacity>
	      		<View style={styles.top_centerView}>
	      			<Image style={styles.center_icon} source={require('../icon/myseach.png')}/>
	      			<TextInput
                  returnKeyType={'search'}
  	      				underlineColorAndroid="transparent"
  	      				//multiline = {true}
  	      				placeholder="舌尖上的中国推荐之重庆毛肚"
  	      				placeholderTextColor="#707070"
  				        style={styles.textInput}
  				        onChangeText={(text) => this.setState({searchMsg:text})}
  				        value={this.state.searchMsg}
                  onSubmitEditing={this.toSearch.bind(this)}
                 // numberOfLines={1}
				      />
	      		</View>
      		</View>
      		<View style={{backgroundColor:'#e0e0e0',height:0.7}}/>
      		<View style={styles.maiView}>
             <AllListView
                onRefresh={this._onRefresh.bind(this)}
                count={this.state.count}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
          	</View>
          	<LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
{/*          	<TouchableOpacity style={styles.myCartView} onPress={()=>this.toMyCart()}>
          		<Image style={[styles.deleteIcon,{width:28,height:28}]} source={require('../icon/cart_white.png')}/>
          	</TouchableOpacity>*/}
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:iosMargin,
    flex:1,
    backgroundColor:'#fff'
  },
  topView:{
		height:35,
		flexDirection:'row',
		alignItems:'center',
		//backgroundColor:'red'
	},
	top_leftView:{
		height:25,
		width:35,
		justifyContent:'center',
		alignItems:'center',
	},
	top_centerView:{
		height:25,
		flex:1,
		borderRadius:3,
		marginRight:10,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#e0e0e0'
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
	center_icon:{
		marginLeft:8,
		height:15,
		width:15,
		resizeMode:'contain',
		//backgroundColor:'green'
	},
	dianpuView:{
		height:35,
		alignItems:'center',
		flexDirection:'row',
		paddingLeft:10,
		paddingRight:10,
    justifyContent:'space-between'
		//backgroundColor:'red'
	},
	dianhuaIcon:{
	    height:20,
	    width:20,
	    resizeMode:'contain',
	    marginRight:10,
  },
  listItem:{
    height:100,
    flexDirection:'row',
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:20,
    paddingRight:10,
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
  maiView:{
    flex:1,
  },
  myCartView:{
  	position:'absolute',
    width:55,
    height:55,
    right:20,
    top:450,
    backgroundColor:"#1296db",
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:"#000000",
    shadowRadius:2,
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:0}
  }
});


export default classify;
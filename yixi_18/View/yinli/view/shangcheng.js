'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  Text,
  ListView
} from 'react-native';
//var ViewPager = require('react-native-viewpager');
import {Size,baseColor,iosMargin} from "../../Tools/constStr.js";
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 130;
//import Banner, {IndicaterAlign, IndicaterType} from 'react-native-whc-banner'
import Carousel from 'react-native-banner-carousel';
class shangcheng extends Component {
	constructor(props) {
	  super(props);
	  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.images = [require('./icon/v1.png'),require('./icon/v2.png'),require('./icon/v3.png'),require('./icon/v4.png')];
	  this.midMsg=[{"name":"火锅冒菜","img":require('./icon/huoguo.png')},
	  			   {"name":"中餐","img":require('./icon/zhongcan.png')},
	  			   {"name":"西餐","img":require('./icon/xican.png')},
	  			   {"name":"批发","img":require('./icon/pifa.png')},
	  			   {"name":"其他","img":require('./icon/qita.png')}];
	  this.listData=[{"title":"时代博越海鲜铺",isPass:true,"sw":false,"main":"毛肚、牛排","maichu":"11","kucun":"1380","img":require('./icon/fd1.png')},
	  				{"title":"刘先利干杂店",isPass:true,"sw":true,"main":"配料、作料","maichu":"11","kucun":"1380","img":require('./icon/fd2.png')},
	  				{"title":"家乐福海鲜部",isPass:true,"sw":false,"main":"海鲜、河鲜","maichu":"11","kucun":"1380","img":require('./icon/fd3.png')},
	  				{"title":"伊藤洋华堂海鲜铺",isPass:true,"sw":false,"main":"海鱼、淡水鱼","maichu":"11","kucun":"1380","img":require('./icon/fd4.png')},];
	  this.state = {
	  	searchMsg:"",
	  	dataSource: this.ds,
	  };
	}

	 renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight,resizeMode:'stretch'}} source={image} />
            </View>
        );
    }



    renderRow(rowData,i,j){
    	return(
    		<View>
	    		<View style={styles.listItem}>
	    			<Image style={styles.listItemImg} source={rowData.img}/>
	    			<View style={styles.listItemTextView}>
	    				<View style={styles.listItemTextViewTop}>
	    					<View style={{flex:1,flexDirection:'row'}}>
	    						<Text style={{color:'#454545',fontSize:Size(16)}}>{rowData.title}</Text>
	    						{rowData.isPass&&<View style={styles.passView}>
	    							<Text style={{color:'#fff',fontSize:Size(12)}}>已认证</Text>
	    						</View>}
	    						{rowData.sw&&<View style={[styles.passView,{backgroundColor:'#f8e21b'}]}>
	    							<Text style={{color:'#fff',fontSize:Size(12)}}>生物识别用户</Text>
	    						</View>}
		    				</View>
		    				<View style={{flexDirection:'row'}}>
		    					<Text style={{color:"#999999",fontSize:Size(15)}}>进店</Text>
		    					<Image style={[styles.bottomTitleViewImg,{width:12,height:12}]} source={require('./icon/jindian.png')}/>
		    				</View>
	    				</View>
	    				<View style={styles.listItemTextViewBottom}>
                            <View style={{flexDirection:'row',marginBottom:5}}>
    	    					<Text style={styles.listItemTextViewText}>主营：{rowData.main}</Text>
    	    					<Text style={[styles.listItemTextViewText,{color:"#a0a0a0"}]}>  已售:<Text style={{color:"#9ebed5"}}>{rowData.maichu}</Text></Text>
    	    					<Text style={[styles.listItemTextViewText,{color:"#a0a0a0"}]}>  库存:{rowData.kucun}</Text>
	    				   </View>
                        </View>
	    			</View>
	    		</View>
	    		<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
    		</View>
    		);

    }

    componentDidMount() {
      this.setState({
      	dataSource:this.ds.cloneWithRows(this.listData),
      });
    }

    renderHeader(){
    	return(
	    	<View style={{flex:1,backgroundColor:"#f4f7f9"}}>
		    	<View style={styles.bannerView}>
		 			<Carousel
		                    autoplay
		                    autoplayTimeout={3000}
		                    loop
		                    index={0}
		                    pageSize={BannerWidth}
		                >
		                    {this.images.map((image, index) => this.renderPage(image, index))}
		            </Carousel>
		      	</View>
		      	<View style={styles.midView1}>
		      		{this.midMsg.map((item,i)=>{
		      			return(
		      				<View style={{flexDirection:"row",flex:1}} key={i}>
				      			<View style={styles.midView1_item}>
				      				<Image style={styles.midView1_itemImg} source={item.img}/>
				      				<Text style={{fontSize:Size(14),color:"#666666"}}>{item.name}</Text>
				      			</View>
				      			{i!=this.midMsg.length?<View style={{backgroundColor:'#ebf0f1',width:1,marginLeft:3}}/>:null}
			      			</View>
		      				);
		      		})}
		      	</View>
		      	<View style={styles.midView2}>
		      		<View style={styles.midView2_item}>
		      			<Image style={styles.midView2_itemImg} source={require('./icon/dongping.png')}/>
		      			<View style={styles.midView2_itemInf}>
		      				<Text style={{fontSize:Size(17),color:"#000000"}}>冻品</Text>
		      				<Text style={{fontSize:Size(13),color:"#666666"}}>万种生鲜，应有尽有</Text>
		      			</View>
		      		</View>
		      		<View style={{backgroundColor:'#ecf1f0',width:1}}/>
		      		<View style={styles.midView2_item}>
		      			<Image style={styles.midView2_itemImg} source={require('./icon/ganza.png')}/>
		      			<View style={styles.midView2_itemInf}>
		      				<Text style={{fontSize:Size(17),color:"#000000"}}>干杂</Text>
		      				<Text style={{fontSize:Size(13),color:"#666666"}}>优质优价，直发全国</Text>
		      			</View>
		      		</View>
		      	</View>
		      	<View style={styles.goodMsg}>
		      		<Image style={styles.goodMsgImg} source={require('./icon/goodMsg.png')}/>
		      		<Text style={{fontSize:Size(14),color:"#666666",marginLeft:10}}>易汐云盾已被工商银行列入财富集市名录</Text>
		      	</View>
		      	<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
		      	<View style={styles.bottomTitleView}>
		      		<Text style={{fontSize:Size(17),color:"#8b8b8b",marginLeft:10}}>优选商家</Text>
		      		<View style={styles.bottomTitleViewRg}>
		      			<Text style={{fontSize:Size(15),color:"#999999"}}>更多</Text>
		      			<Image style={styles.bottomTitleViewImg} source={require('./icon/more.png')}/>
		      		</View>
	      		</View>
	      	</View>
    		);
    }

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.topView}>
      		<View style={styles.top_leftView}>
      			<Image style={styles.top_Icon} source={require('./icon/return.png')}/>
      		</View>
      		<View style={styles.top_centerView}>
      			<Image style={styles.center_icon} source={require('./icon/myseach.png')}/>
      			<TextInput
                    returnKeyType={'search'}
      				underlineColorAndroid="transparent"
      				multiline = {true}
      				placeholder="舌尖上的中国推荐之重庆毛肚"
      				placeholderTextColor="#707070"
			        style={styles.textInput}
			        onChangeText={(text) => this.setState({searchMsg:text})}
			        value={this.state.searchMsg}
			      />
      		</View>
      		<View style={styles.top_rightView}>
      			<Image style={styles.top_Icon} source={require('./icon/car.png')}/>
      		</View>
      	</View>
      	
      	<View style={styles.bottomView}>
      		<ListView
      		  renderHeader={this.renderHeader.bind(this)}
      		  style={styles.ListView}
		      dataSource={this.state.dataSource}
		      renderRow={this.renderRow.bind(this)}
		    />
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:"#f4f7f9",
	},
	topView:{
        marginTop:iosMargin,
		height:35,
		flexDirection:'row',
		alignItems:'center'
	},
	top_leftView:{
		height:25,
		width:50,
		justifyContent:'center',
		alignItems:'center',
	},
	top_centerView:{
		height:25,
		flex:1,
		borderRadius:3,

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
	top_rightView:{
		height:25,
		width:50,
		justifyContent:'center',
		alignItems:'center',
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
	bannerView:{
		height:130,
	},
    banner: {
        marginTop:1,
        flex: 1,

    },
    midView1:{
    	
    	height:70,
    	paddingTop:10,
    	paddingBottom:10,
    	flexDirection:'row',
    	//justifyContent:'space-around',
    	backgroundColor:'#fff',
    	alignItems:'center'
    },
    midView1_item:{
    	width:BannerWidth/5-3,
    	height:50,

    	justifyContent:'space-between',
    	alignItems:'center',
    	//backgroundColor:'blue'
    },
    midView1_itemImg:{
    	height:40,
    	width:50,
    	resizeMode:'stretch',
    	//backgroundColor:'blue'
    },
    midView2:{
    	flexDirection:'row',
    	height:70,
    	marginTop:7,
    	paddingTop:10,
    	paddingBottom:10,
    	backgroundColor:'#fff'
    },
    midView2_item:{
    	flex:1,
    	flexDirection:'row',
    	
    },
    midView2_itemImg:{
    	height:55,
    	width:55,
    	
    	resizeMode:'stretch',
    },
    midView2_itemInf:{
    	marginTop:6,
    	marginBottom:6,
    	justifyContent:'space-between',
    },
    goodMsg:{
    	marginTop:7,
    	flexDirection:'row',
    	height:40,
    	paddingTop:5,
    	paddingBottom:5,
    	backgroundColor:'#fff',
    	alignItems:'center'
    },
    goodMsgImg:{
    	marginLeft:10,
    	height:30,
    	width:70,
    	resizeMode:'stretch',
    },
    bottomTitleView:{
    	height:35,
    	flexDirection:"row",
    	justifyContent:'space-between',
    	backgroundColor:'#fff',
    	alignItems:'center'
    },
    bottomTitleViewImg:{
    	height:20,
    	width:20,
    	resizeMode:'stretch',
    },
    bottomTitleViewRg:{
    	flexDirection:'row',
    	marginRight:15,
    	alignItems:'center',
    	justifyContent:'center',
    },
    bottomView:{
    	flex:1,
    	backgroundColor:'#fff'
    },
    ListView:{
    	backgroundColor:'#fff'
    },
    listItem:{
    	height:80,
    	paddingTop:10,
    	paddingBottom:10,
    	flexDirection:'row',
    	//backgroundColor:'red',
    	
    },
    listItemImg:{
    	marginLeft:10,
    	width:80,
    	height:60,
    	borderRadius:10,
    	resizeMode:'stretch',
    },
    listItemTextView:{
    	flex:1,
    	marginRight:10,
    	marginLeft:5
    },
    listItemTextViewTop:{
    	flexDirection:'row',
    	height:25,
        //backgroundColor:'red'
    },
    listItemTextViewBottom:{
    	flex:1,
        //backgroundColor:'blue',
        justifyContent:'flex-end'	
    },
    listItemTextViewText:{
    	color:'#c5c5c5',
    	fontSize:Size(14)
    },
    passView:{
    	padding:1,
    	height:13,
        justifyContent:'center',
        alignItems:'center',
    	backgroundColor:'#1b9dfa',
    	borderRadius:2,
    	marginLeft:5,
    },

});


export default shangcheng;
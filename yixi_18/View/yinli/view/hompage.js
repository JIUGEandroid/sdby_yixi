'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Shangcheng from "./store/shangcheng.js";
import Gouwuche from "./cart/gouwuche.js";
import Zhangdan from './check/zhangdan.js';
import Wode from "./my/wode.js";
class hompage extends Component {
 constructor(props) {
  	  super(props);
  	  this.state = {
  	  	selectedTab:"shangcheng",
  	  };
  	}

  	renderItem(selectedTab,title,icon,selectIcon,Component){
  		return(
  			<TabNavigator.Item
	            //设置选中的位置
	            selected={this.state.selectedTab ==selectedTab}
	            //标题
	            title={title}
	            //标题样式
	            titleStyle={styles.tabText}
	            //选中时标题文字样式
	            selectedTitleStyle={styles.selectedTabText}
	            //图标
	            renderIcon={() => <Image style={styles.icon} source={icon} />}
	            //选中时图标
	            renderSelectedIcon={() => <Image style={styles.icon} source={selectIcon} />}
	            //点击Event
	            onPress={() => this.setState({ selectedTab:selectedTab })}>
	           <Component navigator={this.props.navigator}/>
	        </TabNavigator.Item>
  			);

  	}

  render() {
    if(this.props.navigator){
      console.log("render:"+"true");
    }
    else{
      console.log("render:"+"false");
    }
    return (
      <View style={styles.container}>
      	<TabNavigator>
	        {this.renderItem("shangcheng","商城",require("./icon/shangcheng1.png"),require("./icon/shangcheng2.png"),Shangcheng)}
	        {this.renderItem("gouwuche","购物车",require("./icon/gouwuche1.png"),require("./icon/gouwuche2.png"),Gouwuche)}
	        {this.renderItem("zhangdan","账单",require("./icon/zhangdan1.png"),require("./icon/zhangdan2.png"),Zhangdan)}
	        {this.renderItem("wode","我的",require("./icon/wode1.png"),require("./icon/wode2.png"),Wode)}
	     </TabNavigator>

      </View>

    );

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 10,
        color: 'black'
    },
    selectedTabText: {
        fontSize: 10,
        color: '#1296db'
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode:'contain',
       // backgroundColor:'red'
    },
    page0: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    page1: {
        flex: 1,
        backgroundColor: 'blue'
    }
});


export default hompage;
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Message from "../message/message.js";
import Phone from "../phone/phone.js";
import Application from "../application/application.js";
import My from "../my/my.js"
import TabNavigator from 'react-native-tab-navigator'
import {baseColor} from "../Tools/constStr.js"
class homePage extends Component {
	constructor(props) {
  	  super(props);
  	
  	  this.state = {
  	  	selectedTab:"message",
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
    return (
      <View style={styles.container}>
      	<TabNavigator>
	        {this.renderItem("message","消息",require("../icon/message.png"),require("../icon/messaged.png"),Message)}
	        {this.renderItem("phone","电话",require("../icon/phone.png"),require("../icon/phoneed.png"),Phone)}
	        {this.renderItem("application","应用",require("../icon/application.png"),require("../icon/applicationed.png"),Application)}
	        {this.renderItem("my","我的",require("../icon/my.png"),require("../icon/myed.png"),My)}
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
        color: 'rgb(45,94,191)'
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


export default homePage;
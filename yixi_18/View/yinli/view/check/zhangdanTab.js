'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  	TouchableOpacity,
	Text,
	Image
} from 'react-native';

class zhangdanTab extends Component {

	setAnimationValue({value}) {
		console.log(value);
	}

	componentDidMount() {
		// Animated.Value监听范围 [0, tab数量-1]
		this.props.scrollValue.addListener(this.setAnimationValue);
	}

	
	
	renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? "#1296db" : "gray"; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab}>
				<View style={styles.tabItem}>
					<Image style={styles.icon} source={this.props.tabIconNames[i]}/>
					<Text style={{color: color}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}


  render() {
    return (
      	<View style={styles.tabs}>
			{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
		</View>
    );
  }
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		height: 65,
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon:{
		width:30,
		height:30,
		resizeMode:"contain",
	},
	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});


export default zhangdanTab;
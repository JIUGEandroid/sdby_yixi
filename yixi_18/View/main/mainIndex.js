'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Show from './show';
var nav;
class mainIndex extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	initialRoute:{name:'show', component:Show},
	  };
	}

	renderMapper(route,navigator){
		let Component;
		nav=navigator;
		switch(route.name){
			case "show":
				Component=Show;
				break;
			default:
				Component=Show;
				break;
		}
		return <Component route={route} navigator={navigator} param={route.param}/>
	}

  render() {
    return (
	      <Navigator
	          initialRoute={this.state.initialRoute}
	          configureScene={(route) => {
	            return Navigator.SceneConfigs.VerticalDownSwipeJump;
	          }}
	          renderScene={this.renderMapper.bind(this)} />
           
    );
  }
}

const styles = StyleSheet.create({

});


export default mainIndex;
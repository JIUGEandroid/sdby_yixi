'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Show from './show.js';
import HomePage from './homePage.js';
import Register from '../login/register.js';
import Login from '../login/login.js';
import Splash from '../login/splash.js';
var nav;
class mainIndex extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	initialRoute:{name:'splash', component:Splash},
	  };
	}

	renderMapper(route,navigator){
		let Component;
		nav=navigator;
		switch(route.name){
			case "splash":
				Component=Splash;
				break;
			case "login":
				Component=Login;
				break;
			case "register":
				Component=Register;
				break;
			case "homePage":
				Component=HomePage;
				break;
			case "show":
				Component=Show;
				break;
			default:
				Component=Splash;
				break;
		}
		return <Component route={route} navigator={navigator} param={route.param}/>
	}

  render() {
    return (
	      <Navigator	
	          initialRoute={this.state.initialRoute}
	          configureScene={(route) => {
	            return Navigator.SceneConfigs.FloatFromRight;
	          }}
	          renderScene={this.renderMapper.bind(this)} />
           
    );
  }
}

const styles = StyleSheet.create({

});


export default mainIndex;
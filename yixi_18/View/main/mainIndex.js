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
import Yinli from "../yinli/view/hompage.js";
import Dianpu from "../yinli/view/store/dianpu.js";
import UpGoods from '../yinli/view/my/upGoods.js';
import Address from '../yinli/view/my/address.js';
import ChooseRole from '../yinli/view/login/chooseRole.js';
import Information from '../yinli/view/login/information.js';
import ComStore from "../yinli/view/login/comStore.js";
import SelectMerchant from "../yinli/view/login/selectMerchant.js";
import SetStoreMessage from "../yinli/view/login/setStoreMessage.js";
import ConfirmOrder from '../yinli/view/cart/confirmOrder.js';
import NewAddress from '../yinli/view/my/newAddress.js';
import SelectDriver from '../yinli/view/cart/selectDriver.js';
import Success from '../yinli/view/cart/success.js';
import SelectKuguan from "../yinli/view/check/selectKuguan.js";
import Update from '../yinli/view/my/update.js';
import ChooseGoodsType from '../yinli/view/my/chooseGoodsType.js';//选择商品类型
import MyStore from '../yinli/view/my/myStore.js';//我的店铺
import MyStaff from "../yinli/view/my/myStaff.js";//我的员工
import Classify from '../yinli/view/store/classify.js';//干杂，冻品
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
			case "yinli":
				Component=Yinli;
				break;
			case "dianpu":
				Component=Dianpu;
				break;
			case "upGoods":
				Component=UpGoods;
				break;
			case "address":
				Component=Address;
				break;
			case "regist":
				Component=Regist;
				break;
			case "setStoreMessage":
				Component=SetStoreMessage;
				break;
			case "selectMerchant":
				Component=SelectMerchant;
				break;
			case "comStore":
				Component=ComStore;
				break;
			case "chooseRole":
				Component=ChooseRole;
				break;
			case "information":
				Component=Information;
				break;
			case "confirmOrder":
				Component=ConfirmOrder;
				break;
			case "newAddress":
				Component=NewAddress;
				break;
			case "selectDriver":
				Component=SelectDriver;
				break;
			case "success":
				Component=Success;
				break;
			case "selectKuguan":
				Component=SelectKuguan;
				break;
			case "update":
				Component=Update;
				break;
			case "chooseGoodsType":
				Component=ChooseGoodsType;
				break;
			case "myStore":
				Component=MyStore;
				break;
			case "myStaff":
				Component=MyStaff;
				break;
			case "classify":
				Component=Classify;
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
	          renderScene={this.renderMapper.bind(this)} 
	          />
           
    );
  }
}

const styles = StyleSheet.create({

});


export default mainIndex;
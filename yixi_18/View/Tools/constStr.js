/**
 * 定义全局变量，常量等
 */

import React from 'react';
import {
	Platform,
	Dimensions,
	PixelRatio,
}from 'react-native';
var iosMargin=20;
var navHeight=45;
var screenWidth=Dimensions.get('window').width;
var screenHeight=Dimensions.get('window').height;
var baseColor="#01a4ff";

const basePx=375;//以iphone6为基准进行适配
var Size=(size)=>{
	return size*(screenWidth/basePx);
}

module.exports={iosMargin,navHeight,screenWidth,screenHeight,baseColor,Size};
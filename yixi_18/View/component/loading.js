'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
	ActivityIndicator,
	Text
} from 'react-native';

class loading extends Component {
  render() {
    return (
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator animating={true} color={this.props.color?this.props.color:"#0000ff"} style={[styles.centering]} size="large"/>
            <Text>加载中...</Text>
       </View>
    );
  }
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});


export default loading;
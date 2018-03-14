'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ListView,
  Image,
  Text
} from 'react-native';
import Tools from "../Tools/tool.js";
import {Size} from "../Tools/constStr.js";
import commenStyle from '../Tools/constStyle.js';
class AllListView extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
  		isRefreshing: false,
        loadingmore: true,
	  };
	}

	  componentDidMount() {
        this.setState({
            isRefreshing: false,
            loadingmore: true,
        })
    }
    componentWillReceiveProps(nextProps) {     
        this.setState({
            isRefreshing: false,
        })
    }
    renderFooter() {
        if(this.props.count==0){
            return (
                <View style={commenStyle.listFooter}>
                    <Text style={{fontSize:Size(18)}}>没有更多数据</Text>
                </View>
            )
        }
    }

    _onRefresh() {
        if(this.props.onRefresh){
            this.setState({
                isRefreshing:true,
            });
            this.props.onRefresh();
        }
    }

  render() {
    return (
       <View style={commenStyle.container}>
            <ListView
          		renderHeader={this.props.renderHeader}
                refreshControl={
                Tools.intiRefresh(this.state.isRefreshing,this._onRefresh.bind(this))}
                dataSource={this.props.dataSource}
                renderRow={this.props.renderRow}
                renderFooter={this.renderFooter.bind(this)}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default AllListView;
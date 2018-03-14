/*/*    componentDidMount() {
/**
 * 公共的listview 组件
 * Created by jinwangtong on 16/3/28.
 */
/**
 * 资讯列表
 */


'use strict';



import { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
} from 'react-native';
import Tools from "../Tools/tool.js";
import {Size} from "../Tools/constStr.js";
import commenStyle from '../Tools/constStyle.js';
export default class MyListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            loadingmore: true,
        }

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
                    <Text style={{fontSize:Size(14)}}>没有更多数据</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={commenStyle.container}>
                <ListView
                    enableEmptySections = {true}
              		renderHeader={this.props.renderHeader}
                    refreshControl={
                    Tools.intiRefresh(this.state.isRefreshing,this._onRefresh.bind(this))}
                    dataSource={this.props.dataSource}
                    renderRow={this.props.renderRow}
                    renderFooter={this.renderFooter.bind(this)}/>
            </View>
        )
    }

    _onRefresh() {
        if(this.props.onRefresh){
            this.setState({
                isRefreshing:true,
            });
            this.props.onRefresh();
        }
    }

}

'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import NavTitle from '../../../component/navTitle';
import {Size,baseColor,iosMargin} from "../../../Tools/constStr.js";
import Button from '../../../component/button.js';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Toast from 'react-native-root-toast';
import Tools from '../../../Tools/tool.js';
import LoadingShow from '../../../component/react-native-loading';
class upGoods extends Component {

	constructor(props) {
	  super(props);
		this.tag=[{"name":"中餐","code":0},{"name":"西餐","code":1},{"name":"火锅冒菜","code":2},{"name":"其他","code":3}];
	  
		this.photoOptions = {
		    //底部弹出框选项
          title:'请选择',
          cancelButtonTitle:'取消',
          takePhotoButtonTitle:'拍照',
          chooseFromLibraryButtonTitle:'从相册选择',
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
		}

		this.imgData={};
		this.img="";
		this.tagFlag=new Array();
	  this.state = {
	  	goods_name:"",
	  	goods_type:"",
	  	goods_type_name:"",
	  	goods_guige:"",
	  	goods_kucun:"",
	  	goods_price:"",
	  	tags:[],
	  	imgResource:"",
	  	onRefresh:"1",
	  	loadingWait:false,
      	loadingWaitText:"加载中",
	  };
	}

	goBack(){
        let {navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }

     openMycamera(){
             ImagePicker.showImagePicker(this.photoOptions, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          
          else {
          	let imgSource = {uri:response.uri };
          	let imgType = response.fileName.substring(response.fileName.lastIndexOf(".")+1);
          	this.imgData={uri: imgSource.uri, name: 'image.'+imgType};
          	this.setState({
          		imgResource:imgSource
          	});
          }
        });
    }



    showLoading(text){
      this.setState({
        loadingWait: true,
        loadingWaitText:text,
      });
	 }

	closeLoading(){
	      this.setState({
	        loadingWait: false,
	      });
	}

    //设置商品类型
    setGoodsType(typeData){
    	this.setState({
    	  goods_type:typeData.code,
    	  goods_type_name:typeData.name,
    	});
    }

    //跳转到选择商品类型页面
    selectGoodsType(){
    	let {navigator}=this.props;
        if(navigator){
            navigator.push({
            	name:"chooseGoodsType",
            	param:{
            		callBack:(typeData)=>this.setGoodsType(typeData),
            	}
            });
        }
    }

    //上传商品图片
    upImage(){
		return new Promise((resolve,reject)=>{
			
			  this.showLoading("图片上传中...");
			  let uploadURL="http://yixip.bowyue.com/api/upload/image"
		      let formData = new FormData();
		      let file;
		      file = {uri: this.imgData.uri, type: 'multipart/form-data', name: this.imgData.name};     
		      formData.append("name",file);
		      fetch(uploadURL,{
		          method:'POST',
		          headers:{
		              'Content-Type':'multipart/form-data',
		          },
		          body:formData,
		      })
		      .then((response) => response.json())
		      .then((responseData)=>{
		      	this.closeLoading();
	      		this.img=responseData.data.file_name;
		      	console.log("upImage:this.img="+JSON.stringify(this.img));
				resolve();
		      })
		      .catch((error)=>{
		      	this.closeLoading();
		      	console.error('error失败',error);
		      	resolve();
		      });
	    });
	}

    onSubmit(){
    	if(!Tools.isDataValid(this.state.imgResource)){
			Toast.show("请选择产品图片");
			return;
		}
		if(!Tools.isDataValid(this.state.goods_name)){
			Toast.show("请输入产品名称");
			return;
		}
		if(!Tools.isDataValid(this.state.goods_type)){
			Toast.show("请输入产品类型");
			return;
		}
		if(!Tools.isDataValid(this.state.goods_price)){
			Toast.show("请输入产品价格");
			return;
		}
		if(!Tools.isDataValid(this.state.goods_guige)){
			Toast.show("请输入产品规格");
			return;
		}
		if(!Tools.isDataValid(this.state.goods_kucun)){
			Toast.show("请输入产品库存");
			return;
		}
		let num=0;
		for(let i=0;i<this.state.tags.length;i++){
			if(this.tagFlag[i]){
				num=num+1;
				break;
			}
		}
		if(num==0){
			Toast.show("请选择店铺标签");
			return;
		}
		this.showLoading("产品信息上传中...");
		let tagData=new Array();
		let n=1;
		for(let i=0;i<this.state.tags.length;i++){
			if(this.tagFlag[i]){
				let data={"id":n,"name":this.state.tags[i].name};
				tagData.push(data);
				n++;
			}
		}
		console.log("onSubmit:tagData="+JSON.stringify(tagData));
		this.upImage().then(()=>{
			let postData={"name":this.state.goods_name,"size":this.state.goods_guige,
					"price":this.state.goods_price,"stock":this.state.goods_kucun,
					"logo":this.img,"tabs":JSON.stringify(tagData),
					"category":this.state.goods_type};
			console.log("onSubmit:tagData="+JSON.stringify(postData));
			Tools.post("http://yixip.bowyue.com/api/pgoods/add",postData,(resData)=>{
				this.closeLoading();
				Toast.show("保存成功");
			},(err)=>{
				this.closeLoading();
				Toast.show(err);
			});
		});
    }

    selectTag(i){

    	this.tagFlag[i]=!this.tagFlag[i];
    	this.setState({
    		onRefresh:"1"
    	});
    }

    //获取商品标签
	getTags(){
		Tools.post("http://yixip.bowyue.com/api/pgoods/getGoodsTabs",{},(resData)=>{
			console.log("getTags:"+JSON.stringify(resData));
			for(let i=0;i<resData.length;i++){
				this.tagFlag[i]=false;
			}
			this.setState({
			  tags: resData,
			});
		},(err)=>{
			Toast.show(err);
		});

	}

    componentDidMount() {
      this.getTags();
    }


  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      		
	      	<View style={styles.container}>
				<NavTitle title={"上传产品"} goBack={this.goBack.bind(this)}/>
	      		<ScrollView style={styles.contentView}>
	      			<TouchableOpacity style={styles.selectImgView} onPress={()=>this.openMycamera()}>
	      				<View style={styles.selectImgView_left}>
	      					<Text style={styles.commonText}>图片</Text>
	      				</View>
	      				<View style={styles.selectImgView_right}>
	      					<Image style={styles.selectImg} source={this.state.imgResource?this.state.imgResource:require('../icon/addImg.png')}/>
	      					<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
	      				</View>
	      			</TouchableOpacity>
	      			<View style={{backgroundColor:'#f0f0f0',height:7}}/>
	      			<View style={styles.itemView}>
	      				 <Text style={styles.commonText}>名称</Text>
      				     <TextInput
					        style={styles.TextInput}
					        onChangeText={(text) => this.setState({goods_name:text})}
					        value={this.state.goods_name}
					        placeholder={"输入产品名称"}
					      />
	      			</View>
	      			
	      			<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
	      			<View style={[styles.itemView,{marginTop:0}]}>
	      				 <Text style={styles.commonText}>价格</Text>
      				     <TextInput
      				     	keyboardType={"numeric"}
					        style={styles.TextInput}
					        onChangeText={(text) => this.setState({goods_price:text})}
					        value={this.state.goods_price}
					        placeholder={"输入产品价格"}
					      />
	      			</View>
	      			<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
	      			<TouchableOpacity style={styles.selectDriverView} onPress={()=>this.selectGoodsType()}>
			      		<Text style={{fontSize:Size(18),color:"#707070"}}>类型</Text>
			      		<View style={{flexDirection:'row',alignItems:'center'}}>
			      			<Text style={{fontSize:Size(18),color:"#515151"}}>{this.state.goods_type_name}</Text>
			      			<Image style={styles.youjiantouView} source={require('../icon/youjiantou.png')}/>
			      		</View>
		      		</TouchableOpacity>
	      			<View style={{backgroundColor:'#f0f0f0',height:7}}/>
	      			<View style={styles.itemView}>
	      				 <Text style={styles.commonText}>规格</Text>
      				     <TextInput
					        style={styles.TextInput}
					        onChangeText={(text) => this.setState({goods_guige:text})}
					        value={this.state.goods_gui}
					        placeholder={"输入产品规格"}
					      />
	      			</View>
	      			
	      			<View style={{backgroundColor:'#e1e8f1',height:0.5}}/>
	      			<View style={[styles.itemView,{marginTop:0}]}>
	      				 <Text style={styles.commonText}>库存</Text>
      				     <TextInput
      				     	keyboardType={"numeric"}
					        style={styles.TextInput}
					        onChangeText={(text) => this.setState({goods_kucun:text})}
					        value={this.state.goods_kucun}
					        placeholder={"输入产品库存"}
					      />
	      			</View>
	      			<KeyboardSpacer topSpacing={-170}/>
	      			<View style={{backgroundColor:'#f0f0f0',height:7}}/>
	      			<View style={styles.tagView}>
	      				<Text style={styles.commonText}>标签</Text>
	      				<View style={styles.tagView_bottom}>
	      					{this.state.tags.map((item,i)=>{
	      						return(
	      							<TouchableOpacity key={i} onPress={()=>this.selectTag(i)} style={this.tagFlag[i]?styles.buttonView_select:styles.buttonView_noselect}>
	      								<Text style={[this.tagFlag[i]?styles.buttonText_select:styles.commonText,{fontSize:Size(16)}]}>{item.name}</Text>
	      							</TouchableOpacity>
	      							)
	      					})}
	      				</View>
	      			</View>
	      			<View style={{backgroundColor:'#f0f0f0',height:7}}/>
	      			<View style={{height:80,alignItems:'center'}}>
	      				<Button text={"保存并上传"} onClick={this.onSubmit.bind(this)} style={{width:220,marginTop:20}} textStyle={{fontSize:Size(18)}} />
					</View>	      		
	      		</ScrollView>
	      		<LoadingShow loading={this.state.loadingWait} text={this.state.loadingWaitText} />
      		</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
	    flex:1,
	    marginTop:iosMargin,
	    //backgroundColor:"#fff",
	  },
	nav:{
		marginTop:iosMargin,
		height:45,
		flexDirection:'row',
		alignItems:'center',
	},
	contentView:{
		flex:1,
	},
	top_leftView:{
		height:25,
		width:50,
		justifyContent:'center',
		alignItems:'center',
	},
	top_centerView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	top_Icon:{
		height:23,
		width:23,
		resizeMode:"contain"
	},
	selectImgView:{
		height:90,
		padding:10,
		flexDirection:'row',
		justifyContent:'space-between',
		backgroundColor:'#fff'
	},
	selectImgView_right:{
		flexDirection:'row',
		alignItems:'center',
		width:140,
		justifyContent:'flex-end',
		//	backgroundColor:'red'
	},
	selectImgView_left:{
		justifyContent:'center'

	},
	selectImg:{
		width:80,
	    height:70,
	    resizeMode:'stretch',
	},
	youjiantouView:{
	    width:20,
	    height:15,
	    resizeMode:'stretch',
	    marginLeft:10,
  	},
  	itemView:{
  		marginTop:10,
  		height:50,
  		padding:5,
  		paddingLeft:10,
  		alignItems:'center',
  		flexDirection:'row',
  		backgroundColor:'#fff'
  	},
  	TextInput:{
  		flex:1,
  		marginRight:20,
  		marginLeft:13,
  		height:40,
  		fontSize:Size(17),
  		//backgroundColor:'red',
  	},
  	commonText:{
  		fontSize:Size(20),
  		color:"#707070"
  	},
  	tagView:{
  		marginTop:10,
  		height:80,
  		padding:10,
  		backgroundColor:'#fff',
  	},
  	tagView_bottom:{
  		flex:1,
  		flexDirection:'row',
  		//justifyContent:'space-around',
  		alignItems:'center',
  		flexWrap:"wrap",
  		//backgroundColor:'red'
  	},
  	buttonView_noselect:{
  		justifyContent:'center',
  		alignItems:'center',
  		padding:5,
  		marginLeft:7
  	},
  	buttonView_select:{
  		justifyContent:'center',
  		alignItems:'center',
  		paddingLeft:12,
  		paddingRight:12,
  		height:23,
  		borderRadius:2,
  		backgroundColor:'#1296db',
  		marginLeft:7
  	},
  	buttonText_select:{
  		color:"#fff",
  		fontSize:Size(18)
  	},
  	selectDriverView:{
	  	height:50,
	  	flexDirection:'row',
	  	marginLeft:10,
	  	marginRight:10,
	  	alignItems:'center',
	  	justifyContent:'space-between'
	  	//backgroundColor:'red'
	  },
});


export default upGoods;
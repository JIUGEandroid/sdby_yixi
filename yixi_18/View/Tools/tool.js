import {
    PixelRatio,
    Platform,
    AsyncStorage,
    NetInfo,
    Keyboard
} from 'react-native';

var Tools={
	checkPhone:function(pPhone){
        if(!this.isDataValid(pPhone)){
            return("请输入手机号码");
        }
        pPhone=pPhone.replace(" ","");
        if (!this.isDataValid(pPhone)||pPhone<=0) {
            return("手机号码不能为空!");
        } else{
            var phone=pPhone
            if(pPhone.indexOf("+86")>=0){
                phone =pPhone.split("+86")[1];
            }
            if (phone.length != 11) {
                return("请输入11位手机号码!");
            }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))){
                return("手机号码格式不正确");
            } else {
                return null;
            }
        }       
    },

    isDataValid: function(data) {
        if (data != null && data != "" && data != "undefined"&&data!="null") {
            return true;
        } else {
            return false;
        }
    },
    dopost:function(url, data, successCallBaack, errCallBack){    
        Keyboard.dismiss()    
        var fetchOptions = {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json'
            },
            body: data
        };
        //判断url是否是正确
        console.log("url==="+url)
        if(!this.isDataValid(url)||url.indexOf("undefined")==0||url.indexOf("http://")!=0){
            errCallBack("url请求地址错误");
            return
        }
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                this.doResult(responseText,successCallBaack, errCallBack);
            })
            .catch((error) => {
                errCallBack("服务器访问失败"+error);
            })
            .done();
    },
    getStorage:function(key, callback){
        AsyncStorage.getItem(key.toLowerCase())
            .then((value) => {
                callback(value);
            })
            .catch((error) => {
                console.log("----get token err----" + error);
                // alert(error)
                callback(null)
            })
            .done();
    },
    setStorage:function(key, value){
        AsyncStorage.setItem(key.toLowerCase(), value)
            .then(()=> {
            })
            .catch((error) => {

            })
            .done();
    },
    post:function(url, data, successCallBaack, errCallBack){
        NetInfo.isConnected.fetch().done((isConnected) => {
             //if(!isConnected){
             //    errCallBack("网络连接不可用")
             //}else
             //{
                this.dopost(url,JSON.stringify(data),successCallBaack, errCallBack);
             //}
        }); 
    },
        /*
    * 统一处理返回结果
    */
    doResult:function(responseText,successCallBaack, errCallBack){
       if(!responseText){
            return;
       }
        console.log("responseText==="+responseText)
        var responseData=eval("(" + responseText + ")");
		if (responseData.code) {
            successCallBaack(responseData.data);
        }else {
            if(errCallBack){
                if(this.isDataValid(responseData.msg)){
                    errCallBack(responseData.msg);
                }else{
                    errCallBack("数据解析错误");
                }
           }
        }
    },
}
module.exports=Tools
/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
// export Size(size) {
//     let scaleWidth = screenW / w2;
//     let scaleHeight = screenH / h2;
//     let scale = Math.min(scaleWidth, scaleHeight);
//     size = Math.round((size * scale + 0.5));
//     return size / DEFAULT_DENSITY;
// }
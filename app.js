//app.js
const utils=require('/utils/util.js')
App({
    goBack:function(){
        wx.navigateBack({
            delta:1,
        })
    },
    doLogin:function(callback){
        wx.login({
            success: res => {
                let _this = this
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.httpGet('/xcx/insureMaster/getLoginSession?jsCode=' + res.code, function (data) {
                    wx.setStorageSync('sessionKey', data.data.result.sessionKey)
                    _this.globalData.jsCode = res.code
                    _this.globalData.openId = data.data.result.openId
                    _this.globalData.sessionKey = data.data.result.sessionKey
                    _this.globalData.unionId = data.data.result.unionId
                    wx.login({  //再次调用微信登录 获取jsCode    后台说jsCode只能用一次
                        success: res => {
                            wx.setStorageSync('jsCode', res.code)
                            callback()
                        }
                    })
                })
            }
        })
    },
    onLaunch: function () {
        let _this=this

        // 获取顶部bar高度
        this.globalData.statusBarHeight=wx.getSystemInfoSync().statusBarHeight * 2
        //获取设备信息  判断Iphone X
        wx.getSystemInfo({
            success: function(res) {
                if(res.model.indexOf('iPhone X')>-1){
                    _this.globalData.isIpx=true
                }
            },
        })
    },
    httpGet:function (url, callback) {
        let _this = this;
        wx.request({
            url: _this.globalData.urlDomain + url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success: function (data) {
                callback(data)
            }
        })
    },
    httpPost:function(url,param,callback,errorCallback){
        let _this=this;
        wx.request({
            url: _this.globalData.urlDomain+url,
            data:param,
            method: 'POST',
            header: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success:function(data){
                if(data.data.code===0){
                    callback(data.data.result)
                }else{
                    errorCallback(data.data)
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        canShow:true,
        encryptedData:'',
        iv:'',
        isIpx:false,
        options:'',
        statusBarHeight:'',
        winWidth: wx.getSystemInfoSync().windowWidth,
        winHeight: wx.getSystemInfoSync().windowHeight,
        urlDomain: "https://cdb.minshenglife.com/sign-api",
        testUrl: "https://v.minshenglife.com/sign-api",
        prodUrl: "https://cdb.minshenglife.com/sign-api",
        // index  
        // 需做网络图片预加载
        s1Theme: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561691285392.png',
        s2Theme: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561691322047.png',
        s3Theme: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561691340542.png',
        s4Theme: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561691356684.png',
        hmBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190704/1562222610804.png',
        seasonRules: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190718/1563442215721.png',
        xueyiBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561638085749.png',
        fenxiangBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561638124450.png',
        xinshouBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561638049214.png',
        zhutiBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561637981625.png',
        //  rankList
        activesRuels: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190718/1563442251409.png',
        //  redPackets
        circleBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639258907.png',
        compoundBt: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639215494.png',
        //  login
        loginImg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190707/1562488090268.png',
        //  treasure
        studyBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639589395.png',
        shareBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639628656.png',
        newBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639804333.png',
        followBg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639537989.png',
        shareCoverImg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190710/1562739081186.png',
        wxShareImg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190710/1562738980398.png',
        studyBox: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190627/1561639837974.png',
        noTeacher: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190717/1563359982825.png',
        followAccount: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190813/1565683674978.png',
        //challenge
        redPackets: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190707/1562486898642.png',
        challengeCoverImg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190703/1562146275324.png',
        bgLight: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190708/1562554015061.png',
        resultShareImg: 'http://dt.minshenglife.com/upload/img/20190710/1562743209445.png'
    }
})


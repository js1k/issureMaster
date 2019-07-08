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
                    wx.setStorageSync('jsCode', res.code)
                    _this.globalData.jsCode = res.code
                    _this.globalData.openId = data.data.result.openId
                    _this.globalData.sessionKey = data.data.result.sessionKey
                    _this.globalData.unionId = data.data.result.unionId
                    callback()
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

        // 登录
        // wx.login({
        //     success: res => {
        //         let _this=this
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //         this.httpGet('/xcx/insureMaster/getLoginSession?jsCode=' + res.code, function (data) {
        //             wx.setStorageSync('sessionKey', data.data.result.sessionKey)
        //             wx.setStorageSync('jsCode', res.code)
        //             wx.setStorageSync('openId', data.data.result.openId)
        //             wx.setStorageSync('unionId', data.data.result.unionId)
        //             _this.globalData.jsCode = res.code
        //             _this.globalData.openId = data.data.result.openId
        //             _this.globalData.sessionKey = data.data.result.sessionKey
        //             _this.globalData.unionId = data.data.result.unionId
        //         })
        //     }
        // })
        // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: data => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = data.userInfo
        //                     this.globalData.encryptedData = data.encryptedData
        //                     this.globalData.iv = data.iv
        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(data)
        //                     }
        //                 },
        //                 fail: res => {
        //                     console.log('fail')
        //                 },
        //                 lang: 'zh_CN'
        //             })
        //         }else{
                    
        //         }
        //     }
        // })
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
        encryptedData:'',
        iv:'',
        isIpx:false,
        statusBarHeight:'',
        winWidth: wx.getSystemInfoSync().windowWidth,
        winHeight: wx.getSystemInfoSync().windowHeight,
        urlDomain: "https://edu.minshenglife.com/sign-api",
        testUrl: "https://v.minshenglife.com/sign-api",
        prodUrl: "https://edu.minshenglife.com/sign-api",
        // index
        s1Theme:'http://dt.minshenglife.com/upload/img/20190628/1561691285392.png',
        s2Theme: 'http://dt.minshenglife.com/upload/img/20190628/1561691322047.png',
        s3Theme: 'http://dt.minshenglife.com/upload/img/20190628/1561691340542.png',
        s4Theme: 'http://dt.minshenglife.com/upload/img/20190628/1561691356684.png',
        hmBg:'http://dt.minshenglife.com/upload/img/20190704/1562222610804.png',
        seasonRules: 'http://dt.minshenglife.com/upload/img/20190707/1562487058606.png',
        xueyiBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638085749.png',
        fenxiangBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638124450.png',
        xinshouBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638049214.png',
        zhutiBg: 'http://dt.minshenglife.com/upload/img/20190627/1561637981625.png',
        //  rankList
        activesRuels:'http://dt.minshenglife.com/upload/img/20190707/1562487139638.png',
        //  redPackets
        circleBg:'http://dt.minshenglife.com/upload/img/20190627/1561639258907.png',
        compoundBt:'http://dt.minshenglife.com/upload/img/20190627/1561639215494.png',
        //  login
        loginImg:'http://dt.minshenglife.com/upload/img/20190707/1562488090268.png',
        //  treasure
        studyBg:'http://dt.minshenglife.com/upload/img/20190627/1561639589395.png',
        shareBg:'http://dt.minshenglife.com/upload/img/20190627/1561639628656.png',
        newBg:'http://dt.minshenglife.com/upload/img/20190627/1561639804333.png',
        followBg:'http://dt.minshenglife.com/upload/img/20190627/1561639537989.png',
        shareCoverImg:'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190702/1562054485634.png',
        wxShareImg:'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561717521552.png',
        studyBox:'http://dt.minshenglife.com/upload/img/20190627/1561639837974.png',
        noTeacher:'http://dt.minshenglife.com/upload/img/20190627/1561639683456.png',
        followAccount:'http://dt.minshenglife.com/upload/img/20190628/1561715002804.png',
        //challenge
        redPackets:'http://dt.minshenglife.com/upload/img/20190707/1562486898642.png',
        challengeCoverImg:'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190703/1562146275324.png'
    }
})


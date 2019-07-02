//app.js
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
            url: _this.globalData.testUrl + url,
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
            url: _this.globalData.testUrl+url,
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
        urlDomain: "https://edu.minshenglife.com/sign-api",
        testUrl: "https://v.minshenglife.com/sign-api",
        prodUrl: "https://edu.minshenglife.com/sign-api"
    }
})


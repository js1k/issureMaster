//app.js
App({
    goBack:function(){
        wx.navigateBack({
            delta:1,
        })
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                let _this=this
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.httpGet('/xcx/insureMaster/getLoginSession?jsCode=' + res.code, function (data) {
                    _this.globalData.openId = data.data.result.openId
                    _this.globalData.sessionKey = data.data.result.sessionKey
                    _this.globalData.unionId = data.data.result.unionId
                })
            }
        }),
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                        }
                    },
                    fail: res => {
                        // console.log('fail')
                    },
                    lang: 'zh_CN'
                    })
                }
            }
        })
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
    httpPost:function(url,param,callback){
        let _this=this;
        wx.request({
            url: _this.globalData.testUrl+url,
            data:param,
            method: 'POST',
            header: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success:function(data){
                callback(data)
            }
        })
    },
    globalData: {
        userInfo: null,
        urlDomain: "https://edu.minshenglife.com/sign-api",
        testUrl: "https://v.minshenglife.com/sign-api",
        prodUrl: "https://edu.minshenglife.com/sign-api"
    }
})


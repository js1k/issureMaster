//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        showRules: false,
        showCardImg: '../../asset/index/xinren.png',
        showCardName: '帮帮卡',
        knapsackMask: false,
        hasUserInfo: false,
        showAuth:true,
        userHeader:'',
        insureUserVO:{},
        defaultHeader:'../../asset/index/default_header.png',
        tipList:[],
        loopBefore:'',
        loopAfter:'',
        loopInterval:'',
        curIndex:0,
        seasonCheckVO:{},
        chestNum:0,
        chipFlag:0,
        packageFlag:0,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    openRules: function() {
        this.setData({
            showRules: true
        })
    },
    closeRules: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showRules: false
        })
    },
    goTreasure: function() {
        wx.navigateTo({
            url: '../treasureBox/treasureBox'
        })
    },
    goRank: function() {
        wx.navigateTo({
            url: '../rankList/rankList'
        })
    },
    goRedPackets: function() {
        wx.navigateTo({
            url: '../redPackets/redPackets'
        })
    },
    goChallenge: function () {
        wx.navigateTo({
            url: '../challengeHome/challengeHome'
        })
    },
    showCard: function(event) {
        this.setData({
            showCardImg: event.currentTarget.dataset.src,
            showCardName: event.currentTarget.dataset.name
        })
    },
    showKnapsack: function() {
        this.setData({
            knapsackMask: true
        })
    },
    closeMask: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            knapsackMask: false
        })
    },
    goHomepage: function() {
        wx.navigateTo({
            url: '../homepage/homepage'
        })
    },
    onLoad: function() {
        let _this=this
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: false
            })
        }
        app.wxLogin(function (data) {
            _this.getHomeInfo()
        })


        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         app.globalData.userInfo = res.userInfo
        //         app.globalData.iv = res.iv
        //         app.globalData.encryptedData = res.encryptedData
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //         this.getHomeInfo()
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }
        // this.getHomeInfo()
    },
    onUnload:function(){
        this.data.loopInterval=''
    },
    getHomeInfo:function(){
        let _this=this
        let param={
            agentUserId:'',
            encryptedData: app.globalData.encryptedData,
            insureUid: app.globalData.insureUid,
            iv: app.globalData.iv,
            jsCode: app.globalData.jsCode
        }
        app.httpPost('/xcx/insureMaster/index',param,function(data){
            _this.setData({
                insureUid:data,
                insureUserVO: data.insureUserVO,
                tipList: data.tipList,
                seasonCheckVO: data.seasonCheckVO,
                chestNum: data.chestNum,
                chipFlag: data.chipFlag,
                packageFlag: data.packageFlag,
                loopBefore: data.tipList[0],
                loopAfter: data.tipList[data.tipList.length-1]
            })

            _this.data.loopInterval=setInterval(function () {
                if (_this.data.curIndex === _this.data.tipList.length - 1) {
                    _this.setData({
                        curIndex: 0
                    })
                }
                _this.setData({
                    curIndex: _this.data.curIndex+1,
                    loopBefore: _this.data.tipList[_this.data.curIndex],
                    loopAfter: _this.data.tipList[_this.data.tipList.length-_this.data.curIndex-1]
                })
            }, 3000)

            app.globalData.insureUid = data.insureUserVO.insureUid
        },function(data){
            console.log('error')
        })
    },
    getUserInfo: function(e) {
        if (!e.detail.userInfo){
            return
        }
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.encryptedData = e.detail.encryptedData
        app.globalData.iv = e.detail.iv
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        this.getHomeInfo()
    }
})
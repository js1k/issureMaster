//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        showRules: false,
        showMask:false,
        knapsackMask: false,
        hasUserInfo: true,
        showCardBtn:false,
        showInfo: {
            showImg: '',
            showName: '',
            showDesc: '',
            curNum: 0
        },
        showTxt:'',
        cardIndex:0,
        userHeader:'',
        insureUserVO:{},
        tipList:[],
        loopBefore:'',
        loopAfter:'',
        loopInterval:'',
        curIndex:0,
        seasonCheckVO:{},
        chestNum:0,
        chipFlag:0,
        packageFlag:0,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        defaultHeader:'../../asset/index/default_header.png',
        darenIcon: '../../asset/rankList/icon_daren.png',
        gaoshouIcon: '../../asset/rankList/icon_gaoshou.png',
        dashiIcon: '../../asset/rankList/icon_dashi.png',
        zongshiIcon: '../../asset/rankList/icon_zongshi.png',

        openXueyiBg: '../../asset/index/xueyi_bg.png',
        fenxiangBg: '../../asset/index/fenxiang_bg.png',
        xinshouBg: '../../asset/index/xinshou_bg.png',
        zhutiBg: '../../asset/index/zhuti_bg.png',
        openBox:false,

        cardData:[
            { name: '帮帮卡', flag: 'helpCard', img: '../../asset/index/bangbang.png', disImg: '../../asset/index/bangbang_disabled.png', desc: 'asdfa', num: 0 },
            { name: '排除卡', flag: 'removeCard', img: '../../asset/index/paichu.png', disImg: '../../asset/index/paichu_disabled.png', desc: '122', num: 0 },
            { name: '能量卡', flag: 'energyCard', img: '../../asset/index/nengliang.png', disImg: '../../asset/index/nengliang_disabled.png', desc: 'ssss', num: 0 },
            { name: '新人宝箱', flag: 'newerChest', btn: true, img: '../../asset/index/xinren.png', disImg: '../../asset/index/xinren_disabled.png', desc: 'zxcv', num: 0 },
            { name: '学艺宝箱', flag: 'studyChest', btn: true, img: '../../asset/index/xueyi.png', disImg: '../../asset/index/xueyi_disabled.png', desc: 'ssda', num: 0 },
            { name: '分享宝箱', flag: 'shareChest', btn: true, img: '../../asset/index/fenxiang.png', disImg: '../../asset/index/fenxiang_disabled.png', desc: 'hgf', num: 0 },
            { name: '主题宝箱', flag: 'subjectChest', btn: true, img: '../../asset/index/zhuti.png', disImg: '../../asset/index/zhuti_disabled.png', desc: '666', num: 0 },
            { name: '', flag: '', img: '', disImg: '', desc: '', num: 0 },
            { name: '', flag: '', img: '', disImg: '', desc: '', num: 0 }
        ]
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
    openBox:function(){

    },
    showCard: function(event) {
        let tabIndex = event.currentTarget.dataset.index
        let cardData = this.data.cardData
        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showDesc'
        let showNum = 'showInfo.curNum'
        this.setData({
            cardIndex: tabIndex,
            [showImg]: cardData[tabIndex].img,
            [showName]: cardData[tabIndex].name,
            [showDesc]: cardData[tabIndex].desc,
            [showNum]: cardData[tabIndex].num
        })
        if (cardData[tabIndex].btn) {
            this.setData({
                showCardBtn: true
            })
        }else{
            this.setData({
                showCardBtn: false
            })
        }
    },
    showKnapsack: function() {
        this.getPackets()
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
    getPackets:function(){
        let _this=this
        let cardData = _this.data.cardData

        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showInfo.showDesc'
        let showNum = 'showInfo.curNum'
        app.httpPost('/xcx/insureMaster/myPackage', { insureUid: app.globalData.insureUid},function(data){
            for (let i = 0; i < cardData.length;i++){
                for(let key in data){
                    if (cardData[i].flag==key){
                        let temp = 'cardData['+i+'].num'
                        _this.setData({
                            [temp]: data[key]
                        })
                    }
                }
            }
            _this.setData({
                [showImg]: cardData[0].img,
                [showName]: cardData[0].name,
                [showDesc]: cardData[0].desc,
                [showNum]: cardData[0].num,
                knapsackMask: true
            })
            console.log(_this.data.showInfo)
        },function(error){
            console.log('error')
        })
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
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
        authFlag: true,
        showCardBtn: false,
        openBox: false,
        canSave: true,
        hiddenLoading: false,
        loadingText:'加载中...',
        showInfo: {
            showImg: '',
            showName: '',
            showDesc: '',
            curNum: 0,
            chestType:''
        },
        saveCardParam:{
            chestType:'',
            energyCard:0,
            helpCard:0,
            insureUid:'',
            removeCard:0,
            curNum:0
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
        openTitle:'',

        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        defaultHeader:'../../asset/index/default_header.png',
        darenIcon: '../../asset/rankList/icon_daren.png',
        gaoshouIcon: '../../asset/rankList/icon_gaoshou.png',
        dashiIcon: '../../asset/rankList/icon_dashi.png',
        zongshiIcon: '../../asset/rankList/icon_zongshi.png',

        xueyiBg: '../../asset/index/xueyi_bg.png',
        fenxiangBg: '../../asset/index/fenxiang_bg.png',
        xinshouBg: '../../asset/index/xinshou_bg.png',
        zhutiBg: '../../asset/index/zhuti_bg.png',

        bangbangImg: '../../asset/index/bangbang.png',
        paichuImg: '../../asset/index/paichu.png',
        nengliangImg: '../../asset/index/nengliang.png',
        randomImg:'',
        randomName:'',

        cardData:[
            {
                name: '帮帮卡', flag: 'helpCard', img: '../../asset/index/bangbang.png', disImg: '../../asset/index/bangbang_disabled.png', desc: '遇到不会的题使用“帮帮卡”自动显示正确答案,每关5道题可使用2次', num: 0 },
            { name: '排除卡', flag: 'removeCard', img: '../../asset/index/paichu.png', disImg: '../../asset/index/paichu_disabled.png', desc: '使用“排除卡”去掉一个错误答案,每关5道题可使用3次', num: 0 },
            {
                name: '能量卡', flag: 'energyCard', img: '../../asset/index/nengliang.png', disImg: '../../asset/index/nengliang_disabled.png', desc: '若当天答题能量消耗光，可以使用“能量卡”开启答题,使用次数不限哦', num: 0 },
            {
                name: '新人宝箱', chestType: 3, flag: 'newerChest', btn: true, img: '../../asset/index/xinren.png', disImg: '../../asset/index/xinren_disabled.png', desc: '新用户专享体验"帮帮卡、排除卡、能量卡"各一张', num: 0 },
            {
                name: '学艺宝箱', chestType: 1, flag: 'studyChest', btn: true, img: '../../asset/index/xueyi.png', disImg: '../../asset/index/xueyi_disabled.png', desc: '民生保险导师每天送出宝箱,内含三张特权卡可任选两张', num: 0 },
            {
                name: '分享宝箱', chestType: 2, flag: 'shareChest', btn: true, img: '../../asset/index/fenxiang.png', disImg: '../../asset/index/fenxiang_disabled.png', desc: '分享好友参加答题,双方可获得分享宝箱,每天领取上限5次', num: 0 },
            {
                name: '主题宝箱', chestType: 4, flag: 'subjectChest', btn: true, img: '../../asset/index/zhuti.png', disImg: '../../asset/index/zhuti_disabled.png', desc: '关注"保险体验师"公众号,主题宝箱限时派发～', num: 0 },
            { name: '', flag: '', img: '', disImg: '', desc: '', num: 0 },
            { name: '', flag: '', img: '', disImg: '', desc: '', num: 0 }
        ]
    },

    //事件判断
    handleCheck:function(e){
        let dataset = e.currentTarget.dataset.mark
        //判断用户是否手机授权
        // if (!this.data.insureUserVO.telephone) {
        //     wx.navigateTo({
        //         url: '../login/login'
        //     })
        //     return
        // }
        switch (dataset){
            case 'goHome': 
                this.goHomepage();
                break;
            case 'goRank': 
                this.goRank();
                break;
            case 'treasureBox': 
                this.goTreasure();
                break;
            case 'knapsack': 
                this.getPackets();
                break;
            case 'redPackets': 
                this.goRedPackets();
                break;
            case 'challenge':
                this.goChallenge();
                break;
        }
    },


    //打开学艺宝箱选择卡片
    handleChoseCard:function(e){
        let dataset = e.currentTarget.dataset.card
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let saveParam = this.data.saveCardParam
        if (dataset =='helpCard'){
            if (saveParam.energyCard === 1 && saveParam.removeCard===1){
                this.setData({
                    [energyCard]: 0,
                })
            }
            this.setData({
                [helpCard]:1,
            })
        } else if (dataset == 'removeCard') {
            if (saveParam.helpCard === 1 && saveParam.energyCard === 1) {
                this.setData({
                    [helpCard]: 0,
                })
            }
            this.setData({
                [removeCard]: 1,
            })
        } else {
            if (saveParam.helpCard === 1 && saveParam.removeCard === 1) {
                this.setData({
                    [removeCard]: 0,
                })
            }
            this.setData({
                [energyCard]: 1,
            })
        }
    },
    //事件处理函数
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
    // 打开背包宝箱
    handleOpenBox:function(){
        let chestType = 'saveCardParam.chestType'
        let curNum = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let _this=this
        let showInfo = _this.data.showInfo
        this.setData({
            knapsackMask:false,
            openBox:true,
            [chestType]: showInfo.chestType,
            [curNum]: showInfo.curNum
        })
        if (showInfo.chestType==1){
            //学艺宝箱
            this.setData({
                openTitle:'请选择2张特权卡',
                openImg: _this.data.xueyiBg
            })
        } else if (showInfo.chestType == 2) {
            //分享宝箱
            //随机数确定分享宝箱中的卡片
            let Num=Math.ceil(Math.random()*3)
            if (Num==1){
                this.setData({
                    randomImg: '../../asset/index/bangbang.png',
                    randomName: '帮帮卡',
                    [helpCard]: 1,
                })
            } else if (Num == 2) {
                this.setData({
                    randomImg: '../../asset/index/paichu.png',
                    randomName: '排除卡',
                    [removeCard]: 1
                })
            } else {
                this.setData({
                    randomImg: '../../asset/index/nengliang.png',
                    randomName: '能量卡',
                    [energyCard]: 1,
                })
            }
            this.setData({
                openTitle: '获得排除卡一张',
                openImg: _this.data.fenxiangBg
            })
        } else if (showInfo.chestType == 3) {
            //新手宝箱
            this.setData({
                openTitle: '获得3张特权卡',
                openImg: _this.data.xinshouBg,
                [energyCard]:1,
                [helpCard]:1,
                [removeCard]:1
            })
        } else {
            //主题宝箱
            this.setData({
                openTitle: '获得能量卡1张',
                openImg: _this.data.zhutiBg,
                [energyCard]: 1
            })
        }
    },
    //放入背包
    saveCard:function(){
        if (!this.data.canSave){
            return
        }
        this.setData({
            canSave: false
        })
        let _this=this
        let insureUid ='saveCardParam.insureUid'
        let num = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        this.setData({
            [insureUid]: app.globalData.insureUid
        })
        app.httpPost('/xcx/insureMaster/openStudyChest', _this.data.saveCardParam,function(data){
            _this.setData({
                canSave:true,
                openBox:false,
                [energyCard]: 0,
                [helpCard]: 0,
                [removeCard]: 0,
                [num]: _this.data.saveCardParam.curNum-1
            })
            if (_this.data.saveCardParam.curNum>0){
                //判断宝箱是否开启完
                if (_this.data.saveCardParam.chestType==2){
                    //判断是否为分享宝箱
                    //分享宝箱随机生成卡片
                    let Num = Math.ceil(Math.random() * 3)
                    if (Num == 1) {
                        _this.setData({
                            randomImg: '../../asset/index/bangbang.png',
                            randomName: '帮帮卡',
                            [helpCard]: 1,
                        })
                    } else if (Num == 2) {
                        _this.setData({
                            randomImg: '../../asset/index/paichu.png',
                            randomName: '排除卡',
                            [removeCard]: 1
                        })
                    } else {
                        _this.setData({
                            randomImg: '../../asset/index/nengliang.png',
                            randomName: '能量卡',
                            [energyCard]: 1,
                        })
                    }
                }
                setTimeout(function(){
                    _this.setData({
                        openBox: true
                    })
                },200)
            }else{
                _this.setData({
                    showMask:false
                })
            }
        },function(error){
            console.log('error')
        })
    },

    //选中背包卡片
    showCard: function(event) {
        let tabIndex = event.currentTarget.dataset.index
        let cardData = this.data.cardData
        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showInfo.showDesc'
        let showNum = 'showInfo.curNum'
        let chestType ='showInfo.chestType'
        this.setData({
            cardIndex: tabIndex,
            [showImg]: cardData[tabIndex].img,
            [showName]: cardData[tabIndex].name,
            [showDesc]: cardData[tabIndex].desc,
            [showNum]: cardData[tabIndex].num,
            [chestType]: cardData[tabIndex].chestType||''
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
    //关闭弹窗
    closeMask: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.getHomeInfo()
        this.setData({
            showMask: false,
            openBox:false
        })
    },
    goHomepage: function() {
        wx.navigateTo({
            url: '../homepage/homepage'
        })
    },
    //页面加载
    onLoad: function() {
        let _this=this
        if (wx.getStorageSync('userInfo')) {
            wx.checkSession({
                success: function () {
                    _this.setData({
                        authFlag:true,
                        hiddenLoading:false
                    })
                    _this.getHomeInfo()
                },
                fail: function () {
                    app.doLogin(function () {
                        _this.getHomeInfo()
                    })
                    _this.setData({
                        authFlag: false, 
                        hiddenLoading:true
                    })
                }
            })
        } else {
            app.doLogin(function () {
                _this.getHomeInfo()
            })
            _this.setData({
                authFlag: false,
                hiddenLoading:true
            })
        }
    },
    onShow:function(){
        this.onLoad()
    },
    onUnload:function(){
        this.data.loopInterval=''
    },
    getPackets:function(){
        let _this=this
        let cardData = _this.data.cardData
        this.setData({
            hiddenLoading: false
        })

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
                knapsackMask: true,
                showMask: true,
                hiddenLoading: true
            })
        },function(error){
            console.log('error')
        })
    },
    getHomeInfo:function(){
        let _this=this
        let param={
            agentUserId:'',
            encryptedData: wx.getStorageSync('encryptedData'),
            insureUid: wx.getStorageSync('insureUid'),
            iv: wx.getStorageSync('iv'),
            jsCode: wx.getStorageSync('jsCode')
        }
        app.httpPost('/xcx/insureMaster/index',param,function(data){
            _this.setData({
                insureUid: data.insureUserVO.insureUid,
                insureUserVO: data.insureUserVO,
                tipList: data.tipList,
                seasonCheckVO: data.seasonCheckVO,
                chestNum: data.chestNum,
                chipFlag: data.chipFlag,
                packageFlag: data.packageFlag,
                loopBefore: data.tipList[0],
                loopAfter: data.tipList[data.tipList.length-1],
                hiddenLoading:true
            })
            wx.setStorageSync('insureUid', data.insureUserVO.insureUid)

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
        wx.setStorageSync('userInfo', e.detail.userInfo)
        wx.setStorageSync('encryptedData', e.detail.encryptedData)
        wx.setStorageSync('iv', e.detail.iv)
        this.setData({
            userInfo: e.detail.userInfo,
            authFlag: true
        })
        this.getHomeInfo()
    }
})
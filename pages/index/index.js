const app = getApp()
const netWork = require('../../utils/util.js')
Page({
    data: {
        userInfo: {},
        showRules: false,
        knapsackMask: false,
        authFlag: true,
        showCardBtn: false,
        openBox: false,
        canSave: true,
        showLoadingImg: false,
        hiddenLoading: false,
        showShare: false,
        seasonCalc: false,
        showTeacher: false,
        showLimit: false,
        seasonEnd: false,
        preSeason: false,
        teacherLimit: false,
        noNetWork: false,
        examStartFlag: true,
        gameOver:false,
        showFollow:false,
        statusBarHeight: app.globalData.statusBarHeight,
        followAccount: app.globalData.followAccount,
        loadingText: '加载中...',
        uid: '',
        type: '',
        shareDay: 0,
        showInfo: {
            showImg: '',
            showName: '',
            showDesc: '',
            curNum: 0,
            chestType: ''
        },
        saveCardParam: {
            chestType: '',
            energyCard: 0,
            helpCard: 0,
            insureUid: '',
            removeCard: 0,
            curNum: 0
        },
        chestTipList: '',
        giftIndex: 0,
        chestGainTipVO: {},
        shareInfoVO: '',
        showTxt: '',
        cardIndex: 0,
        indexData: '',
        userHeader: '',
        insureUserVO: {},
        tipList: [],
        loopBefore: '',
        loopAfter: '',
        loopInterval: null,
        curIndex: 0,
        seasonCheckVO: {},
        chestNum: 0,
        chipFlag: 0,
        packageFlag: 0,
        openTitle: '',
        isIpx: app.globalData.isIpx,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        defaultHeader: '../../asset/index/default_header.png',
        darenIcon: '../../asset/rankList/icon_daren.png',
        gaoshouIcon: '../../asset/rankList/icon_gaoshou.png',
        dashiIcon: '../../asset/rankList/icon_dashi.png',
        zongshiIcon: '../../asset/rankList/icon_zongshi.png',

        openXueyi: '../../asset/baoxiang/open_xueyi_img.png',
        openFenxiang: '../../asset/baoxiang/open_fenxiang_img.png',
        openZhuti: '../../asset/baoxiang/open_zhuti_img.png',

        s1Theme: app.globalData.s1Theme,
        s2Theme: app.globalData.s2Theme,
        s3Theme: app.globalData.s3Theme,
        s4Theme: app.globalData.s4Theme,
        hmBg: app.globalData.hmBg,
        seasonRules: app.globalData.seasonRules,
        xueyiBg: app.globalData.xueyiBg,
        fenxiangBg: app.globalData.fenxiangBg,
        xinshouBg: app.globalData.xinshouBg,
        zhutiBg: app.globalData.zhutiBg,

        bangbangImg: '../../asset/index/bangbang.png',
        paichuImg: '../../asset/index/paichu.png',
        nengliangImg: '../../asset/index/nengliang.png',
        randomImg: '',
        randomName: '',
        cardData: [{
                name: '帮帮卡',
                flag: 'helpCard',
                img: '../../asset/index/bangbang.png',
                disImg: '../../asset/index/bangbang_disabled.png',
                desc: '遇到不会的题使用“帮帮卡”自动显示正确答案,每关5道题可使用2次',
                num: 0
            },
            {
                name: '排除卡',
                flag: 'removeCard',
                img: '../../asset/index/paichu.png',
                disImg: '../../asset/index/paichu_disabled.png',
                desc: '使用“排除卡”去掉一个错误答案,每关5道题可使用3次',
                num: 0
            },
            {
                name: '能量卡',
                flag: 'energyCard',
                img: '../../asset/index/nengliang.png',
                disImg: '../../asset/index/nengliang_disabled.png',
                desc: '若当天答题能量消耗光，可以使用“能量卡”开启答题,使用次数不限哦',
                num: 0
            },
            {
                name: '新人宝箱',
                chestType: 3,
                flag: 'newerChest',
                btn: true,
                img: '../../asset/index/xinren.png',
                disImg: '../../asset/index/xinren_disabled.png',
                desc: '新用户专享体验"帮帮卡、排除卡、能量卡"各一张',
                num: 0
            },
            {
                name: '学艺宝箱',
                chestType: 1,
                flag: 'studyChest',
                btn: true,
                img: '../../asset/index/xueyi.png',
                disImg: '../../asset/index/xueyi_disabled.png',
                desc: '民生保险导师每天送出宝箱,内含三张特权卡可任选两张',
                num: 0
            },
            {
                name: '分享宝箱',
                chestType: 2,
                flag: 'shareChest',
                btn: true,
                img: '../../asset/index/fenxiang.png',
                disImg: '../../asset/index/fenxiang_disabled.png',
                desc: '分享好友参加答题,双方可获得分享宝箱,每天领取上限20次',
                num: 0
            },
            {
                name: '主题宝箱',
                chestType: 4,
                flag: 'subjectChest',
                btn: true,
                img: '../../asset/index/zhuti.png',
                disImg: '../../asset/index/zhuti_disabled.png',
                desc: '关注"保险体验师"公众号,主题宝箱限时派发～',
                num: 0
            },
            {
                name: '',
                flag: '',
                img: '',
                disImg: '',
                desc: '',
                num: 0
            },
            {
                name: '',
                flag: '',
                img: '',
                disImg: '',
                desc: '',
                num: 0
            }
        ]
    },

    //页面加载
    onLoad: function(options) {
        let _this = this
        app.globalData.canShow=false
        this.dealLoad(options)
    },
    dealLoad: function(options) {
        let _this = this
        if (options) {
            if (options.scene) { //扫描二维码进入
                let scene = decodeURIComponent(options.scene);
                let paramArr = scene.split("&");
                this.setData({
                    uid: paramArr[0],
                    type: paramArr[1],
                    shareDay: paramArr[2]
                })
                wx.setStorageSync('uid', paramArr[0])
                wx.setStorageSync('type', paramArr[1])
                wx.setStorageSync('shareDay', paramArr[2])

            } else if (options.type) { //直接分享小程序进入
                this.setData({
                    uid: options.uid,
                    type: options.type,
                    shareDay: options.shareDay || ''
                })
                wx.setStorageSync('uid', _this.data.uid)
                wx.setStorageSync('type', _this.data.type)
                wx.setStorageSync('shareDay', _this.data.shareDay || '')
            }
        }
        if (wx.getStorageSync('userInfo')) {
            wx.checkSession({
                success: function() {
                    _this.setData({
                        authFlag: true,
                        hiddenLoading: false
                    })
                    _this.getData()
                },
                fail: function() {
                    app.doLogin(function() {
                        _this.getData()
                    })
                    _this.setData({
                        authFlag: false,
                        hiddenLoading: true
                    })
                }
            })
        } else {
            app.doLogin(function() {
                _this.setData({
                    authFlag: false,
                    hiddenLoading: true
                })
            })
        }
    },
    onShow: function(options) {
        if (app.globalData.canShow) {
            this.onLoad()
        }
    },
    onHide: function() {
        let _this = this
        wx.removeStorage({
            key: 'seasonCalc',
        })
        wx.removeStorage({
            key: 'seasonEnd',
        })
        clearInterval(_this.data.loopInterval)
    },
    onUnload: function() {
        let _this = this
        clearInterval(_this.data.loopInterval)
    },
    followSeason: function() {
        this.setData({
            seasonCalc: false,
            showRules: true,
            seasonEnd: false,
            preSeason: false
        })
    },
    // 打开分享获得的宝箱
    handleOpen: function() {
        let _this = this
        let chestType = 'saveCardParam.chestType'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let type = this.data.chestGainTipVO.chestType
        this.setData({
            [chestType]: type
        })
        if (type == 1) {
            this.setData({
                [energyCard]: 0,
                [helpCard]: 0,
                [removeCard]: 0,
                openTitle: '请选择2张特权卡'
            })
        } else if (type == 2) { //如果是分享宝箱  则调用random 随机生成一张卡片
            this.randomShare()
        } else if (type == 4) { //如果是主题宝箱  则固定是能量卡
            this.setData({
                [energyCard]: 1,
                [helpCard]: 0,
                [removeCard]: 0,
                openTitle: '获得能量卡1张'
            })
            this.saveCard()
        }
        this.setData({
            openBox: true,
            showShare: false,
            openImg: type == 1 ? _this.data.xueyiBg : type == 2 ? _this.data.fenxiangBg : _this.data.zhutiBg
        })
    },
    // 关注公众哈
    follow:function(){
        this.setData({
            gameOver:false,
            showFollow:true
        })
    },
    closeFlow: function () {
        this.setData({
            showFollow: false
        })
    },
    closeOver:function(){
        this.setData({
            gameOver:false
        })
    },
    // 拜师
    followTeacher: function () {
        let _this = this
        let param = {
            agentUserId: _this.data.uid,
            insureUid: wx.getStorageSync('insureUid')
        }
        app.httpPost('/xcx/insureMaster/ackTeacher', param, function() {
            wx.showToast({
                title: '拜师成功',
                icon: 'success',
                duration: 1000,
                mask: true
            })
            setTimeout(function() {
                _this.setData({
                    showTeacher: false
                })
                _this.getData()
            }, 1000)
        }, function(error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
    // 自立门户
    handleSelfReliance: function () {
        this.setData({
            showTeacher: false
        })
        wx.removeStorage({
            key: 'type'
        })
        wx.removeStorage({
            key: 'uid'
        })
    },
    //首页所有表面事件判断
    handleCheck: function(e) {
        let _this = this
        if (!wx.getStorageSync('userInfo')) {
            _this.setData({
                authFlag: false,
                hiddenLoading: true
            })
            return
        }
        app.globalData.canShow=true
        netWork.getNetWork().then(res => {
            if (res == 'none') {
                _this.setData({
                    hiddenLoading: true,
                    noNetWork: true
                })
            } else {
                let dataset = e.currentTarget.dataset.mark
                //判断用户是否手机授权
                if (!this.data.insureUserVO.telephone) {
                    wx.navigateTo({
                        url: '../login/login'
                    })
                    return
                }
                if (_this.data.seasonCheckVO.status===4){
                    if (dataset == 'challenge' || dataset == 'treasureBox' || dataset == 'redPackets') {
                        _this.setData({
                            gameOver: true
                        })
                        return
                    }
                }
                switch (dataset) {
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
            }
        })
    },

    //打开学艺宝箱选择卡片
    handleChoseCard: function (e) {
        let dataset = e.currentTarget.dataset.card
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let saveParam = this.data.saveCardParam
        if (dataset == 'helpCard') {
            if (saveParam.energyCard === 1 && saveParam.removeCard === 1) {
                this.setData({
                    [energyCard]: 0
                })
            }
            this.setData({
                [helpCard]: 1,
            })
        } else if (dataset == 'removeCard') {
            if (saveParam.helpCard === 1 && saveParam.energyCard === 1) {
                this.setData({
                    [helpCard]: 0
                })
            }
            this.setData({
                [removeCard]: 1,
            })
        } else {
            if (saveParam.helpCard === 1 && saveParam.removeCard === 1) {
                this.setData({
                    [removeCard]: 0
                })
            }
            this.setData({
                [energyCard]: 1
            })
        }
        if (saveParam.energyCard > 0 && saveParam.helpCard > 0 || saveParam.energyCard > 0 && saveParam.removeCard > 0 || saveParam.removeCard > 0 && saveParam.helpCard>0) {
            this.saveCard()
        }
    },
    //事件处理函数
    openRules: function() {
        this.setData({
            showRules: true
        })
    },
    //  任务宝箱
    goTreasure: function() {
        if (this.data.seasonCheckVO.status == 2) { // 活动结算中
            this.setData({
                seasonCalc: true
            })
            return
        }
        wx.navigateTo({
            url: '../treasureBox/treasureBox'
        })
        this.setData({
            teacherLimit: false
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
    // 开始挑战
    goChallenge: function() {
        //答题尚未开始
        if (this.data.indexData.examStartFlag === 0) {
            this.setData({
                examStartFlag: false
            })
            return
        }
        let status = this.data.seasonCheckVO.status
        if (status == 0) { // 活动未开始
            this.setData({
                preSeason: true
            })
            return
        } else if (status == 2) { // 活动结算中
            this.setData({
                seasonCalc: true
            })
            return
        }
        wx.navigateTo({
            url: '../challengeHome/challengeHome'
        })
    },
    // 开启宝箱
    handleOpenBox: function () {
        let chestType = 'saveCardParam.chestType'
        let curNum = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let bags='saveCardParam.bags'
        let _this = this
        let showInfo = _this.data.showInfo
        this.setData({
            knapsackMask: false,
            openBox: true,
            [chestType]: showInfo.chestType,
            [curNum]: showInfo.curNum,
            [helpCard]: 0,
            [energyCard]: 0,
            [removeCard]: 0,
            [bags]:'bags'
        })
        if (showInfo.chestType == 1) {
            //学艺宝箱
            this.setData({
                openTitle: '请选择2张特权卡',
                openImg: _this.data.xueyiBg
            })
        } else if (showInfo.chestType == 2) { // 分享宝箱
            _this.randomShare()

        } else if (showInfo.chestType == 3) {
            //新手宝箱
            this.setData({
                openTitle: '获得3张特权卡',
                openImg: _this.data.xinshouBg,
                [energyCard]: 1,
                [helpCard]: 1,
                [removeCard]: 1
            })
            this.saveCard()
        } else {
            //主题宝箱
            this.setData({
                openTitle: '获得能量卡1张',
                openImg: _this.data.zhutiBg,
                [energyCard]: 1,
                [helpCard]: 0,
                [removeCard]: 0
            })
            this.saveCard()
        }
    },
    randomShare: function() {
        let _this = this
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        //分享宝箱
        this.setData({
            [energyCard]: 0,
            [helpCard]: 0,
            [removeCard]: 0
        })
        //随机数确定分享宝箱中的卡片
        let Num = Math.ceil(Math.random() * 3)
        if (Num == 1) {
            this.setData({
                randomImg: _this.data.bangbangImg,
                randomName: '帮帮卡',
                [helpCard]: 1,
            })
        } else if (Num == 2) {
            this.setData({
                randomImg: _this.data.paichuImg,
                randomName: '排除卡',
                [removeCard]: 1
            })
        } else {
            this.setData({
                randomImg: _this.data.nengliangImg,
                randomName: '能量卡',
                [energyCard]: 1
            })
        }
        this.setData({
            openTitle: '获得' + this.data.randomName + '1张',
            openImg: _this.data.fenxiangBg
        })
        this.saveCard()
    },

    //  存入背包关闭卡片
    handleCards: function () {
        this.setData({
            openBox: false
        })
        let _this = this
        let num = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        if (this.data.saveCardParam.curNum > 0) {
            //判断宝箱是否开启完
            if (this.data.saveCardParam.chestType == 2) {
                //判断是否为分享宝箱
                //分享宝箱随机生成卡片
                this.setData({
                    [energyCard]: 0,
                    [helpCard]: 0,
                    [removeCard]: 0
                })
                let Num = Math.ceil(Math.random() * 3)
                if (Num == 1) {
                    this.setData({
                        randomImg: _this.data.bangbangImg,
                        randomName: '帮帮卡',
                        [helpCard]: 1,
                    })
                } else if (Num == 2) {
                    this.setData({
                        randomImg: _this.data.paichuImg,
                        randomName: '排除卡',
                        [removeCard]: 1
                    })
                } else {
                    this.setData({
                        randomImg: _this.data.nengliangImg,
                        randomName: '能量卡',
                        [energyCard]: 1,
                    })
                }
                this.setData({
                    openTitle: '获得' + _this.data.randomName + '1张'
                })
            } else if (_this.data.saveCardParam.chestType == 1) {
                //  学艺宝箱 清空卡片
                this.setData({
                    [energyCard]: 0,
                    [helpCard]: 0,
                    [removeCard]: 0
                })
            }
            if(this.data.saveCardParam.bags){
                this.saveCard()
            }
            let timeout1 = setTimeout(function () {
                //背包连续弹出宝箱卡片
                _this.setData({
                    openBox: true
                })
                clearTimeout(timeout1)
            }, 200)
        } else {
            this.setData({
                openBox: false
            })
        };
        this.checkChest()
    },
    //打开宝箱即调用接口保存卡片
    saveCard: function() {
        if (!this.data.canSave) {
            return
        }
        let _this = this
        let insureUid = 'saveCardParam.insureUid'
        let num = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        this.setData({
            canSave: false,
            [insureUid]: wx.getStorageSync('insureUid')
        })
        app.httpPost('/xcx/insureMaster/openStudyChest', _this.data.saveCardParam, function(data) {
            let tempNum = _this.data.saveCardParam.curNum - 1
            _this.setData({
                canSave: true,
                // openBox: false,
                [num]: tempNum,
            })
        }, function(error) {
            _this.setData({
                canSave: true
            })
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 2500
            })
        })
    },
    checkChest: function() {
        let _this = this
        let chestLength = this.data.chestTipList.length
        if (chestLength > 0 && (_this.data.giftIndex <= (chestLength - 1))) {
            _this.setData({
                chestGainTipVO: _this.data.chestTipList[_this.data.giftIndex],
                giftIndex: _this.data.giftIndex + 1,
                showShare: true
            })
        }
    },
    //选中背包卡片
    showCard: function (event) {
        let tabIndex = event.currentTarget.dataset.index
        let cardData = this.data.cardData
        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showInfo.showDesc'
        let showNum = 'showInfo.curNum'
        let chestType = 'showInfo.chestType'
        this.setData({
            cardIndex: tabIndex,
            [showImg]: cardData[tabIndex].img,
            [showName]: cardData[tabIndex].name,
            [showDesc]: cardData[tabIndex].desc,
            [showNum]: cardData[tabIndex].num,
            [chestType]: cardData[tabIndex].chestType || ''
        })
        if (cardData[tabIndex].btn) {
            this.setData({
                showCardBtn: true
            })
        } else {
            this.setData({
                showCardBtn: false
            })
        }
    },
    //关闭赛季未开始
    closePreSeason: function() {
        this.setData({
            preSeason: false
        })
        this.checkShareStatus()
    },
    //关闭赛季结算弹窗
    closeSeasonCalc: function() {
        this.setData({
            seasonCalc: false
        })
        this.checkShareStatus()
    },
    //关闭赛季结束
    closeSeasonEnd: function() {
        this.setData({
            seasonEnd: false
        })
        this.checkShareStatus()
    },

    //关闭宝箱弹窗
    closeBaoxiang: function() {
        let _this = this
        this.data.chestTipList.splice(0, _this.data.chestTipList.length)
        this.setData({
            showShare: false,
            chestTipList: _this.data.chestTipList
        })
    },
    //关闭赛季攻略
    closeRules: function() {
        this.setData({
            showRules: false
        })
    },
    //关闭 学艺/分享达到领取上限、代理人无法领取宝箱、重复领取、自己不能领自己分享的
    closeUpLimit: function() {
        this.setData({
            showLimit: false
        })
        this.checkChest()
    },
    //关闭网络异常
    closeNetWork: function() {
        this.setData({
            noNetWork: false
        })
    },
    //关闭答题尚未开始
    closeUnExam: function() {
        this.setData({
            examStartFlag: true
        })
    },
    //关闭背包
    closePackages: function() {
        this.setData({
            knapsackMask: false
        })
    },
    // 关闭拜师
    closeTeacher: function() {
        this.setData({
            showTeacher: false
        })
        this.checkChest()
    },
    // 关闭学艺宝箱达到上限
    closeXueyi: function() {
        this.setData({
            teacherLimit: false
        })
        this.checkChest()
    },
    // 关闭卡片弹窗
    closeCards: function() {
        let _this = this
        this.data.chestTipList.splice(0, _this.data.chestTipList.length)
        this.setData({
            openBox: false
        })
    },
    goHomepage: function() {
        wx.navigateTo({
            url: '../homepage/homepage'
        })
    },
    getPackets: function() {
        let _this = this
        let cardData = _this.data.cardData
        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showInfo.showDesc'
        let showNum = 'showInfo.curNum'
        _this.setData({
            hiddenLoading: false,
            cardIndex: 0,
            showCardBtn: false
        })

        app.httpPost('/xcx/insureMaster/myPackage', {
            insureUid: wx.getStorageSync('insureUid')
        }, function(data) {
            for (let i = 0; i < cardData.length; i++) {
                for (let key in data) {
                    if (cardData[i].flag == key) {
                        let temp = 'cardData[' + i + '].num'
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
                hiddenLoading: true
            })
        }, function(error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 2500
            })
        })
    },
    getData: function() {
        let _this = this
        let encryptedData = wx.getStorageSync('encryptedData')
        let iv = wx.getStorageSync('iv')
        let jsCode = wx.getStorageSync('jsCode')
        let paramInsureUid = wx.getStorageSync('insureUid')
        clearInterval(_this.data.loopInterval)
        let param = {
            agentUserId: '',
            encryptedData: paramInsureUid ? '' : encryptedData,
            insureUid: paramInsureUid,
            iv: paramInsureUid ? '' : iv,
            jsCode: paramInsureUid ? '' : jsCode,
            chestType: wx.getStorageSync('type'),
            shareUserId: wx.getStorageSync('uid'),
            shareDay: wx.getStorageSync('shareDay')
        }
        app.httpPost('/xcx/insureMaster/index', param, function(data) {
            _this.setData({
                indexData: data,
                insureUid: data.insureUserVO.insureUid,
                insureUserVO: data.insureUserVO,
                tipList: data.tipList,
                seasonCheckVO: data.seasonCheckVO,
                chestNum: data.chestNum,
                chipFlag: data.chipFlag,
                packageFlag: data.packageFlag,
                loopBefore: data.tipList[0] || '',
                loopAfter: data.tipList[data.tipList.length - 1] || '',
                hiddenLoading: true,
                shareInfoVO: data.shareInfoVO,
                chestTipList: data.chestTipList
            })
            //先清除本地insureUid
            wx.removeStorageSync('insureUid')
            wx.setStorageSync('insureUid', data.insureUserVO.insureUid)
            app.globalData.insureUid = data.insureUserVO.insureUid
            // 请求完成之后清除本地存储的分享人信息
            wx.removeStorage({
                key: 'type'
            })
            wx.removeStorage({
                key: 'uid'
            })
            // 开始弹窗判断     先判断赛季信息--->>分享信息---->>宝箱信息
            let seasonStatus = _this.data.seasonCheckVO.status //赛季状态 status 0 未开始； 1 进行中； 2 结算中； 3 已结束  4 所有赛季结束
            let shareStatus = _this.data.shareInfoVO.shareStatus
            let chestTipList = data.chestTipList
            // 0 什么也不弹  1 领取成功  2 拜ta为师吧  3 导师不对，无法领取  4 领取到达上限  5 重复领取  6 分享宝箱过期  7 身份是代理人，无法成为别人的徒弟  8 自己不能领自己分享的
            if (seasonStatus != 1) { // 赛季不在进行中
                if (seasonStatus == 0) {
                    _this.setData({
                        preSeason: true
                    })
                } else if (seasonStatus == 2) {
                    if (wx.getStorageSync('seasonCalc')) { //只弹一次
                        return
                    }
                    wx.setStorageSync('seasonCalc', true)
                    _this.setData({
                        seasonCalc: true
                    })
                } else if (seasonStatus == 3) {
                    if (wx.getStorageSync('seasonEnd')) {
                        return
                    }
                    wx.setStorageSync('seasonEnd', true)
                    _this.setData({
                        seasonEnd: true
                    })
                } else if (seasonStatus == 4) {
                    if (wx.getStorageSync('gameOver')) {
                        return
                    }
                    wx.setStorageSync('gameOver', true)
                    _this.setData({
                        gameOver: true
                    })
                }
            } else { // 赛季进行中  判断分享状态
                wx.removeStorage({
                    key: 'seasonEnd',
                })
                wx.removeStorage({
                    key: 'seasonCalc',
                })
                _this.checkShareStatus()
            }

            //页面轮播文字赋值
            _this.setData({
                loopInterval: setInterval(function() {
                    if (_this.data.curIndex === _this.data.tipList.length - 1) {
                        _this.setData({
                            curIndex: 0
                        })
                    }
                    _this.setData({
                        curIndex: _this.data.curIndex + 1,
                        loopBefore: _this.data.tipList[_this.data.curIndex] || '',
                        loopAfter: _this.data.tipList[_this.data.tipList.length - _this.data.curIndex - 1] || ''
                    })
                }, 3000)
            })
        }, function(error) {
            wx.clearStorage()

            app.doLogin(function () {
                _this.setData({
                    authFlag: false,
                    hiddenLoading: true
                })
            })
            // wx.showToast({
            //     title: error.message,
            //     icon: 'none',
            //     duration: 1500
            // })
        })
    },

    //检测分享状态
    checkShareStatus: function() {
        let _this = this
        let shareStatus = this.data.shareInfoVO.shareStatus
        let chestTipList = this.data.chestTipList
        if (shareStatus != 0 && shareStatus != 1) { //有分享状态弹窗
            if (shareStatus == 2 || shareStatus == 3) {
                this.setData({
                    showTeacher: true
                })
            } else if (shareStatus == 4) { //达到上限  再判断是分享还是学艺达到上限
                if (this.data.type == 1) { //学艺宝箱达到上限
                    this.setData({
                        teacherLimit: true
                    })
                } else { //分享宝箱达到上限
                    this.setData({
                        showLimit: true
                    })
                }
            } else if (shareStatus == 5 || shareStatus == 7 || shareStatus == 8) {
                this.setData({
                    showLimit: true
                })
            } else {
                wx.showToast({
                    title: '分享宝箱已过期',
                    icon: 'none',
                    duration: 1500
                })
            }
        } else { //分享状态无弹窗
            if (chestTipList && chestTipList.length > 0) {
                this.setData({
                    chestGainTipVO: chestTipList[0],
                    giftIndex: 1,
                    showShare: true
                })
            }
        }
    },
    getUserInfo: function(e) {
        if (!e.detail.userInfo) {
            return
        }
        // app.globalData.userInfo = e.detail.userInfo
        // app.globalData.encryptedData = e.detail.encryptedData
        // app.globalData.iv = e.detail.iv
        wx.setStorageSync('userInfo', e.detail.userInfo)
        wx.setStorageSync('encryptedData', e.detail.encryptedData)
        wx.setStorageSync('iv', e.detail.iv)
        this.setData({
            userInfo: e.detail.userInfo,
            authFlag: true
        })
        this.getData()
    },
    initStatus: function() {
        this.setData({
            hiddenLoading: true
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.initStatus()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.initStatus()
    },
    onShareAppMessage: function() {
        return {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function() {}
        }
    },
})
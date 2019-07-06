const app = getApp()
const netWork = require('../../utils/util.js')
Page({
    data: {
        userInfo: {},
        showRules: false,
        showMask: false,
        knapsackMask: false,
        authFlag: true,
        showCardBtn: false,
        openBox: false,
        canSave: true,
        hiddenLoading: false,
        showShare: false,
        seasonCalc: false,
        showTeacher: false,
        showLimit: false,
        seasonEnd: false,
        preSeason: false,
        teacherLimit: false,
        noNetWork: false,
        statusBarHeight: app.globalData.statusBarHeight,
        loadingText: '加载中...',
        uid: '',
        type: '',
        shareDay: 0,
        checkShow: false,
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

        xueyiBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638085749.png',
        fenxiangBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638124450.png',
        xinshouBg: 'http://dt.minshenglife.com/upload/img/20190627/1561638049214.png',
        zhutiBg: 'http://dt.minshenglife.com/upload/img/20190627/1561637981625.png',

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
                desc: '分享好友参加答题,双方可获得分享宝箱,每天领取上限5次',
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
        if (options) {
            //扫描二维码进入
            if (options.scene) {
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
                //直接分享小程序进入
            } else if (options.type) {
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
                        showMask: false,
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
                        showMask: true,
                        hiddenLoading: true
                    })
                }
            })
        } else {
            app.doLogin(function() {
                // _this.getData()
                _this.setData({
                    authFlag: false,
                    showMask: true,
                    hiddenLoading: true
                })
            })
        }
    },
    onShow: function(options) {
        if (this.data.checkShow) {
            this.onLoad()
        }
    },
    onHide: function() {
        let _this = this
        this.setData({
            checkShow: true
        })
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
        if (type == 1) {
            this.setData({
                [energyCard]: 0,
                [helpCard]: 0,
                [removeCard]: 0,
                openTitle:'请选择2张特权卡'
            })
        }else if (type == 2) {    //如果是分享宝箱  则调用random 随机生成一张卡片
            this.randomShare()
        } else if (type == 4) { //如果是主题宝箱  则固定是能量卡
            this.setData({
                [energyCard]: 1,
                [helpCard]: 0,
                [removeCard]: 0,
                openTitle:'获得能量卡1张'
            })
        }
        this.setData({
            openBox: true,
            showShare: false,
            [chestType]: type,
            openImg: type == 1 ? _this.data.xueyiBg : type == 2 ? _this.data.fenxiangBg : _this.data.zhutiBg
        })
    },
    handleTeacher: function() {
        //判断用户是否手机授权
        if (!this.data.insureUserVO.telephone) {
            wx.navigateTo({
                url: '../login/login'
            })
            return
        }
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
                    showMask: false,
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
    handleSelfReliance: function() {
        this.setData({
            showMask: false,
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
        let _this=this
        netWork.getNetWork().then(res => {
            if (res == 'none') {
                _this.setData({
                    hiddenLoading: true,
                    showMask: true,
                    noNetWork: true
                })
            } else {
                netWork.getNetWork().then(res => {
                    if (res === 'none') {
                        wx.showToast({
                            icon: none,
                            title: '网络异常~',
                        })
                        return
                    } else {
                        let dataset = e.currentTarget.dataset.mark
                        //判断用户是否手机授权
                        if (!this.data.insureUserVO.telephone) {
                            wx.navigateTo({
                                url: '../login/login'
                            })
                            return
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
            }
        })
    },

    onShareAppMessage: function() {
        return {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561717521552.png',
            success: function() {}
        }
    },
    //打开学艺宝箱选择卡片
    handleChoseCard: function(e) {
        let dataset = e.currentTarget.dataset.card
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let saveParam = this.data.saveCardParam
        if (dataset == 'helpCard') {
            if (saveParam.energyCard === 1 && saveParam.removeCard === 1) {
                this.setData({
                    [energyCard]: 0,
                })
            }
            this.setData({
                [helpCard]: 1,
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
            showRules: true,
            showMask: true
        })
    },
    //  任务宝箱
    goTreasure: function() {
        if (this.data.seasonCheckVO.status == 2) { // 活动结算中
            _this.setData({
                showMask: true,
                seasonCalc: true
            })
            return
        }
        wx.navigateTo({
            url: '../treasureBox/treasureBox'
        })
        this.setData({
            showMask: false,
            teacherLimit:false
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
        let status = this.data.seasonCheckVO.status
        if (status == 0) { // 活动未开始
            _this.setData({
                showMask: true,
                preSeason: true
            })
            return
        } else if (status == 2) { // 活动结算中
            _this.setData({
                showMask: true,
                seasonCalc: true
            })
            return
        }
        wx.navigateTo({
            url: '../challengeHome/challengeHome'
        })
    },
    // 开启宝箱
    handleOpenBox: function() {
        let chestType = 'saveCardParam.chestType'
        let curNum = 'saveCardParam.curNum'
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        let _this = this
        let showInfo = _this.data.showInfo
        this.setData({
            knapsackMask: false,
            openBox: true,
            [chestType]: showInfo.chestType,
            [curNum]: showInfo.curNum,
            [helpCard]: 0,
            [energyCard]: 0,
            [removeCard]: 0
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
        } else {
            //主题宝箱
            this.setData({
                openTitle: '获得能量卡1张',
                openImg: _this.data.zhutiBg,
                [energyCard]: 1,
                [helpCard]: 0,
                [removeCard]: 0
            })
        }
    },
    randomShare: function() {
        let _this = this
        let energyCard = 'saveCardParam.energyCard'
        let helpCard = 'saveCardParam.helpCard'
        let removeCard = 'saveCardParam.removeCard'
        //分享宝箱
        this.setData({
            [energyCard]:0,
            [helpCard]:0,
            [removeCard]:0
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
                [energyCard]: 1,
            })
        }
        this.setData({
            openTitle: '获得' + this.data.randomName+'1张',
            openImg: _this.data.fenxiangBg
        })
    },
    //放入背包
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
            _this.setData({
                canSave: true,
                openBox: false,
                [num]: _this.data.saveCardParam.curNum - 1,
            })
            if (_this.data.saveCardParam.curNum > 0) {
                //判断宝箱是否开启完
                if (_this.data.saveCardParam.chestType == 2) {
                    //判断是否为分享宝箱
                    //分享宝箱随机生成卡片
                    _this.setData({
                        [energyCard]: 0,
                        [helpCard]: 0,
                        [removeCard]: 0
                    })
                    let Num = Math.ceil(Math.random() * 3)
                    if (Num == 1) {
                        _this.setData({
                            randomImg: _this.data.bangbangImg,
                            randomName: '帮帮卡',
                            [helpCard]: 1,
                        })
                    } else if (Num == 2) {
                        _this.setData({
                            randomImg: _this.data.paichuImg,
                            randomName: '排除卡',
                            [removeCard]: 1
                        })
                    } else {
                        _this.setData({
                            randomImg: _this.data.nengliangImg,
                            randomName: '能量卡',
                            [energyCard]: 1,
                        })
                    }
                } else if (_this.data.saveCardParam.chestType == 1) {
                    //  学艺宝箱 清空卡片
                    _this.setData({
                        [energyCard]: 0,
                        [helpCard]: 0,
                        [removeCard]: 0
                    })
                }
                let timeout1 = setTimeout(function() {
                    //背包连续弹出宝箱卡片
                    _this.setData({
                        openBox: true
                    })
                    clearTimeout(timeout1)
                }, 200)
            } else {
                _this.setData({
                    showMask: false,
                    openBox: false
                })
            };
            //获取宝箱存入卡片之后判断宝箱是否打开完毕
            if (_this.data.chestTipList.length && (_this.data.giftIndex < _this.data.chestTipList.length - 1)) {
                let timeout = setTimeout(function() {
                    _this.setData({
                        showShare: true,
                        giftIndex: _this.data.giftIndex + 1,
                        chestGainTipVO: _this.data.chestTipList[_this.data.giftIndex]
                    })
                    clearTimeout(timeout)
                }, 200)
            }
        }, function(error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 2500
            })
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
    //关闭弹窗
    closeMask: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false,
            openBox: false,
            showRules: false,
            knapsackMask: false,
            showShare: false,
            showTeacher: false,
            noNetWork:false,
            showLimit:false,
            seasonEnd:false,
            seasonCalc:false,
            preSeason:false,
            teacherLimit:false
        })
        // 如果分享状态不是0、1  则在状态弹窗关闭之后再弹出宝箱
        if (this.data.chestTipList && this.data.chestTipList.length>0) {
            if (this.data.shareInfoVO.shareStatus != 0 && this.data.shareInfoVO.shareStatus != 1) {
                this.setData({
                    showMask: true,
                    showShare: true
                })
                return
            }
        }
        let status = this.data.seasonCheckVO.status
        if (status == 0 || status == 2 || status == 3) {
            return
        }
        if (wx.getStorageSync('encryptedData')) {
            this.getData()
        }
    },
    goHomepage: function() {
        wx.navigateTo({
            url: '../homepage/homepage'
        })
    },
    getPackets: function() {
        let _this = this
        let cardData = _this.data.cardData
        this.setData({
            hiddenLoading: false
        })

        let showImg = 'showInfo.showImg'
        let showName = 'showInfo.showName'
        let showDesc = 'showInfo.showDesc'
        let showNum = 'showInfo.curNum'
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
                showMask: true,
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
        this.setData({
            showMask: false,
            openBox: false,
            showRules: false,
            knapsackMask: false,
            showShare: false,
            showTeacher: false
        })
        clearInterval(_this.data.loopInterval)
        let param = {
            agentUserId: '',
            encryptedData: wx.getStorageSync('insureUid') ? '' : wx.getStorageSync('encryptedData'),
            insureUid: wx.getStorageSync('insureUid'),
            iv: wx.getStorageSync('insureUid') ? '' : wx.getStorageSync('iv'),
            jsCode: wx.getStorageSync('insureUid') ? '' : wx.getStorageSync('jsCode'),
            chestType: wx.getStorageSync('type'),
            shareUserId: wx.getStorageSync('uid'),
            shareDay: wx.getStorageSync('shareDay')
        }
        let curNum = 'saveCardParam.curNum'
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
                chestTipList: data.chestTipList,
                [curNum]: data.chestTipList?data.chestTipList.length:0
            })
            // 请求完成之后清除本地存储的分享人信息
            wx.removeStorage({
                key: 'type'
            })
            wx.removeStorage({
                key: 'uid'
            })
            wx.setStorageSync('insureUid', data.insureUserVO.insureUid)
            app.globalData.insureUid = data.insureUserVO.insureUid
            // 判断赛季信息 status 0 未开始； 1 进行中； 2 结算中； 3 已结束
            if (_this.data.seasonCheckVO.status == 2) {
                if (wx.getStorageSync('seasonCalc')) {
                    return
                }
                wx.setStorageSync('seasonCalc', true)
                _this.setData({
                    showMask: true,
                    seasonCalc: true
                })
            } else if (_this.data.seasonCheckVO.status == 3) {
                if (wx.getStorageSync('seasonEnd')) {
                    return
                }
                wx.setStorageSync('seasonEnd', true)
                _this.setData({
                    showMask: true,
                    seasonEnd: true
                })
            }
            // 根据接口返回分享状态码弹出对应错误弹窗 
            // shareStatus 
            // 0 什么也不弹
            // 1 领取成功 
            // 2 拜ta为师吧 
            // 3 导师不对，无法领取 
            // 4 领取到达上限 
            // 5重复领取 
            // 6分享宝箱过期 
            // 7身份是代理人，无法成为别人的徒弟 
            // 8自己不能领自己分享的
            let shareStatus = _this.data.shareInfoVO.shareStatus
            if (shareStatus === 2 || shareStatus === 3) { //  拜他为师
                _this.setData({
                    showMask: true,
                    showTeacher: true
                })
            } else if (shareStatus === 6) {
                wx.showToast({
                    title: '宝箱已过期',
                    icon: 'none',
                    duration: 1000
                })
            } else if (shareStatus === 4) {
                if (_this.data.type == 1) { //学艺宝箱达到上限
                    _this.setData({
                        showMask: true,
                        teacherLimit: true
                    })
                } else { //分享宝箱达到上限
                    _this.setData({
                        showMask: true,
                        showLimit: true
                    })
                }
            } else if (shareStatus === 5 || shareStatus === 7 || shareStatus === 8) {
                _this.setData({
                    showMask: true,
                    showLimit: true
                })
            }
            if (data.chestTipList && data.chestTipList.length > 0) {
                let timeout2 = setTimeout(function() {
                    _this.setData({
                        chestGainTipVO: data.chestTipList[0],
                        giftIndex: 0
                    })
                    //  判断分享状态  如果分享状态是0、1  则弹出宝箱  否则先弹出状态弹窗
                    if (shareStatus == 0 || shareStatus == 1) {
                        _this.setData({
                            showMask: true,
                            showShare: true,
                        })
                    }
                    clearTimeout(timeout2)
                }, 600)
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
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1500
            })
        })


    },
    getUserInfo: function(e) {
        if (!e.detail.userInfo) {
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
        this.getData()
    }
})
const app = getApp()
Page({
    data: {
        isIpx: app.globalData.isIpx,
        statusBarHeight: app.globalData.statusBarHeight,
        itemIndex:0,
        key:0,
        showMask:false,
        hiddenLoading:true,
        showRule:false,
        showProgress:false,
        insurePackageVO:'',
        insureUserVO:'',
        seasonCheckVO:'',
        isUseEnergyCard:0,
        showPowerWrap:false,
        powerTxt:'',
        curSrc:'../../asset/challengeHome/daren_pic.png',
        swiperItem: ['../../asset/challengeHome/daren_pic.png', '../../asset/challengeHome/gaoshou_pic.png', '../../asset/challengeHome/dashi_pic.png', '../../asset/challengeHome/zongshi_pic.png'],
        swiperDisabeItem: ['../../asset/challengeHome/daren_pic_disable.png', '../../asset/challengeHome/gaoshou_pic_disable.png', '../../asset/challengeHome/dashi_pic_disable.png', '../../asset/challengeHome/zongshi_pic_disable.png'],
        activesRuels: app.globalData.activesRuels
    },

    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function () { }
        }
    },
    goBack: function () {
        app.goBack()
    },
    startTest: function () {
        let _this=this
        //开始答题判断能量值是否足够
        if (this.data.insureUserVO.todayEnergy<5){
            this.setData({
                showMask:true,
                showPowerWrap:true
            })
            return
        }
        this.setData({
            showMask:true,
            showProgress:true
        })
        // 3.5s后开始进入答题页
        let timeout=setTimeout(function(){
            _this.getQuestion()
            clearTimeout(timeout)
        },3500)
    },
    goRedPackets: function () {
        wx.navigateTo({
            url: '../redPackets/redPackets'
        })
    },
    getQuestion:function(){
        let _this=this
        let param={
            insureUid: wx.getStorageSync('insureUid'),
            isUseEnergyCard: _this.data.isUseEnergyCard
        }
        wx.removeStorage({
            key: 'question',
        })
        wx.removeStorage({
            key: 'examUserId',
        })
        app.httpPost('/xcx/insureMaster/examStart', param,function(data){
            wx.setStorageSync('question', data.insureExamGenerateResponse)
            wx.setStorageSync('examUserId', data.insureExamGenerateResponse.examUserId)
            //请求考题后跳转答题页
            wx.navigateTo({
                url: '../challenge/challenge'
            })
            let timeOut = setTimeout(function () {
                _this.setData({
                    showMask: false,
                    showProgress: false
                })
                clearTimeout(timeOut)
            }, 500)
        }, function (error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
    bindchange:function(e){
        var _this=this
        if (e.detail.source==='touch'){
            this.setData({
                curSrc: _this.data.swiperDisabeItem[e.detail.current],
                itemIndex: e.detail.current
            })
            let timeout=setTimeout(function () {
                _this.setData({
                    curSrc: _this.data.swiperItem[e.detail.current]
                })
                clearTimeout(timeout)
            },400)
        }
    },
    closeMask: function (event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false,
            showRule:false,
            showPowerWrap:false
        })
    },
    showRule:function(){
        this.setData({
            showMask:true,
            showRule:true
        })
    },
    // 使用能量卡
    usePower: function () {
        let _this=this
        _this.setData({
            showMask: true,
            showProgress: true,
            showPowerWrap:false,
            isUseEnergyCard: 1
        })
        // 3.5s后开始进入答题页
        let timeOut=setTimeout(function () {
            _this.getQuestion()
            clearTimeout(timeOut)
        }, 3500)
    },
    // 做任务
    goTreasure: function () {
        let _this=this
        wx.navigateTo({
            url: '../treasureBox/treasureBox',
            success:function(){
                let timeOut=setTimeout(function(){
                    _this.setData({
                        showMask:false,
                        showPowerWrap:false
                    })
                },500)
            }
        })
    },
    getData:function(){
        let _this=this
        this.setData({
            hiddenLoading:false
        })
        let picList = this.data.swiperItem
        app.httpPost('/xcx/insureMaster/startChallenge', { insureUid: wx.getStorageSync('insureUid')},function(data){
        let userLevel = data.insureUserVO.userLevel
            _this.setData({
                insurePackageVO: data.insurePackageVO,
                insureUserVO: data.insureUserVO,
                seasonCheckVO: data.seasonCheckVO,
                hiddenLoading:true,
                itemIndex: data.insureUserVO.userLevel-1,
                curSrc: picList[data.insureUserVO.userLevel - 1]
            })
            wx.setStorageSync('helpCard', data.insurePackageVO.helpCard)
            wx.setStorageSync('removeCard', data.insurePackageVO.removeCard)
        }, function (error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.getData()
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function () {

    },

  /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        // this.setData({
        //     showMask: false,
        //     showRule: false,
        //     showPowerWrap: false,
        //     showProgress:false
        // })
        this.onLoad()
    },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})
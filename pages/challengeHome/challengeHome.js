// pages/challengeHome/challengeHome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
        itemIndex:0,
        key:0,
        showMask:false,
        hiddenLoading:true,
        showRule:false,
        insurePackageVO:'',
        insureUserVO:'',
        seasonCheckVO:'',
        isUseEnergyCard:0,
        examData:'',
        showPowerWrap:false,
        powerTxt:'',
        currentSrc:'../../asset/challengeHome/daren_pic.png',
        swiperItem: ['../../asset/challengeHome/daren_pic.png', '../../asset/challengeHome/gaoshou_pic.png', '../../asset/challengeHome/dashi_pic.png', '../../asset/challengeHome/zongshi_pic.png'],
        swiperDisabeItem: ['../../asset/challengeHome/daren_pic_disable.png', '../../asset/challengeHome/gaoshou_pic_disable.png', '../../asset/challengeHome/dashi_pic_disable.png', '../../asset/challengeHome/zongshi_pic_disable.png'],
    },

    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561717521552.png',
            success: function () { }
        }
    },
    goBack: function () {
        app.goBack()
    },
    startTest: function () {
        //开始答题判断能量值是否足够
        if (this.data.insureUserVO.todayEnergy<5){
            this.setData({
                showMask:true,
                showPowerWrap:true
            })
            return
        }
        console.log('start')
        this.getQuestion()
    },
    getQuestion:function(){
        let _this=this
        app.httpPost('/xcx/insureMaster/examStart', { insureUid: wx.getStorageSync('insureUid'), isUseEnergyCard: _this.data.isUseEnergyCard},function(data){
            _this.setData({
                examData: data.insureExamGenerateResponse
            })
            wx.setStorageSync('question', data.insureExamGenerateResponse)
            //请求考题后跳转答题页
            wx.navigateTo({
                url: '../challenge/challenge'
            })
        },function(error){
            console.log('error')
        })
    },
    bindchange:function(e){
        var _this=this
        if (e.detail.source==='touch'){
            this.setData({
                currentSrc: this.data.swiperDisabeItem[e.detail.current],
                itemIndex: e.detail.current
            })
            setTimeout(function () {
                _this.setData({
                    currentSrc: _this.data.swiperItem[e.detail.current]
                })
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
    // 使用能量
    usePower: function () {
        this.setData({
            isUseEnergyCard:1
        })
        console.log(123)
        this.getQuestion()
    },
    // 做任务
    goTreasure: function () {
        wx.navigateTo({
            url: '../treasureBox/treasureBox'
        })
    },
    getData:function(){
        let _this=this
        this.setData({
            hiddenLoading:false
        })
        app.httpPost('/xcx/insureMaster/startChallenge', { insureUid: wx.getStorageSync('insureUid')},function(data){
            _this.setData({
                insurePackageVO: data.insurePackageVO,
                insureUserVO: data.insureUserVO,
                seasonCheckVO: data.seasonCheckVO,
                hiddenLoading:true,
                itemIndex: data.insureUserVO.userLevel-1
            })
            wx.setStorageSync('helpCard', data.insurePackageVO.helpCard)
            wx.setStorageSync('removeCard', data.insurePackageVO.removeCard)
        },function(error){
            console.log('error')
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
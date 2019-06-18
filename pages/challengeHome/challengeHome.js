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
        currentSrc:'../../asset/challengeHome/daren_pic.png',
        swiperItem: ['../../asset/challengeHome/daren_pic.png', '../../asset/challengeHome/gaoshou_pic.png', '../../asset/challengeHome/dashi_pic.png', '../../asset/challengeHome/zongshi_pic.png'],
        swiperDisabeItem: ['../../asset/challengeHome/daren_pic_disable.png', '../../asset/challengeHome/gaoshou_pic_disable.png', '../../asset/challengeHome/dashi_pic_disable.png', '../../asset/challengeHome/zongshi_pic_disable.png'],
    },

    goBack: function () {
        app.goBack()
    },
    goQuestion: function () {
        wx.navigateTo({
            url: '../challenge/challenge'
        })
    },
    bindchange:function(e){
        var that=this
        if (e.detail.source==='touch'){
            this.setData({
                currentSrc: this.data.swiperDisabeItem[e.detail.current],
                itemIndex: e.detail.current
            })
            setTimeout(function () {
                that.setData({
                    currentSrc: that.data.swiperItem[e.detail.current]
                })
            },400)
        }
    },
    closeMask: function (event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false
        })
    },
    showRule:function(){
        this.setData({
            showMask:true
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {

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
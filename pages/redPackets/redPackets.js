// pages/redPackets/redPackets.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        redPacketsData:{},
        hiddenLoading:true,
        loadingText:'加载中...'
    },

    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'http://dt.minshenglife.com/upload/img/20190628/1561717521552.png',
            success: function () { }
        }
    },
    goBack: function() {
        app.goBack()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getRedPackets()

    },
    getRedPackets:function(){
        let _this=this
        this.setData({
            hiddenLoading:false
        })
        app.httpPost('/xcx/insureMaster/chip', { insureUid: wx.getStorageSync('insureUid')}, function (data) {
            _this.setData({
                redPacketsData: data,
                hiddenLoading: true
            })
        }, function (data) {
            console.log('error')
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
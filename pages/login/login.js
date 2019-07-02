// pages/login/login.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
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
    getPhoneNumber:function(e){
        let _this=this
        let param={
            sessionKey: app.globalData.sessionKey,
            encryptedData: e.detail.encryptedData,
            insureUid: wx.getStorageSync('insureUid'),
            iv: e.detail.iv
        }
        app.httpPost('/xcx/insureMaster/bindTelephone', param, function () {
            app.goBack()
        },function(errorData){
            wx.showToast({
                title: errorData,
                icon:'none',
                duration:1500,
                mask:true
            })
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
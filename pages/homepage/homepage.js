const app = getApp()
Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        insureUserVO:'',
        seasonData:[],
        loadingText:'加载中...',
        hiddenLoading:true,
        darenImg: '../../asset/rankList/daren_pic.png',
        gaoshouImg: '../../asset/rankList/gaoshou_pic.png',
        dashiImg: '../../asset/rankList/dashi_pic.png',
        zongshiImg: '../../asset/rankList/zongshi_pic.png',
        darenIcon: '../../asset/rankList/icon_daren.png',
        gaoshouIcon: '../../asset/rankList/icon_gaoshou.png',
        dashiIcon: '../../asset/rankList/icon_dashi.png',
        zongshiIcon: '../../asset/rankList/icon_zongshi.png',
    },

    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function () { }
        }
    },
    goBack: function() {
        app.goBack()
    },
    getData: function() {
        let _this = this
        this.setData({
            hiddenLoading:false
        })
        app.httpPost('/xcx/insureMaster/personalCenter', { insureUid: wx.getStorageSync('insureUid')}, function(data) {
            _this.setData({
                insureUserVO: data.insureUserVO,
                seasonData: data.recordVOList,
                hiddenLoading:true
            })
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
    onLoad: function(options) {
        this.getData()
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
})
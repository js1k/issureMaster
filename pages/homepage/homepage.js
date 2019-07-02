// pages/homepage/homepage.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        insureUserVO:'',
        seasonData:[],
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
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'http://dt.minshenglife.com/upload/img/20190628/1561717521552.png',
            success: function () { }
        }
    },
    goBack: function() {
        app.goBack()
    },
    getData: function() {
        let _this = this
        wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 1000
        })
        app.httpPost('/xcx/insureMaster/personalCenter', { insureUid: wx.getStorageSync('insureUid')}, function(data) {
            _this.setData({
                insureUserVO: data.insureUserVO,
                seasonData: data.recordVOList
            })
        }, function(data) {
            console.log('error')
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
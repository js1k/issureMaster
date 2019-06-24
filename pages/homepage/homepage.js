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

    goBack: function() {
        app.goBack()
    },
    getData: function() {
        let _this = this
        app.httpPost('/xcx/insureMaster/personalCenter', { insureUid: app.globalData.insureUid}, function(data) {
            console.log(data)
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
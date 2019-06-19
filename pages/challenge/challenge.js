// pages/challenge/challenge.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex:0,
        countDown:60,
        answerItem: ['银保监会，12378', '证监会，12386','消费者协会，12315']
    },

    goBack: function () {
        app.goBack()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this
        setTimeout(function () {
            _this.calcTime()
        },2000)
    },
    calcTime: function () {
        var _this = this
        let timeInterval = setInterval(function () {
            if (_this.data.countDown>0){
                _this.setData({
                    countDown: _this.data.countDown - 1
                })
            }else{

            }
        }, 1000)
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
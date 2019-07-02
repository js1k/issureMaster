// pages/challenge/challenge.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex:0,
        countDown:60,
        unfinshed:false,
        interval:null,
        timeInterval:null,
        answerItem: ['银保监会，12378', '证监会，12386','消费者协会，12315']
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
        if (this.data.countDown>0){
            this.setData({
                unfinshed:true
            })
            return
        }
        this.confirmBack()
    },
    confirmBack: function(){
        app.goBack()
    },
    cancleBack: function () {
        this.setData({
            unfinshed: false
        })
    },
    getData:function(){
        app.httpPost('/xcx/insureMaster/examStart', { insureUid: wx.getStorageSync('insureUid'), isUseEnergyCard:0},function(data){
            console.log(data)
        },function(error){
            console.log('error')
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this
        this.interval=setTimeout(function () {
            _this.calcTime()
        },2000)
        // this.getData()
    },
    calcTime: function () {
        var _this = this
        this.timeInterval = setInterval(function () {
            if (_this.data.countDown>0){
                _this.setData({
                    countDown: _this.data.countDown - 1
                })
            }else{

            }
        }, 1000)
    },
    onHide: function () {
        clearInterval(this.data.interval)
        clearInterval(this.data.timeInterval)
    },
    onUnload: function () {
        clearInterval(this.data.interval)
        clearInterval(this.data.timeInterval)
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
const app = getApp()
let timer;
Page({
    data: {
        isIpx: app.globalData.isIpx,
        statusBarHeight: app.globalData.statusBarHeight,
        redPacketsData:{},
        hiddenLoading:true,
        loadingText:'加载中...',
        day:0,
        hour:0,
        minute:0,
        second:0,
        circleBg: app.globalData.circleBg,
        compoundBt: app.globalData.compoundBt
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
            
            if (data.expireTime) {
                let expireTime = data.expireTime / 1000
                let nowTime = new Date().getTime()
                timer = setInterval(function () {
                    let tillTime = new Date().getTime()
                    let tempVal = expireTime - (tillTime - nowTime) / 1000
                    let days = Math.floor(tempVal / 86400)
                    tempVal = tempVal % 86400
                    let hours = Math.floor(tempVal / 3600)
                    tempVal = tempVal % 3600
                    let minutes = Math.floor(tempVal / 60)
                    let seconds = Math.floor(tempVal % 60)
                    _this.setData({
                        day: days,
                        hour: hours,
                        minute: minutes,
                        second: seconds
                    })
                }, 1000)
            }
            _this.setData({
                redPacketsData: data,
                hiddenLoading: true
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
        clearInterval(timer)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearInterval(timer)
    },
})
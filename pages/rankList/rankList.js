// pages/rankList/rankList.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showSeasonList: true,
        showMask: false,
        pageNum:1,
        pageSize:30,
        totalPage:'',
        isEnd:false,
        pageData:'',
        insureUser:'',
        pageList:[],
        url: '/xcx/insureMaster/rankByStar',
        hiddenLoading: true,
        loadingText: '加载中...'
    },
    bindscrolltolower:function(e){
        if (this.data.pageNum >= this.data.totalPage){
            return
        }
        this.setData({
            pageNum: this.data.pageNum+1,
        })
        this.getData()
    },
    goBack: function() {
        app.goBack()
    },
    getList:function(e){
        let _this = this
        this.setData({
            showSeasonList: !this.data.showSeasonList,
            pageNum: 1,
            url: e.currentTarget.dataset.type === 'season' ? '/xcx/insureMaster/rankByStar' : '/xcx/insureMaster/rankByPoint',
            pageList:[]
        })
        _this.getData()
    },
    rankRules: function() {
        this.setData({
            showMask: true
        })
    },
    closeMask: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false
        })
    },
    getData: function() {
        let _this = this
        this.setData({
            hiddenLoading:false
        })
        let param = {
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize,
            insureUid: wx.getStorageSync('insureUid')
        }
        app.httpPost(_this.data.url, param, function(data) {
            _this.setData({
                pageData:data,
                insureUser: data.insureUser,
                totalPage: data.rankUserPage.totalPage,
                pageList: [..._this.data.pageList, ...data.rankUserPage.list], 
                hiddenLoading:true
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
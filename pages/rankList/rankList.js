const app = getApp()
Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        showSeasonList: true,
        showMask: false,
        pageNum:1,
        pageSize:30,
        totalPage:'',
        isEnd:false,
        pageData:'',
        insureUser:'',
        pageList:[],

        darenIcon: '../../asset/rankList/icon_daren.png',
        gaoshouIcon: '../../asset/rankList/icon_gaoshou.png',
        dashiIcon: '../../asset/rankList/icon_dashi.png',
        zongshiIcon: '../../asset/rankList/icon_zongshi.png',
        
        url: '/xcx/insureMaster/rankByStar',
        hiddenLoading: true,
        loadingText: '加载中...',
        activesRuels: app.globalData.activesRuels
    },
    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function () { }
        }
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
        let type = e.currentTarget.dataset.type
        this.setData({
            showSeasonList: !_this.data.showSeasonList,
            pageNum: 1,
            url: type === 'season' ? '/xcx/insureMaster/rankByStar' : '/xcx/insureMaster/rankByPoint',
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
})
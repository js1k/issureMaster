// pages/treasureBox/treasureBox.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showTask: true,
        showMask: false,
        showCards:false,
        showShare:false,
        noClient:false,
        showSharePic:false,
        showShareActive:false,
        totalPage:0,
        curMark:'treasure',
        treasureData:'',
        showNewPlay:false,
        showBaishi:false,
        clientData:'',
        shareName: wx.getStorageSync('userInfo').nickName,
        recordParam:{
            pageNum:1,
            pageSize:15,
            insureUid: wx.getStorageSync('insureUid')
        },
        recordList:[]
    },
    onShareAppMessage: function () {
        return {
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'http://dt.minshenglife.com/upload/img/20190628/1561717521552.png',
            success: function () { }
        }
    },
    saveImg:function(){
        
    },
    handleShare:function(){
        this.setData({
            showMask: true,
            showShareActive:true
        })
    },
    saveCard:function(){
        let _this=this
        let param={
            chestType:3,
            energyCard:1,
            helpCard:1,
            removeCard:1,
            insureUid: wx.getStorageSync('insureUid')
        }
        app.httpPost('/xcx/insureMaster/openStudyChest', param,function(data){
            _this.setData({
                showMask: false,
                showCards:false
            })
            _this.getTreasure()
        },function(error){
            console.log('error')
        })
    },
    goBack: function() {
        app.goBack()
    },
    handleToggle: function(e) {
        let dataset=e.currentTarget.dataset.mark
        this.setData({
            curMark: dataset
        })
        if (dataset === 'treasure') {
            this.setData({
                showTask: true
            })
        } else {
            this.setData({
                showTask: false
            })
            this.getRecords()
        }
    },
    takeNew: function () {
        let _this=this
        app.httpPost('/xcx/insureMaster/gainNewChest', { insureUid: wx.getStorageSync('insureUid')},function(){
            _this.setData({
                showMask: true,
                showNewPlay:true,
                showShare:false
            })
        },function(error){
            console.log('error')
        })
    },
    bindscrolltolower:function(e){
        if (this.data.curMark ==='treasure'){
            return 
        }
        if (this.data.recordParam.pageNum >= this.data.totalPage) {
            return
        }
        let pageNum ='recordParam.pageNum'
        this.setData({
            [pageNum]: this.data.recordParam.pageNum + 1,
        })
        this.getRecords()
    },
    takeTeacher: function() {
        this.getTeacher()
    },
    getTeacher:function(){
        let _this=this
        app.httpPost('/xcx/insureMaster/lookAgent', { insureUid: wx.getStorageSync('insureUid')},function(data){
            _this.setData({
                clientData: data,
                showMask: true,
                showBaishi: true
            })
        },function(error){
            //没有绑定代理人
            _this.setData({
                noClient: true,
                showMask: true
            })
        })
    },
    closeMask: function(event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false,
            showNewPlay:false,
            showCards: false,
            showShare: false,
            showBaishi:false,
            noClient:false,
            showShareActive:false
        })
    },
    shareWx: function() {
        this.setData({
            showMask: true,
            showShare:true
        })
    },
    previewImage: function(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current]
        })
    },
    getTreasure:function(){
        let _this=this
        app.httpPost('/xcx/insureMaster/taskChest', { insureUid: wx.getStorageSync('insureUid')},function(data){
            _this.setData({
                treasureData:data
            })
        })
    },
    getRecords: function() {
        let _this = this
        wx.showToast({
            title: '加载中',
            icon: 'success',
            duration: 1000
        })
        app.httpPost('/xcx/insureMaster/chestRecord', _this.data.recordParam, function(data) {
            _this.setData({
                recordList: [..._this.data.recordList,...data.list],
                totalPage: data.totalPage
            })
        }, function(error) {
            console.log('error')
        })
    },
    handleOpen:function(){
        this.setData({
            showCards:true,
            showNewPlay:false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getTreasure()
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
const app = getApp()
let util=require('../../utils/util.js')
Page({
    data: {
        statusBarHeight: app.globalData.statusBarHeight,
        showTask: true,
        showMask: false,
        showCards: false,
        showShare: false,
        noClient: false,
        showSharePic: false,
        showShareActive: false,
        totalPage: 0,
        curMark: 'treasure',
        treasureData: '',
        showNewPlay: false,
        showBaishi: false,
        creatImg: true,
        clientData: '',
        hiddenLoading: true,
        loadingText: '图片生成中...',
        shareName: '',
        insureUid: '',
        recordParam: {
            pageNum: 1,
            pageSize: 15,
            insureUid: ''
        },
        recordList: [],
        shareCoverImg: app.globalData.shareCoverImg,
        shareQrImg: '',
        studyBg: app.globalData.studyBg,
        shareBg: app.globalData.shareBg,
        newBg: app.globalData.newBg,
        followBg: app.globalData.followBg,
        studyBox: app.globalData.studyBox,
        noTeacher: app.globalData.noTeacher,
        followAccount: app.globalData.followAccount,
        wxShareImg: app.globalData.wxShareImg
    },
    onShareAppMessage: function (options) {
        let _this=this
        
        let param = {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function() {}
        }
        if (options.from === 'button') {
            var dataid = options.target.dataset;
            param.title = this.data.shareName+'送你“分享宝箱”快来和TA一起赢取大奖吧～',
            param.path = '/pages/index/index?uid=' + _this.data.insureUid + '&type=2&shareDay=' + util.getNow()
        }
        return {...param}
    },
    saveImg: function () {
        util.vibrateShort()
        wx.canvasToTempFilePath({
            canvasId: 'shareCanvas',
            success: function (res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        wx.showToast({
                            title: '分享图片已保存到相册',
                        })
                    }
                })
            }
        }, this)
    },
    handleShare: function () {
        util.vibrateShort()
        let _this = this
        let winWidth = app.globalData.winWidth
        let winHeight = app.globalData.winHeight
        let canvasWidth = 0.7333 * winWidth
        let canvasHeight = canvasWidth/0.72368
        this.setData({
            hiddenLoading: false
        })
        
        const ctx = wx.createCanvasContext('shareCanvas', this)
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.draw()
        //获取小程序二维码
        app.httpPost('/xcx/insureMaster/lookXcxQrCode', {
            insureUid: _this.data.insureUid
        }, function(data) {
            _this.setData({
                shareQrImg: data.xcxQrCode
            })
            //处理昵称 20个字符
            let str = data.nickName
            let bytesCount=0
            let nickName='';
            if (str){
                for (let i = 0; i < str.length;i++){
                    let c = str.charCodeAt(i)
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)){
                        bytesCount+=1
                    }else{
                        bytesCount+=2
                    }
                    nickName+=str.charAt(i)
                    if (bytesCount>=20){
                        nickName+='...'
                        break
                    }
                }
            }
            wx.getImageInfo({
                src: _this.data.shareCoverImg,
                success: (res1) => {
                    let url = res1.path
                    ctx.drawImage(res1.path, 0, 0, 0.733 * winWidth, 0.733 * winWidth/0.9167 )
                    wx.getImageInfo({
                        src: data.xcxQrCode,
                        success: (res2) => {
                            let qrImgSize = 70
                            ctx.drawImage(res2.path, 0.552 * winWidth, 0.552 * winWidth/0.6635, 56, 56)
                            ctx.stroke()
                            ctx.draw(true)
                            ctx.font ="bold 14px Arial"
                            ctx.setFillStyle('#000')
                            ctx.fillText(nickName, 0.0473 * winWidth, 0.0473 * winWidth / 0.0533)
                            ctx.draw(true)
                            ctx.font = "normal 12px Arial"
                            ctx.setFillStyle('#000')
                            ctx.fillText('送你“分享宝箱”一起来挑战', 0.0473 * winWidth, 0.0473 * winWidth/0.0493)
                            ctx.draw(true)
                            _this.setData({
                                creatImg: false,
                                hiddenLoading: true
                            })
                        }
                    })
                }
            })

            _this.setData({
                showMask: true,
                showShareActive: true
            })
        },function(error){
            _this.setData({
                hiddenLoading: true
            })
            wx.showToast({
                title: error.message,
            })
        })
    },
    saveCard: function () {
        util.vibrateShort()
        let _this = this
        let param = {
            chestType: 3,
            energyCard: 1,
            helpCard: 1,
            removeCard: 1,
            insureUid: _this.data.insureUid
        }
        app.httpPost('/xcx/insureMaster/openStudyChest', param, function(data) {
            _this.setData({
                showMask: false,
                showCards: false
            })
            _this.getTreasure()
        }, function (error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
    goBack: function() {
        app.goBack()
    },
    // 切换按钮
    handleToggle: function (e) {
        util.vibrateShort()
        let dataset = e.currentTarget.dataset.mark
        this.setData({
            curMark: dataset
        })
        if (dataset === 'treasure') {
            this.setData({
                showTask: true
            })
        } else {
            this.setData({
                showTask: false,
                recordList:[]
            })
            this.getRecords()
        }
    },
    takeNew: function() {
        let _this = this
        app.httpPost('/xcx/insureMaster/gainNewChest', {
            insureUid: _this.data.insureUid
        }, function() {
            _this.setData({
                showMask: true,
                showNewPlay: true,
                showShare: false
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
    bindscrolltolower: function(e) {
        let _this=this
        if (this.data.curMark === 'treasure') {
            return
        }
        if (this.data.recordParam.pageNum >= this.data.totalPage) {
            return
        }
        let pageNum = 'recordParam.pageNum'
        this.setData({
            [pageNum]: _this.data.recordParam.pageNum + 1,
        })
        this.getRecords()
    },
    takeTeacher: function () {
        util.vibrateShort()
        this.getTeacher()
    },
    getTeacher: function() {
        let _this = this
        app.httpPost('/xcx/insureMaster/lookAgent', {
            insureUid: _this.data.insureUid
        }, function(data) {
            _this.setData({
                clientData: data,
                showMask: true,
                showBaishi: true
            })
        }, function(error) {
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
            showNewPlay: false,
            showCards: false,
            showShare: false,
            showBaishi: false,
            noClient: false,
            showShareActive: false
        })
        this.getTreasure()
    },
    shareWx: function() {
        this.setData({
            showMask: true,
            showShare: true
        })
    },
    //预览图片
    previewImage: function (e) {
        util.vibrateShort()
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current]
        })
    },
    //  获取任务信息
    getTreasure: function() {
        let _this = this
        app.httpPost('/xcx/insureMaster/taskChest', {
            insureUid: wx.getStorageSync('insureUid')
        }, function(data) {
            _this.setData({
                treasureData: data
            })
        },function(error){
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
    //  获取领取列表
    getRecords: function() {
        let _this = this
        let insureUid ='recordParam.insureUid'
        this.setData({
            [insureUid]: wx.getStorageSync('insureUid')
        })
        app.httpPost('/xcx/insureMaster/chestRecord', _this.data.recordParam, function(data) {
            _this.setData({
                recordList: [..._this.data.recordList, ...data.list],
                totalPage: data.totalPage
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
    handleOpen: function() {
        this.setData({
            showCards: true,
            showNewPlay: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this=this
        wx.getStorage({
            key:'userInfo',
            success:function(res){
                _this.setData({
                    shareName: res.data.nickName
                })
            }
        })
        this.setData({
            insureUid: wx.getStorageSync('insureUid')
        })
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
})
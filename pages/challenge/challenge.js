// pages/challenge/challenge.js
const app = getApp()
Page({
    /**privilege-titleasdfasdf
     * 页面的初始数据
     */
    data: {
        curIndex: 0,    //当前答题序号
        showMask:false,
        countDownTime: 60,
        unfinshed: false,
        interval: null,
        timeInterval: null,
        answerEnd:true,
        hiddenLoading:true,
        showShareActive:false,
        creatImg:true,
        loadingText:'图片生成中...',
        examUserId: wx.getStorageSync('question').examUserId,
        question: wx.getStorageSync('question').subjectList,
        bangbang: '../../asset/challengeHome/bangbang_icon.png',
        paichu: '../../asset/challengeHome/paichu_icon.png',
        bangbangDisable: '../../asset/challengeHome/bangbang_icon_disable.png',
        paichuDisable: '../../asset/challengeHome/paichu_icon_disable.png',
        helpCard: wx.getStorageSync('helpCard'),
        removeCard: wx.getStorageSync('removeCard'),
        curQuestion: '',
        choseItem:-1,
        canSubmit:true,
        subParam:{
            answerList:[],
            examUserId: wx.getStorageSync('question').examUserId,
            insureUid: wx.getStorageSync('insureUid'),
            subjectIdList:[]
        },
        queList: [{
                serial: 'A',
                question: ''
            },
            {
                serial: 'B',
                question: ''
            },
            {
                serial: 'C',
                question: ''
            }
        ],

        shareCoverImg: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190703/1562146275324.png',
        shareQrImg: '',
    },

    onShareAppMessage: function (options) {
        let param = {
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561717521552.png',
            success: function () {

            }
        }
        if (options.from === 'button') {
            var dataid = options.target.dataset;
            param.path = '/pages/index/index'
        }
        return { ...param }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this  
        this.setQuestion(0)
        this.interval = setTimeout(function() {
            _this.calcTime()
        }, 2300)
    },
    saveImg: function () {
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
        let _this = this
        this.setData({
            hiddenLoading: false
        })
        const ctx = wx.createCanvasContext('shareCanvas', this)
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, 275, 380)
        ctx.draw()
        //获取小程序二维码
        app.httpPost('/xcx/insureMaster/lookXcxQrCode', {
            insureUid: wx.getStorageSync('insureUid')
        }, function (data) {
            _this.setData({
                shareQrImg: data.xcxQrCode
            })
            wx.getImageInfo({
                src: _this.data.shareCoverImg,
                success: (res1) => {
                    let url = res1.path
                    ctx.drawImage(res1.path, 0, 0, 275, 300)
                    wx.getImageInfo({
                        src: data.xcxQrCode,
                        success: (res2) => {
                            let qrImgSize = 70
                            ctx.drawImage(res2.path, 190, 306, qrImgSize, qrImgSize)
                            ctx.stroke()
                            ctx.draw(true)
                            ctx.setFontSize(14)
                            ctx.setFillStyle('#000')
                            ctx.fillText('我在答题赢大奖 不服来战', 16, 330)
                            ctx.draw(true)
                            ctx.setFontSize(12)
                            ctx.setFillStyle('#000')
                            ctx.fillText('保保大师答题挑战赛~', 16, 356)
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
        })
    },
    goChallengeHome: function () {
        wx.navigateTo({
            url: '../challengeHome/challengeHome'
        })
    },
    goRankList: function () {
        wx.navigateTo({
            url: '../rankList/rankList'
        })
    },
    //处理考题
    setQuestion: function (num) {
        if (num>4){
            return
        }
        let _this = this
        let queListA = 'queList[0].question'
        let queListB = 'queList[1].question'
        let queListC = 'queList[2].question'
        this.setData({
            curQuestion: _this.data.question[num],
            [queListA]: _this.data.question[num].optionA,
            [queListB]: _this.data.question[num].optionB,
            [queListC]: _this.data.question[num].optionC,
        })
        if (num===0){
            return 
        }
        this.setData({
            curIndex: _this.data.curIndex + 1,
            choseItem: -1
        })
    },
    //选择答案
    choseAnswer:function(e){
        let serial = e.currentTarget.dataset.serial
        let _this = this
        //  如果五题答完 或者 时间结束 不可选
        if (this.data.subParam.answerList.length == 5 || this.data.countDownTime==0){
            return
        }
        let idList = 'subParam.subjectIdList[' + this.data.subParam.subjectIdList.length + ']'
        let answerList = 'subParam.answerList[' + this.data.subParam.subjectIdList.length + ']'
        _this.setData({
            choseItem: serial == 'A' ? 0 : serial == 'B'?1:2,
            [idList]: _this.data.question[_this.data.curIndex].id,
            [answerList]: serial
        })
        setTimeout(function () {
            _this.setQuestion(_this.data.curIndex+1)
        },800)
    },
    //提交答案
    submitTest:function(){
        let _this = this
        if (!_this.data.canSubmit) {
            return
        }
        _this.setData({
            canSubmit: false
        })
        app.httpPost('/xcx/insureMaster/examHandIn', _this.data.subParam,function(){
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000,
                mask: true
            })
            _this.setData({
                canSubmit:true
            })
        },function(error){
            console.log('error')
        })
    },
    goBack: function() {
        if (this.data.countDownTime > 0) {
            this.setData({
                showMask:true,
                unfinshed: true
            })
            return
        }
        this.confirmBack()
    },
    //答题过程中后退  确认后退
    confirmBack: function() {
        app.goBack()
    },
    cancleBack: function() {
        this.setData({
            unfinshed: false
        })
    },
    closeMask: function (event) {
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false,
            unfinshed:false,
            showShareActive:false,

        })
    },
    handleBang: function() {
        let param = {
            cardType: 1,
            examUserId: this.data.examUserId,
            insureUid: wx.getStorageSync('insureUid'),
            subjectId: this.data.question[this.data.curIndex].id
        }
        app.httpPost('/xcx/insureMaster/examUseCard', param, function() {

        }, function(error) {
            console.log('error')
        })
    },
    calcTime: function() {
        var _this = this
        this.timeInterval = setInterval(function() {
            if (_this.data.countDownTime > 0) {
                _this.setData({
                    countDownTime: _this.data.countDownTime - 1
                })
            } else {// 时间结束 自动提交答案
                _this.setData({
                    answerEnd:true
                })
                _this.submitTest()
                clearInterval(_this.timeInterval)
            }
        }, 1000)
    },
    onHide: function() {
        clearInterval(this.data.interval)
        clearInterval(this.data.timeInterval)
    },
    onUnload: function() {
        clearInterval(this.data.interval)
        clearInterval(this.data.timeInterval)
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
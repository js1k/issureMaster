const app = getApp()
let util = require('../../utils/util.js')
Page({
    data: {
        isIpx: app.globalData.isIpx,
        statusBarHeight: app.globalData.statusBarHeight,
        curIndex: 0,    //当前答题序号
        removeIndex:-1,
        showMask:false,
        countDownTime: 60,
        unfinshed: false,
        interval: null,
        timeInterval: null,
        answerEnd:false,
        onTest:true,
        hiddenLoading:true,
        showShareActive:false,
        showPackets:false,
        showBangbang:false,
        showPaichu:false,
        upgrade:false,
        creatImg:true,
        canSubUse:true, // 是否可以使用卡片
        reviewQuestion:false,
        receivedChip:false,
        unfinshedBack:false,
        reviewIndex:0,
        reviewData:'',
        curReview:'',
        result:'',
        shareLevel:'',
        useParam: {
            cardType: 1,
            examUserId: '',
            insureUid: '',
            subjectId: ''
        },
        loadingText:'图片生成中...',
        question: '',
        bangbang: '../../asset/challengeHome/bangbang_icon.png',
        paichu: '../../asset/challengeHome/paichu_icon.png',
        bangbangDisable: '../../asset/challengeHome/bangbang_icon_disable.png',
        paichuDisable: '../../asset/challengeHome/paichu_icon_disable.png',
        chipA: '../../asset/hongbao/A.png',
        chipB: '../../asset/hongbao/B.png',
        chipC: '../../asset/hongbao/C.png',
        chipD: '../../asset/hongbao/D.png',
        
        gaoshouUp: '../../asset/challengeHome/gaoshou_pic.png',
        dashiUp: '../../asset/challengeHome/dashi_pic.png',
        zongshiUp: '../../asset/challengeHome/zongshi_pic.png',
        helpCard: '',
        removeCard: '',
        curQuestion: '',
        choseItem:-1,
        canSubmit:true,
        shareUserName:'',
        subParam:{
            answerList:[],
            examUserId: '',
            insureUid: '',
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

        challengeCoverImg: app.globalData.challengeCoverImg,
        shareQrImg: '',
        redPackets: app.globalData.redPackets,
        bgLight: app.globalData.bgLight
    },

    onShareAppMessage: function (options) {
        let insureUid = wx.getStorageSync('insureUid')
        let param = {
            title: '2019民生保险用户体验节~保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: app.globalData.wxShareImg,
            success: function () {

            }
        }
        let title = this.data.shareUserName + '达到Lv.' + this.data.shareLevel +''+ (this.data.shareLevel == 1 ? '达人' : this.data.shareLevel == 2 ? '高手' : this.data.shareLevel == 3 ? '大师' : '宗师') + '，参加保保大师挑战赛～一大波红包、积分等着你'
        if (options.from === 'button') {
            var dataid = options.target.dataset;
            param.title = title,
            param.path = '/pages/index/index?uid=' + insureUid + '&type=2&shareDay=' + util.getNow()
        }
        return { ...param }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this  
        let examUserId ='subParam.examUserId'
        let insureUid ='subParam.insureUid'
        let useParamExamUserId = 'useParam.examUserId'
        let useParamInsureUid = 'useParam.insureUid'
        let questionsList = wx.getStorageSync('question').subjectList
        let subjectIdList ='subParam.subjectIdList'
        let idList=[]
        if (questionsList && questionsList.length > 0) {
            for (let i = 0; i < questionsList.length; i++) {
                idList.push(questionsList[i].id)
            }
        }
        this.setData({
            question: questionsList,
            helpCard: wx.getStorageSync('helpCard') > 2 ? 2 : wx.getStorageSync('helpCard'),
            removeCard: wx.getStorageSync('removeCard') > 3 ? 3 : wx.getStorageSync('removeCard'),
            [examUserId]: wx.getStorageSync('examUserId'),
            [insureUid]: wx.getStorageSync('insureUid'),
            [useParamExamUserId]: wx.getStorageSync('examUserId'),
            [useParamInsureUid]: wx.getStorageSync('insureUid'),
            [subjectIdList]: idList
        })
        let timeout=setTimeout(function () {
            _this.calcTime()
            clearTimeout(timeout)
        }, 2300)
        this.setQuestion(_this.data.curIndex)
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
    // 分享图片
    handleShare: function () {
        let _this = this
        let winWidth = app.globalData.winWidth
        let winHeight = app.globalData.winHeight
        let canvasWidth = 0.7333 * winWidth
        let canvasHeight = canvasWidth / 0.72368
        this.setData({
            hiddenLoading: false
        })
        const ctx = wx.createCanvasContext('shareCanvas', this)
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.draw()
        //获取小程序二维码
        app.httpPost('/xcx/insureMaster/lookXcxQrCode', {
            insureUid: wx.getStorageSync('insureUid')
        }, function (data) {
            _this.setData({
                shareQrImg: data.xcxQrCode
            })
            wx.getImageInfo({
                src: _this.data.challengeCoverImg,
                success: (res1) => {
                    let url = res1.path
                    ctx.drawImage(res1.path, 0, 0, 0.733 * winWidth, 0.733 * winWidth / 0.9167)
                    wx.getImageInfo({
                        src: data.xcxQrCode,
                        success: (res2) => {
                            let qrImgSize = 70
                            ctx.drawImage(res2.path, 0.552 * winWidth, 0.552 * winWidth / 0.6635, 56, 56)
                            ctx.stroke()
                            ctx.draw(true)
                            ctx.setFontSize(14)
                            ctx.setFillStyle('#000')
                            ctx.fillText('我在答题赢大奖 不服来战', 0.0473 * winWidth, 0.0473 * winWidth / 0.0533)
                            ctx.draw(true)
                            ctx.setFontSize(12)
                            ctx.setFillStyle('#000')
                            ctx.fillText('保保大师答题挑战赛~', 0.0473 * winWidth, 0.0473 * winWidth / 0.0493)
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
        app.goBack()
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
        let queListA = 'queList['+0+'].question'
        let queListB = 'queList['+1+'].question'
        let queListC = 'queList['+2+'].question'
        this.setData({
            curQuestion: _this.data.question[num],
            [queListA]: _this.data.question[num].optionA,
            [queListB]: _this.data.question[num].optionB,
            [queListC]: _this.data.question[num].optionC,
            removeIndex:-1,
            canSubUse: true // 使用卡片后 切换到下一题之后恢复卡片可使用状态
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
        let answerList = 'subParam.answerList[' + this.data.subParam.answerList.length + ']'
        _this.setData({
            choseItem: serial == 'A' ? 0 : serial == 'B'?1:2,
            [answerList]: serial
        })
        let timeout=setTimeout(function () {
            _this.setQuestion(_this.data.curIndex+1)
            clearTimeout(timeout)
        },800)
    },
    reviewResult:function(){
        this.setData({
            reviewQuestion:true,
            answerEnd:false
        })
    },
    //  处理review question
    dealReview:function(){
        let _this=this
        this.setData({
            curReview: _this.data.reviewData[_this.data.reviewIndex]
        })
        let optionA = 'curReview.reviewList[0].option'
        let serialA = 'curReview.reviewList[0].serial'
        let optionB = 'curReview.reviewList[1].option'
        let serialB = 'curReview.reviewList[1].serial'
        let optionC = 'curReview.reviewList[2].option'
        let serialC = 'curReview.reviewList[2].serial'
        this.setData({
            [optionA]: _this.data.curReview.optionA,
            [optionB]: _this.data.curReview.optionB,
            [optionC]: _this.data.curReview.optionC,
            [serialA]: 'A',
            [serialB]: 'B',
            [serialC]: 'C',
        })
    },
    // 查看某题
    handleReview:function(e){
        let curReviewIndex=e.currentTarget.dataset.index
        this.setData({
            reviewIndex: curReviewIndex
        })
        this.dealReview()
    },
    //提交答案
    submitTest:function(){
        let _this = this
        if (!_this.data.canSubmit) {
            return
        }
        let answerList =this.data.subParam.answerList
        for(let i=0;i<5;i++){
            if (!answerList[i]){
                answerList[i]=''
            }
        }
        let subAnswerList ='subParam.answerList'
        clearInterval(_this.data.interval)
        _this.setData({
            canSubmit: false,
            countDownTime:0,
            [subAnswerList]: answerList
        })
        app.httpPost('/xcx/insureMaster/examHandIn', _this.data.subParam,function(data){
            if (_this.data.unfinshedBack){  // 如果在答题过程中强行退出  则提交答案后 再后退
                app.goBack()
            }
            _this.setData({
                canSubmit:true,
                answerEnd:true,
                onTest:false,
                result:data,
                shareLevel: data.userLevel,
                shareUserName: data.nickName,
                reviewData: data.subjectList
            })
            _this.dealReview()
            // 如果升级
            if (data.isUpgrade==1){
                _this.setData({
                    upgrade: true,
                    showMask: true
                })
            } else {
                // 如果有碎片或红包
                if (data.chip || data.isMergeChip == 1) {
                    let timeOut = setTimeout(function () {
                        _this.setData({
                            showPackets: true,
                            showMask: true,
                            receivedChip: true   //领取标志
                        })
                        clearTimeout(timeOut)
                    },1500)
                }
            }
        },function(error){
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 2000,
                mask: true
            })
        })
    },
    goBack: function () {
        if (this.data.onTest) {
            this.setData({
                showMask: true,
                unfinshed: true
            })
            return
        }
        app.goBack()
        // this.confirmBack()
    },
    //答题过程中后退  确认后退  自动提交答案
    confirmBack: function() {
        if (!this.data.result) {
            this.setData({
                unfinshedBack:true
            })
            this.submitTest()
        }
    },
    cancleBack: function() {
        this.setData({
            unfinshed: false
        })
    },
    closeMask: function (event) {
        let _this=this
        if (event.currentTarget.dataset.model === 'inner') {
            return
        }
        this.setData({
            showMask: false,
            unfinshed:false,
            showShareActive:false,
            showBangbang:false,
            showPaichu:false,
            showPackets:false,
            upgrade:false
        })
        let timeOut=setTimeout(function(){
            if (_this.data.receivedChip) {
                return
            }
            if (_this.data.result.chip || (_this.data.result.isMergeChip == 1)) {
                _this.setData({
                    showMask: true,
                    showPackets: true,
                    receivedChip: true   //领取了碎片或红包标志
                })
            }
            clearTimeout(timeOut)
        },500)
    },
    //  关闭查看答题
    closeAnswer:function(){
        this.setData({
            reviewQuestion:false,
            answerEnd:true
        })
    },
    //点击卡片
    useCard: function (e) {
        let canUse = e.currentTarget.dataset.canuse
        let type = e.currentTarget.dataset.type
        let cardType ='useParam.cardType'
        if (!canUse || !this.data.canSubUse) {
            return
        }
        if (type === 'bangbang') {
            this.setData({
                showMask: true,
                showBangbang: true,
                [cardType]:1
            })
        } else {
            this.setData({
                showMask: true,
                showPaichu: true,
                [cardType]: 2
            })
        }
    },
    // 使用卡片
    handleCard: function() {
        if (!this.data.canSubUse){
            return
        }
        let _this=this
        let cardType = this.data.useParam.cardType
        let subjectId ='useParam.subjectId'
        this.setData({
            [subjectId]: _this.data.question[_this.data.curIndex].id,
            canSubUse:false
        })

        let answerList = 'subParam.answerList[' + _this.data.subParam.answerList.length + ']'
        app.httpPost('/xcx/insureMaster/examUseCard', _this.data.useParam, function(data) {
            if (cardType == 1) {// 如果是使用了帮帮卡
                _this.setData({
                    choseItem: data.rightAnswer == 'A' ? 0 : data.rightAnswer == 'B' ? 1 : 2,
                    [answerList]: data.rightAnswer,
                    helpCard: _this.data.helpCard-1
                })
                let timeout = setTimeout(function () {
                    _this.setQuestion(_this.data.curIndex + 1)
                    clearTimeout(timeout)
                }, 800)
            } else {    //使用了排除卡
                _this.setData({
                    removeIndex: data.removeAnswer == 'A' ? 0 : data.removeAnswer == 'B' ? 1 : 2,
                    removeCard: _this.data.removeCard - 1
                })
            }
        }, function (error) {
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 1000,
                mask: true
            })
        })
    },
    //倒计时
    calcTime: function() {
        var _this = this
        this.setData({
            timeInterval: setInterval(function () {
                if (_this.data.countDownTime > 0) {
                    _this.setData({
                        countDownTime: _this.data.countDownTime - 1
                    })
                } else {// 时间结束 自动提交答案
                    if (!_this.data.result){
                        _this.submitTest()
                    }
                    clearInterval(_this.data.timeInterval)
                }
            }, 1000)
        })
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
})
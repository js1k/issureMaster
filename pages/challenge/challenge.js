// pages/challenge/challenge.js
const app = getApp()
Page({
    /**privilege-titleasdfasdf
     * 页面的初始数据
     */
    data: {
        curIndex: 0,    //当前答题序号
        countDown: 60,
        unfinshed: false,
        interval: null,
        timeInterval: null,
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
        subParam:{
            answerList:[],
            examUserId:'',
            insureUid:'',
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
        ]
    },

    onShareAppMessage: function() {
        return {
            title: '2019民生保险用户体验节~ \n保保大师答题挑战赛，精彩来战',
            path: '/pages/index/index',
            imageUrl: 'https://msbxgw.oss-cn-hzfinance.aliyuncs.com/upload/img/20190628/1561717521552.png',
            success: function() {}
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let _this = this  
        this.setQuestion(0)
        this.interval = setTimeout(function() {
            _this.calcTime()
        }, 2000)
        // this.getData()
    },
    //处理数据
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
    },
    //选择答案
    choseAnswer:function(e){
        let serial = e.currentTarget.dataset.serial
        let _this = this
        if (this.data.subParam.answerList.length==5){
            return
        }
        let idList = 'subParam.subjectIdList[' + this.data.subParam.subjectIdList.length + ']'
        let answerList = 'subParam.answerList[' + this.data.subParam.subjectIdList.length + ']'
        _this.setData({
            curIndex: _this.data.curIndex + 1,
            choseItem: serial == 'A' ? 0 : serial == 'B'?1:2,
            [idList]: _this.data.question[_this.data.curIndex].id,
            [answerList]: serial
        })
        console.log(this.data.subParam.answerList)
        this.setQuestion(_this.data.curIndex)
    },
    goBack: function() {
        if (this.data.countDown > 0) {
            this.setData({
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
    getData: function() {
        app.httpPost('/xcx/insureMaster/examStart', {
            insureUid: wx.getStorageSync('insureUid'),
            isUseEnergyCard: 0
        }, function(data) {
            console.log(data)
        }, function(error) {
            console.log('error')
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
            if (_this.data.countDown > 0) {
                _this.setData({
                    countDown: _this.data.countDown - 1
                })
            } else {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
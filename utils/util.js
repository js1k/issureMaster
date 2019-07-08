
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNow=()=>{
    let now=new Date()
    let year=now.getFullYear()
    let mounth=now.getMonth()
    let day=now.getDate()
    return year + '' + (mounth > 9 ? (mounth+1) : ('0' + (mounth+1))) + '' + (day > 9 ? day : ('0' + day))
}

const getNetWork=()=>{
    return new Promise((resolve,reject)=>{
        wx.getNetworkType({
            success: function(res) {
                resolve(res.networkType)
            },
        })
    })
}
const catchImg=(key,val)=>{
    wx.downloadFile({
        url: val,
        success: function (res1) {
            if (res1.statusCode === 200) {
                const fs = wx.getFileSystemManager()
                fs.saveFile({
                    tempFilePath: res1.tempFilePath,
                    success: function (res2) {
                        wx.setStorageSync(key, res2.savedFilePath)
                    }
                })
            }
        }
    })
}

module.exports = {
  formatTime: formatTime,
    getNow: getNow,
    getNetWork: getNetWork,
    catchImg: catchImg
}

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
    let day=now.getDay()
    return year + '' + (mounth > 9 ? mounth+1 : ('0' + (mounth+1))) + '' + (day > 9 ? day : ('0' + day))
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

module.exports = {
  formatTime: formatTime,
    getNow: getNow,
    getNetWork: getNetWork
}

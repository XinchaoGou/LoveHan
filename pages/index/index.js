//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dawn: false,
    daytime:true,
    dusk: false,
    night: false,
    bgcolor: "#b2b2b2"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
    if (this.data.dawn)
      this.setData({
        bgcolor: "-webkit-linear-gradient(top,rgba(133,149,165,1),rgba(188,204,220,1),rgba(234,206,202,1),rgba(246,182,180,1))"
      })
    else if (this.data.daytime)
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(255,255,255,1)),color-stop(50%,rgba(254,229,102,1)),color-stop(70%,rgba(243, 200, 95,1)),to(rgba(88, 106, 6,1)))"
      })
    else if (this.data.dusk)
      this.setData({
        bgcolor: time
      })
    else if (this.data.night)
      this.setData({
        bgcolor: time
      })
    else {
      this.setData({
        bgcolor: time
      })
    }
  }
})

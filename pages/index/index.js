//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dawn: false,
    daytime:false,
    dusk: false,
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
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(133,149,165,1)),color-stop(50%,rgba(188,204,220,1)),color-stop(70%,rgba(234,206,202,1)),to(rgba(246,182,180,1)))"
      })
    else if (this.data.daytime)
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(255,255,255,1)),color-stop(30%,rgba(141,180,198,0.8)),color-stop(40%,rgba(254,229,102,0.2)),to(rgba(140,156,9,1)))"
      })
    else if (this.data.dusk)
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(31,104,191,1)),color-stop(20%,rgba(31,104,191,0.8)),color-stop(40%,rgba(254,108,107,1)),color-stop(60%,rgba(254,238,190,1)),color-stop(75%,rgba(49,21,24,0.5)),to(rgba(49,21,24,1)))"
      })
    else 
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(15,48,94,1)),color-stop(50%,rgba(20,46,96,1)),color-stop(70%,rgba(8,26,66,1)),to(rgba(0,14,40,1)))"
      })
  }
})

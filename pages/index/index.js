//index.js
//获取应用实例
const app = getApp()
var Bmob = require("../../utils/bmob.js");

Page({
  data: {
    dawn: true,
    daytime:false,
    dusk: false,

    bgcolor: "#b2b2b2",

    loveWords: '',
    mGrow: 4,
    mMood: 25,
    mFood: 50,

  },


  onLoad: function () {
   var that = this;
   that.setBackImage();


  },

  //点击狗骨头
  dogBoneTap: function (){
    var that = this;
    if (that.data.loveWords == '') {
      console.log('啥都没有');
      return;
    }

    var LoveWords = Bmob.Object.extend("LoveWords");
    var words = new LoveWords();
    words.set("content",that.data.loveWords);
    //添加数据，第一个入口参数是null
    words.save(null, {
      success: function(result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          console.log("创建成功");
          var food = that.data.mFood;
          that.setData({
            mFood : food + 1
          })
      },
      error: function(result, error) {
        // 添加失败
        console.log('创建失败');

      }
    });

    //重置输入框
    that.setData({
      loveWords: ''
    })
  },

  //获取输入文字
  bindInput: function (e){
    var that = this;
    var value = e.detail.value;
    that.setData({
      loveWords: value
    })
  },
  
  //设置图片背景
  setBackImage: function () {
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
  },


})

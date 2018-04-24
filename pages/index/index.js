//index.js
//获取应用实例
const app = getApp()
var Bmob = require("../../utils/bmob.js");

Page({
  data: {
    dawn: false,
    daytime: false,
    dusk: true,

    bgcolor: "#b2b2b2",

    loveWords: '',
    mGrow: 0,
    mMood: 0,
    mFood: 0,

    dogSrc: '../../images/dog/happy/12.png',
    dogSentence: '哈喽，我是你的狗狗',

  },


  onLoad: function () {
    var that = this;
    that.getInfo();
    that.setBackImage('daytime');


  },

  getInfo: function () {
    var that = this;
    var Info = Bmob.Object.extend("Info");
    var query = new Bmob.Query(Info);
    query.first({
      success: function (object) {
        // 查询成功
        var grow = object.get('grow');
        var mood = object.get('mood');
        var food = object.get('food');
        that.setData({
          mGrow: grow,
          mMood: mood,
          mFood: food,
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  toCard: function () {
    console.log('跳转相册');
    wx.navigateTo({ url: '../cards/cards' })
  },


  //点击狗骨头
  dogBoneTap: function () {
    var that = this;
    if (that.data.loveWords == '') {
      console.log('啥都没有');
      return;
    }

    var LoveWords = Bmob.Object.extend("LoveWords");
    var words = new LoveWords();
    words.set("content", that.data.loveWords);
    //添加数据，第一个入口参数是null
    words.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建成功");
        var food = that.data.mFood;
        that.setData({
          mFood: food + 1
        })
        that.changeStatus();
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建失败');

      }
    });

    //重置输入框
    that.setData({
      loveWords: ''
    })
  },

  //点击狗狗TODO
  dogTap: function () {
    var that = this;
    that.changeStatus();
    var mood = that.data.mMood;
    that.setData({
      mMood: mood + 1
    })
  },

  changeStatus: function (){
    var that = this;
    var number = that.randomNum(0,14);
    that.setData({
      dogSrc: '../../images/dog/happy/' + number + '.png'
    })
  },

  //获取输入文字
  bindInput: function (e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      loveWords: value
    })
  },

  //设置图片背景
  setBackImage: function (time) {

    if (time == 'dawn')
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(133,149,165,1)),color-stop(50%,rgba(188,204,220,1)),color-stop(70%,rgba(234,206,202,1)),to(rgba(246,182,180,1)))"
      })
    else if (time == 'daytime')
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(255,255,255,1)),color-stop(30%,rgba(141,180,198,0.8)),color-stop(40%,rgba(254,229,102,0.2)),to(rgba(140,156,9,1)))"
      })
    else if (time == 'dusk')
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(31,104,191,1)),color-stop(30%,rgba(31,104,191,0.6)),color-stop(60%,rgba(254,108,107,1)),to(rgba(254,238,190,1)))"
      })
    else
      this.setData({
        bgcolor: "-webkit-gradient(linear,left top,right bottom,from(rgba(15,48,94,1)),color-stop(50%,rgba(20,46,96,1)),color-stop(70%,rgba(8,26,66,1)),to(rgba(0,14,40,1)))"
      })

  },

  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }


})

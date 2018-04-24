// pages/cards/cards.js

var app = getApp();
//锁定图片
var lock = 0;
// var allCount = 0;
var Bmob = require("../../utils/bmob.js");


//ALL:假数据,若加载到服务器数据,可将ALL掷为[],在onLoad函数中请求服务器数据赋给ALL;(ps:记得在所有数据后面附上两条假数据,如下ALL中倒数这两条数据,因为这两条数据用于处理层叠效果,若改变其id,在对应的函数处理判断位置应该修改其判断值)
//bug:ALL数据应为奇数条,不然会导致最后层叠效果无法消失
//animationData(动画),want_hidden(点击要,将要隐藏起来),nowant_hidden 初始化对应的数据
Page({
  data: {
    animationData: {},
    All: [],
  },

  /*
   * 加载图片
   */
  loadingPic: function () {
    var that = this;
    var cardArray = new Array();
    //查询条目数量
    var Cards = Bmob.Object.extend("Cards");
    var query = new Bmob.Query(Cards);
    // 查询所有数据
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var title = object.get('title');
          var id = object.get('picId');
          var cardUrl = object.get('imgUrl');
          // var content = object.get('content');
          // var isLock = object.get('isLock');

          var card = {
            id: id,
            title: title,
            cardUrl: cardUrl,
            // content : content,
            // isLock : isLock
          }
          cardArray.push(card);
        }

        // 从数组中取出2个用于加载
        // allCount = that.data.All.length;
        var temp = new Array();
        for (let i = 0; i < 2; i++) {
          var add = cardArray.shift();
          temp.push(add);
        }
        that.setData({
          All: cardArray,
          cardInfoList: temp,

          ballTop: 62,
          ballLeft: 76,
          ballTop2: 62,
          ballLeft2: 76,
          index1: 6,
          index2: 4,
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  onLoad: function () {
    var that = this;

    that.loadingPic();

    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        })

      }
    })
  },

  // 滑动第一张的移动事件
  //pageX,pageY,当前移动点位置
  //moveX,moveY用于锁定图片中点位置
  //ballLeft由于是rpx所以*2
  touchmove: function (event) {
    console.log('滑动第一张的移动事件touchmove');
    // console.log(event)
    let pageX = event.touches[0].pageX;
    let pageY = event.touches[0].pageY;
    // 需要移动的距离;
    let moveX = this.data.screenWidth * 0.8 * 0.5;
    let moveY = 350 * 0.5;
    // if (lock == 0) {
      this.setData({
        ballTop: event.touches[0].pageY - moveY,
        ballLeft: (event.touches[0].pageX - moveX) * 2,
      });
    // }
  },

  // 第一张移动结束处理动画
  touchend: function (event) {
    console.log('第一张移动结束处理动画touchend');
    // if (lock == 0) {
      if (event.currentTarget.offsetLeft < -110) {
        this.Animation(-500);
      } else if (event.currentTarget.offsetLeft > 180) {
        this.Animation(500);
      } else {
        this.AnimationN1(event.currentTarget.offsetLeft, event.currentTarget
          .offsetTop);
      }
    // }
  },

  // 第一张左滑动右滑动动画
  Animation: function (translateXX) {
    console.log('第一张左滑动右滑动动画  Animation');
    var that =this;

    // 动画
    var animation = wx.createAnimation({
      duration: 720,
      timingFunction: "ease",

    });
    that.animation = animation;
    that.animation.translateY(0).translateX(translateXX).step();
    that.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({ duration: 10 });

    that.setData({
      animationData: that.animation.export(),

    });

    //更新cardInfoList
    var card0 = that.data.cardInfoList[1];
    var tAll = that.data.All;
    var card1 = tAll.shift();

    var tempCard = new Array();
    tempCard.push(card0);
    tempCard.push(card1);



    setTimeout(function () {
      that.setData({
        All: tAll,
        cardInfoList: tempCard,

        ballTop: 62,
        ballLeft: 76,
        // index1: 4,
        // percent2: 100,
        // index2: 6,
      })
    }, 720);
    // setTimeout(function () {
    //   var cardInfoList = self.data.cardInfoList;
    //   if (self.data.All.length > 0) {
    //     var tempfromAll = self.data.All.shift();
    //     self.data.cardInfoList[0] = tempfromAll;
    //   }


    //   // console.log(self.data.cardInfoList[0].id);
    //   if (self.data.cardInfoList[0].id == allCount - 1) {
    //     if (allCount % 2 == 0) {
    //       lock = 1;
    //     }

    //   }



    //   // console.log(allCount)


    //   //TODO  当加载最后一条数据时划出后隐藏自己
    //   // if (self.data.cardInfoList[0].id == allCount) {

    //   //   wx.showToast({
    //   //     title: '已无更多',
    //   //     icon: 'success',
    //   //     duration: 2000
    //   //   })

    //   // }

    //   // self.setData({
    //   //   cardInfoList: self.data.cardInfoList,
    //   //   animationData: {},
    //   // });
    // }, 350);

  },

  // 第一张图片不需翻页动画
  AnimationN1: function (offsetX, offsetY) {
    console.log('第一张图片不需翻页动画  AnimationN1');
    // 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      // timingFunction: "ease",

    });
    var self = this;
    this.animation = animation;
    this.animation.translateX(offsetX).translateY(offsetY).rotate(0).step({ duration: 60 });
    this.animation.translateY(0).translateX(0).rotate(0).scale(1).step();

    this.setData({
      animationData: this.animation.export(),
      ballTop: 62,
      ballLeft: 76,
    });
  },

  // 加载数据
  //temp从ALL取出的数据
  //cardInfoList:temp;将ALL取出的数据放入以供显示
  //ballTop、ballLeft     第一张初始图片位置
  //ballTop2、ballLeft2   第二张初始图片位置
  //index1:6,index2:4,    两张图片初始的z-index


})





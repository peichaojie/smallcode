// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH: 0,
    showMask: true,//显示模版
    userInfo: {},//用户信息
    flag: true,//是否获取用户信息,显示授权页面
  },
  //点击登录按钮
  login() {
    this.setData({
      showMask: false
    })
  },
  //点击请授权按钮
  //获取用户信息
  getuserinfo(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          winH: result.windowHeight
        })
      },
    });
    //获取用户当前信息
    wx.getSetting({
      success:(res)=> {
        // console.log(res.authSetting)
        console.log(res.authSetting["scope.userInfo"])//为true时表示已获取用户信息
        //如果获取用户信息
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            lang:"zh_CN",
            success: (result)=> {
              console.log(result)
              var userInfo = result.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country;
              this.setData({
                userInfo:userInfo,
                flag:false
              })
            }
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
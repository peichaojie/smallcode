// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    winH:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success:(res)=>{
        that.setData({
          winH:(res.windowHeight-98),
        })
      }
    })
    // console.log(this.data.winH)
    this.pcj = this.selectComponent("#pcj")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pcj.gethandpickList();
    this.pcj.timerFn();
    this.pcj.setClickid();
    this.pcj.onehaomiao();
    this.pcj.getBookingList();
    
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
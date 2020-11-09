// pages/detail/detail.js
let {requestApi} = require('../../js/requretApi');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH:0,//可用高度
    info:{},//获取页面信息
    num:1,//第几张
    nums:0,//共计张图片
    comment:[],
    flag:true
  },
  changeIndex(e){
    // console.log(e.detail.current)
    this.setData({
      num:e.detail.current +1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取get传值
    let dis_id = options.dis_id;
    requestApi(`https://x.dscmall.cn//api/discover/find_detail`,{
      dis_id:dis_id
    }).then(res=>{
      this.setData({
        info:res.data.data,
        nums:res.data.data.goods_gallery.length
      })
    })
    requestApi("https://x.dscmall.cn//api/discover/find_reply_comment",{
      dis_id:dis_id,
      page:1,
      size:10
    },"get").then(res=>{
      console.log(res)
      this.setData({
        comment:res.data.data
      })
    })
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          winH:result.windowHeight
        })
      },
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
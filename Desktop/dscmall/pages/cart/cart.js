// pages/cart/cart.js
//
let { requestApi } = require('../../js/requretApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH: 0,//屏幕的高度
    goodsList: [],//商品信息列表
    selectall: true,//全选
    totalprice: 0,//总价
    totalnum: 0
  },
  //点击增加
  jiaFn(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    goodsList[index].detailNum += 1
    this.setData({
      goodsList: goodsList
    })
    this.total()
  },
  //点击减少
  jianFn(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    goodsList[index].detailNum -= 1
    if (goodsList[index].detailNum <= 1) {
      goodsList[index].detailNum = 1
    }
    this.setData({
      goodsList: goodsList
    })
    this.total()
  },
  //点击选择
  selectFn(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    goodsList[index].isSelect = !goodsList[index].isSelect;
    this.setData({
      goodsList: goodsList
    })
    //判断是否全部选中
    let selectall = goodsList.every((item, index) => {
      return item.isSelect == true
    })
    this.setData({
      selectall,
    })
    this.total()
  },
  //全选
  SelectAll() {
    let goodsList = this.data.goodsList;
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].isSelect = !goodsList[i].isSelect
    }
    this.setData({
      selectall: !this.data.selectall,
      goodsList,
    })
    this.total()
  },
  //计算总价及总数
  total() {
    let goodsList = this.data.goodsList;
    try {
      wx.setStorageSync('goods', goodsList)
    } catch (err) {
      console.log(err)
    }
    var total = 0;
    var totalnum = 0;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].isSelect) {
        total += goodsList[i].detailNum * goodsList[i].membership_card_discount_price;
        totalnum += goodsList[i].detailNum;
      }
    }
    this.setData({
      totalprice: total,
      totalnum: totalnum
    })
  },
  //删除
  dele(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    wx.showModal({
      title: '提示',
      content: '亲，您确定要删除这个商品么',
      success:(res)=> {
        if (res.confirm) {
          goodsList.splice(index, 1)
          this.setData({
            goodsList: goodsList
          })
          wx.setStorageSync('goods',goodsList);
          this.total()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          winH: result.windowHeight,//屏幕高度
        })
      },
    });
    let goodsList = wx.getStorageSync('goods')
    this.setData({
      goodsList: goodsList
    }, () => {
      this.total()
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
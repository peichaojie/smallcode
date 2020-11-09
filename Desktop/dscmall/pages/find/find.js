// pages/find/find.js
let { requestApi } = require("../../js/requretApi")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      id: 1,
      title: "社区"
    }, {
      id: 2,
      title: "店铺街"
    }, {
      id: 3,
      title: "视频"
    }],
    find_index: 0,
    winH: 0,
    flag: false,
    findList: [],
    page: 1
  },
  crolltolower() {
    if (this.data.flag) {
      let page = ++this.data.page;
      requestApi('https://x.dscmall.cn/api/discover/find_list', {
        size: 10,
        page: page
      }).then(res => {
        // console.log(res)
        if(res.data.data.length == 0){
          this.setData({
            flag:false
          })
          return
        }
        this.setData({
          findList: this.data.findList.concat(res.data.data),
          flag: true
        })
      })
    }

  },
  //跳转到详情页
  todetail(e){
    console.log(e)
    console.log(e.currentTarget.dataset.commentid)
    let dis_id = e.currentTarget.dataset.commentid;
    wx.navigateTo({
      url: `../detail/detail?dis_id=${dis_id}`,
    })
    // requestApi('')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winH: res.windowHeight - 64
        })
        // console.log(res.windowHeight)
        // console.log(res.screenHeight)
      }
    })
    requestApi('https://x.dscmall.cn/api/discover/find_list', {
      size: 10,
      page: 1
    }).then(res => {
      console.log(res)
      this.setData({
        findList: res.data.data,
        flag: true
      })
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
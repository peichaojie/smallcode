// pages/category/category.js
let { requestApi } = require("../../js/requretApi")
//请求数据
function request(url, cid = '', data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url + cid,
      data: {},
      method: "get",
      success: (res) => {
        // console.log(res)
        resolve(res.data.data)
      }
    })
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateH: 0,//页面高度
    cate_list: [],//左侧导航栏
    cateindex: 0,//导航栏下标
    cid: 858,//导航栏的cit_id
    cidList: [],//右侧详情
    adimgsrc: '',//广告的路径
    cate_y: 0
  },
  back() {
    wx.navigateBack()
  },

  //点击左侧修改data-index的Id
  cateIndex(e) {
    // console.log(e)
    this.setData({
      cateindex: e.currentTarget.dataset.index,
      cid: e.currentTarget.dataset.catid,
      adimgsrc: e.currentTarget.dataset.adimgsrc,
      cate_y: 0
    })
    // console.log(this.data.cid)
    requestApi(`https://x.dscmall.cn/api/catalog/list/${this.data.cid}`).then(res => {
      // console.log(res)
      this.setData({
        cidList: res.data.data,
      })
    })
  },
  //滚动到底部
  crolltolower(e) {
    // console.log(this.data.cate_list.length)
    if (this.data.cateindex < this.data.cate_list.length - 1) {
      this.setData({
        cateindex: ++this.data.cateindex
      })
      let cat_id = this.data.cate_list[this.data.cateindex].cat_id;
      request("https://x.dscmall.cn/api/catalog/list/", cat_id).then(res => {
        // console.log(res)
        this.setData({
          cidList: res,
          cate_y: 0
        })
      })

    }
  },//
  // 点击跳转至列表
  togoodslist(e) {
    // console.log(e.currentTarget.dataset.catid)
    let catid = e.currentTarget.dataset.catid;
    wx.navigateTo({
      url: `../gooddlist/gooddlist?catid=${catid}`,
    })


  },
  //滚动到顶部


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          cateH: res.windowHeight - 65
        })
      }
    });
    //请求左侧列表
    requestApi(`https://x.dscmall.cn/api/catalog/list`).then(res => {
      // console.log(res.data.data)
      this.setData({
        cate_list: res.data.data,
        cid: 858,
        adimgsrc: "https://x.dscmall.cn/storage/data/touch_catads/15630384831872.jpg"
      })
    });
    //请求右侧内容
    request("https://x.dscmall.cn/api/catalog/list/", this.data.cid).then(res => {
      // console.log(res)
      this.setData({
        cidList: res
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
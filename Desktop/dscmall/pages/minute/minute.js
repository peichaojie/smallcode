// pages/minute/minute.js
var WxParse = require('../../wxParse/wxParse.js');
let { requestApi } = require('../../js/requretApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['商品', '详情', '评论'],
    navIndex: 0,
    minuteData: {},//商品信息
    navH: 0,//导航栏高度
    winH: 0,//可用高度
    alpha: 0,//透明度
    scrH: 0,//屏幕高度
    addflag: false,//选择地址
    region: ['河南省', '郑州市', '中原区'],
    customItem: '全部',
    detailflag: false,//点击选择数量
    detailNum: 1,//选择的数量
    likeList: [],//猜你喜欢
    goId:'',//跳转到的id
    goodsid:0,//商品的id
  },
  //选择城市
  sendCity() {
    this.setData({
      addflag: true
    })
  },
  //修改城市
  bindRegionChange(e) {
    // console.log(e)
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value,
      addflag: false
    })
  },
  //减少数量
  jianNum() {
    let num = this.data.detailNum;
    num = --num
    if (num <= 1) {
      num = 1;
    }
    this.setData({
      detailNum: num
    })
  },
  //增加数量
  jiaNum() {
    let num = this.data.detailNum;
    num = ++num
    this.setData({
      detailNum: num
    })
  },
  //失去焦点
  monitor() {
    let reg = /^[1-9][0-9]*$/ig
    let num = this.data.detailNum;
    console.log(reg.test(num))
    if (!reg.test(num)) {
      num = 1
      this.setData({
        detailNum: num
      })
    }
  },
  // 关闭修改数量页面
  closed() {
    let animationobj = wx.createAnimation({
      delay: 0,
      duration: 300,
      timingFunction: 'linear'
    })
    animationobj.translateY(280).step()
    let animationData = animationobj.export()
    this.setData({
      animationData,
    })
    setTimeout(() => {
      this.setData({
        detailflag: false
      })
    }, 300)

  },
  //点击已选选择数量
  selectedFn() {
    let animationobj = wx.createAnimation({
      delay: 0,
      duration: 300,
      timingFunction: 'linear'
    })
    animationobj.translateY(218).step()
    let animationData = animationobj.export()

    setTimeout(() => {
      animationobj.translateY(0).step()
      let animationData = animationobj.export()
      this.setData({
        detailflag: true,
        animationData: animationData
      })
    })


    this.setData({
      detailflag: true,
      animationData: animationData
    })
  },
  // 页面滚动
  isScrollFn(e) {
    // e.detail.scrollTop;
    let alpha = e.detail.scrollTop / 200;
    for(let i = 0;i < this.data.nav.length; i++){
      if(e.detail.scrollTop < (this.data.topArr[i] - 64)+this.data.heightArr[i]){
        this.setData({
          navIndex:i
        })
        break;
      }
    }
    this.setData({
      alpha: alpha
    })

  },
  //点击nav跳转至当前页面
  transfor(e) {
    console.log(e)
    this.setData({
      goId:e.currentTarget.dataset.id,
      navIndex: e.currentTarget.dataset.index
    })
  },
  //返回上一页
  back() {
    wx.navigateBack()
  },
  //获取各个模块的距顶部高度及模块高度
  getmoduleFn() {
    let topArr = [];//距顶部高度
    let heightArr = [];//模块高度
    for (var i = 0; i < this.data.nav.length; i++) {
      let id = "#minute"+i;
      // console.log(id)
      const query = wx.createSelectorQuery()
      query.select(id).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        // console.log(res)
        var top = res[0].top;       // #the-id节点的上边界坐标
        var height = res[0].height // 显示区域的高度
        // console.log(top)
        // console.log(height)
        topArr.push(top)
        heightArr.push(height)
      })
    }
    this.setData({
      topArr:topArr,
      heightArr:heightArr
    })
  },
  addCart(){
    //  detailNum: 1,//选择的数量
    // goodsid:0,//商品的id
    let goods = this.data.minuteData;//设置变量等于该商品的信息
    goods.detailNum = this.data.detailNum;//该商品的数量等于选择的数量
    let goodsid = this.data.goodsid;//商品的id等于该商品的id
    goods.isSelect = true;//商品是否被选择，值为true
    let goodsData = wx.getStorageSync('goods') || [];//创建变量等于本地存储内容或者空数组
    //判断商品本地存储是否有产品
    if(goodsData.length > 0){
      //判断本地存储是否有本页产品
      let flag = goodsData.some((item,index)=>{
        return item.goods_id == goodsid
      })
      // console.log(flag)
      //有本页产品，商品数量增加
      if(flag){
        goodsData.forEach((item,index)=>{
          if(item.goods_id == goodsid){
            // console.log(item.goods_id)
            goodsData[index].detailNum += this.data.detailNum;
            wx.setStorageSync('goods',goodsData)
          }

        })
      }else{
        //没有本页产品，添加本页产品
        goodsData.unshift(goods)
      }
    }else{
      //本地存储产品为空时，直接在里面push该产品
      goodsData.push(goods)
    }
    //设置本地存储
    wx.setStorageSync('goods',goodsData)
    this.closed();

  },
  //跳转到购物车
  toCart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let goodsid = options.goodsid;
    this.setData({
      goodsid:goodsid
    })
    requestApi('https://x.dscmall.cn/api/goods/show', {
      goods_id: goodsid,
      warehouse_id: 0,
      area_id: 0,
      is_delete: 0,
      is_on_sale: 1,
      is_alone_sale: 1,
    }, 'post').then(res => {
      WxParse.wxParse('article', 'html', res.data.data.goods_desc, this);
      // console.log(res.data.data)
      this.setData({
        minuteData: res.data.data,
      })

    })
    //获取猜你喜欢
    requestApi('https://x.dscmall.cn/api/goods/goodsguess', {
      page: 1,
      size: 10
    }, "post").then(res => {
      // console.log(res.data.data)
      this.setData({
        likeList: res.data.data
      })
    })

    //状态栏高度
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          navH: (result.statusBarHeight + 44) * 2,
          winH: result.windowHeight,
          scrH: result.screenHeight
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(()=>{
      this.getmoduleFn()
    },2000)

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
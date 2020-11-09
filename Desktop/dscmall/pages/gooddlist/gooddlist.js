// pages/gooddlist/gooddlist.js
let { requestApi } = require('../../js/requretApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winH: 0,//可用高度
    goodsListData: [],//请求的信息
    page: 1,//页数
    flag: false,
    cat_id: 0,
    navIndex: 1,//导航栏默认
    synthesis: true,//综合箭头指向
    synthesisNumber: 0,//综合第几次点击
    price: true,//价格箭头指向
    priceNumber: 0,//价格第几次点击
    num:0,
    listStyle:true
  },
  //下滑事件
  scrolltolower() {
    let page = ++this.data.page;
    let cat_id = this.data.cat_id;
    // 判断在哪个nav栏加载的
    // 综合栏
    //url cat_id min max size page sort order 
    this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, page)
    this.setData({
      page: page
    })

    

  },
  //点击不同标签栏的数据
  changeNavIndex(e) {
    // console.log(e)
    let cat_id = this.data.cat_id;

    //通过自定义变量改变选中哪个标签
    this.setData({
      navIndex: e.currentTarget.dataset.navindex
    })
    // 判断点击的是哪个标签
    // 综合
    if (e.currentTarget.dataset.navindex == 1) {
      let num = this.data.num
      let synthesisNumber = this.data.synthesisNumber;
      // console.log(synthesisNumber)
      synthesisNumber += 1;
      num++
      this.setData({
        synthesisNumber: synthesisNumber,
        num:num
      })
      if (synthesisNumber > 1) {
        this.setData({
          synthesis: !this.data.synthesis,
        })
      }
      // console.log(num)
      console.log(synthesisNumber)
      if (synthesisNumber % 2 == 0) {
        this.data.goodsListData = []
        this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'goods_id', 'asc')
      } else if(synthesisNumber % 2 !== 0 ||  num>=2){
        this.data.goodsListData = []
        this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'goods_id', 'desc')
      }
      if(synthesisNumber == 1){
        this.setData({
          synthesis:true
        })
      }
      //恢复原值
      this.setData({
        price: true,
        priceNumber: 0
      })
    } else if (e.currentTarget.dataset.navindex == 2) {
      //恢复原值
      this.setData({
        price: true,
        priceNumber: 0,
        synthesis: true,
        synthesisNumber: 0,
        num:0
      })
      //新品
      this.data.goodsListData = []
      this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'last_update', 'desc')
      //恢复原值
      this.setData({
        price: true,
        priceNumber: 0,
        synthesis: true,
        synthesisNumber: 0,
        num:0
      })
    } else if (e.currentTarget.dataset.navindex == 3) {
      //销量
      this.data.goodsListData = []
      this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'sales_volume', 'desc')
      //恢复原值
      this.setData({
        price: true,
        priceNumber: 0,
        synthesis: true,
        synthesisNumber: 0,
        num:0
      })

    } else if (e.currentTarget.dataset.navindex == 4) {
      let num = this.data.num;
      //价格
      let priceNumber = this.data.priceNumber;
      // console.log(synthesisNumber)
      priceNumber += 1
      this.setData({
        priceNumber: priceNumber
      })
      if (priceNumber >= 1) {
        this.setData({
          price: !this.data.price,
        })
      }
      if (priceNumber % 2 == 0) {
        console.log(0)
        this.data.goodsListData = []
        this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'shop_price', 'asc')
      } else if(priceNumber % 2 !== 0 || num >= 2){
        this.data.goodsListData = []
        this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'shop_price', 'desc')
      }
      if(priceNumber == 1){
        this.setData({
          price:true
        })
      }
      //恢复原值
      this.setData({
        synthesis: true,
        synthesisNumber: 0
      })
    }
  },
  //修改样式
  changeList(){
    this.setData({
      listStyle:!this.data.listStyle
    })
  },
  //跳转到详情页
  tominute(e){
    // console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../minute/minute?goodsid='+goodsid,
    })
  },
  //请求数据 
  //url cat_id min max size page sort order 
  getdata(url, cat_id, min = '', max = '', size = 10, page = 1, sort = 'goods_id', order = 'desc') {
    requestApi(url, {
      cat_id: cat_id,
      min: min,
      max: max,
      size: size,
      page: page,
      sort: sort,
      order: order,
    }, "post").then(res => {
      // console.log(res)
      if (res.statusCode == 200) {
        if (res.data.data.length == 0) {
          this.setData({
            flag: false
          })
          return false
        }
        this.setData({
          goodsListData: this.data.goodsListData.concat(res.data.data),
          flag: true
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let cat_id = options.catid;
    this.setData({
      cat_id: cat_id
    })
    //获取数据
    //url cat_id min max size page sort order 
    this.getdata('https://x.dscmall.cn/api/catalog/goodslist', cat_id, '', '', 10, 1, 'goods_id', 'desc')

    //
    wx.getSystemInfo({
      success: (result) => {
        // console.log(result.windowHeight);
        this.setData({
          winH: result.windowHeight
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
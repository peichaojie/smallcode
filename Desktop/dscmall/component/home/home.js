// component/home/home.js
let { requestApi } = require("../../js/requretApi")
// console.log(requestApi)
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    winH: {
      type: Number,
      value: 300
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navlist: [{
      title: "首页",
      id: 1
    }, {
      title: "家用电器",
      id: 2
    }, {
      title: "男装女装",
      id: 3
    }, {
      title: "鞋靴箱包",
      id: 4
    }, {
      title: "手机数码",
      id: 5
    }, {
      title: "电脑办公",
      id: 6
    }, {
      title: "家居家纺",
      id: 7
    }, {
      title: "个人化妆",
      id: 8
    }],
    navIndex: 0,
    oleft: 0,
    currentIndex: 0,
    swiperimg: [{
      id: 1,
      imgsrc: "../../images/swiper1.jpg"
    }, {
      id: 2,
      imgsrc: "../../images/swiper2.jpg"
    }, {
      id: 3,
      imgsrc: "../../images/swiper3.jpg"
    }, {
      id: 4,
      imgsrc: "../../images/swiper4.jpg"
    }, {
      id: 5,
      imgsrc: "../../images/swiper5.jpg"
    }],
    currentad: 0,
    cid: 0,//url中的cid
    categoryList: {}, //对应cid的数据，
    goods: [{
      id: 1,
      list: [{
        id: 1001,
        imgsrc: "../../images/goods001.png",
        title: "潮流服饰"
      }]
    }, {
      id: 2,
      list: [{
        id: 2001,
        title: "家居装饰",
        imgsrc: "../../images/goods002.png"
      }]
    }, {
      id: 1,
      list: [{
        id: 3001,
        title: "限时秒杀",
        imgsrc: "../../images/goods003.png"
      }]
    }],
    hotList: ["服务店突破2000多家", "我们成为中国最大家电零售B2B2C系统", "三大国际腕表品牌签约"],
    handpickList: [],
    flag: false,
    page: 1,
    hh: 0,
    mm: 0,
    ss: 0,
    show: 1,
    clickid: 0,
    msdatalist: [],
    endtime: new Date('2020-10-31 10:00:00').getTime(),
    miaoshaList: [{
      id: 1,
      timer: "24:00",
      active1: "抢购中",
      active2: "即将开始"
    }, {
      id: 2,
      timer: "8:00",
      active1: "抢购中",
      active2: "即将开始"
    }, {
      id: 3,
      timer: "10:00",
      active1: "抢购中",
      active2: "即将开始"
    }, {
      id: 4,
      timer: "16:00",
      active1: "抢购中",
      active2: "即将开始"
    }],
    bookingList:[]

  },


  /**
   * 组件的方法列表
   */
  methods: {
    //点击导航栏
    changeItem(e) {
      this.setData({
        navIndex: e.currentTarget.dataset.index,
        currentIndex: e.currentTarget.dataset.index
      })
      if (this.data.navIndex >= 2 && this.data.navIndex <= 6) {
        this.setData({
          oleft: (this.data.navIndex - 2) * 160
        })
      }
      //请求封装方法
      // function getcategory(url,cid,){
      // }
      // let getcategory = (url,cid,categoryList)=>{
      //   let that = this;
      //   wx.request({
      //     success (res) {
      //       console.log(res.data.data)
      //       that.setData({
      //         categoryList:res.data.data
      //       })
      //     }        
      //   })
      // }
      //请求家用电器数据
      if (e.currentTarget.dataset.index == 1) {
        this.setData({
          cid: 858
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            // console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求男装女装数据
      if (e.currentTarget.dataset.index == 2) {
        this.setData({
          cid: 6
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            // console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求鞋靴箱包数据
      if (e.currentTarget.dataset.index == 3) {
        this.setData({
          cid: 8
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求手机数码数据
      if (e.currentTarget.dataset.index == 4) {
        this.setData({
          cid: 3
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求手机数码数据
      if (e.currentTarget.dataset.index == 5) {
        this.setData({
          cid: 4
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求家居家纺数据
      if (e.currentTarget.dataset.index == 6) {
        this.setData({
          cid: 5
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求个人化妆数据
      if (e.currentTarget.dataset.index == 7) {
        this.setData({
          cid: 860
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
    },
    //滑动内容
    swiperItem(e) {
      this.setData({
        currentIndex: e.detail.current,
        navIndex: e.detail.current,
      });
      if (e.detail.current >= 2 && e.detail.current <= 6) {
        this.setData({
          oleft: (e.detail.current - 2) * 160
        })
      }
      //请求家用电器数据
      if (e.detail.current == 1) {
        this.setData({
          cid: 858
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求男装女装数据
      if (e.detail.current == 2) {
        this.setData({
          cid: 6
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求鞋靴箱包数据
      if (e.detail.current == 3) {
        this.setData({
          cid: 8
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求手机数码数据
      if (e.detail.current == 4) {
        this.setData({
          cid: 3
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求手机数码数据
      if (e.detail.current == 5) {
        this.setData({
          cid: 4
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求家居家纺数据
      if (e.detail.current == 6) {
        this.setData({
          cid: 5
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
      //请求个人化妆数据
      if (e.detail.current == 7) {
        this.setData({
          cid: 860
        })
        let cid = this.data.cid;
        let that = this;
        wx.request({
          url: `https://x.dscmall.cn/api/visual/visual_second_category?cat_id=${cid}`,
          success(res) {
            console.log(res.data.data)
            that.setData({
              categoryList: res.data.data
            })
          }
        })
      }
    },
    //获取精选的数据
    gethandpickList() {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: 'https://x.dscmall.cn/api/goods/type_list',
        data: {
          page: this.data.page,
          size: 10,
          type: "is_best",
        },
        success: (res) => {
          if (res.statusCode == 200) {
            wx.hideLoading();
            if (res.data.data.length == 0) {
              this.setData({
                flag: false
              })
            }
            let list = this.data.handpickList.concat(res.data.data);
            let page = ++this.data.page;
            this.setData({
              handpickList: list,
              flag: true,
              page: page
            })
          }
        }
      })
    },
    //下拉
    loadMore() {
      // console.log(888888)
      if (this.data.flag) {
        this.gethandpickList();
      }
    },
    //秒杀时间
    mstime() {
      let now = new Date().getTime();
      // let objecttime = new Date("2020-10-29 24:00:00").getTime();
      let errand = (this.data.endtime - now) / 1000;
      let hh = parseInt(errand / 60 / 60 % 24);
      let mm = parseInt(errand / 60 % 60);
      let ss = parseInt(errand % 60);
      this.hh = hh >= 10 ? hh : "0" + hh;
      this.mm = mm >= 10 ? mm : "0" + mm;
      this.ss = ss >= 10 ? ss : "0" + ss;



      this.setData({
        hh: this.hh,
        mm: this.mm,
        ss: this.ss,
      });




    },

    timerFn() {
      let that = this;
      setInterval(() => {
        that.mstime()
      }, 1000);

    },
    setClickid() {
      let nowtimer = new Date().getHours();
      if (nowtimer < 8) {
        this.setData({
          show: 1,
          clickid: 0,
          // endtime: that.data.endtime + 28800000
        })
      } else if (nowtimer >= 8 && nowtimer < 10) {
        this.setData({
          show: 2,
          clickid: 1,
          // endtime: that.data.endtime + 7200000
        })
      } else if (nowtimer >= 10 && nowtimer < 16) {
        this.setData({
          show: 3,
          clickid: 2,
          // endtime: that.data.endtime + 21600000
        })
      } else if (nowtimer >= 16 && nowtimer < 24) {
        this.setData({
          show: 4,
          clickid: 3,
          // endtime: that.data.endtime + 28800000
        })
      }
      if (this.data.clickid == 0) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 28,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 1) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 15,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 2) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 16,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 3) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 27,
          tomorrow: 1
        }).then(res => {
          // console.log(res.data.data.seckill_list)
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      }
    },

    onehaomiao() {
      let that = this;
      let nowtimer = new Date().getHours();
      if (nowtimer < 8) {
        that.setData({
          endtime: that.data.endtime + 28800000
        })
      } else if (nowtimer >= 8 && nowtimer < 10) {
        that.setData({
          endtime: that.data.endtime + 7200000
        })
      } else if (nowtimer >= 10 && nowtimer < 16) {
        // console.log(1111);
        
        that.setData({
          endtime: that.data.endtime + 21600000
        })
      } else if (nowtimer >= 16 && nowtimer < 24) {
        that.setData({
          endtime: that.data.endtime + 28800000
        })
      }
      setInterval(() => {
        if (nowtimer < 8) {
          that.setData({
            show: 1,
            clickid: 0,
          })
        } else if (nowtimer >= 8 && nowtimer < 10) {
          that.setData({
            show: 2,
            clickid: 1,
          })
        } else if (nowtimer >= 10 && nowtimer < 16) {
          that.setData({
            show: 3,
            clickid: 2,
          })
        } else if (nowtimer >= 16 && nowtimer < 24) {
          that.setData({
            show: 4,
            clickid: 3,
          })
        }
      }, 1000);
    },
    changeClickid(e) {
      this.setData({
        clickid: e.currentTarget.dataset.index
      })
      if (this.data.clickid == 0) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 28,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 1) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 15,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 2) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 16,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      } else if (this.data.clickid == 3) {
        let that = this;
        requestApi("https://x.dscmall.cn/api/visual/visual_seckill", {
          id: 27,
          tomorrow: 1
        }).then(res => {
          that.setData({
            msdatalist: res.data.data.seckill_list
          })
        })
      }

    },
    skillmore(){
      wx.navigateTo({
        url: "../../pages/skill/skill",
      })
    },
    getBookingList(){
      requestApi("https://x.dscmall.cn/api/visual/visual_team_goods").then(res=>{
        // console.log(res);
        this.setData({
          bookingList:res.data.data
        })
      })
    }
  },

})

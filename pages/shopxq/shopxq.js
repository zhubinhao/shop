// pages/shopxq/shopxq.js
const serve = require('../../utils/serve.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    interval: 3000,
    duration: 1000,
    list: '',
    URLS: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let that =this;
    serve.get('/good/detail/'+id, { }, res => {
      console.log(res)
      that.setData({
        list: res,
        URLS: serve.URLS
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
  gou:function(){
    console.log(this.data.list)
    serve.post("/car/add", { gid: this.data.list.id, count:1},this,res=>{
      console.log(res)
      wx.showToast({
        title: '已加入购物车',
      })
    })
    
   
  },
  to:function(){
    wx.reLaunch({
      url: '../cart/cart',
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
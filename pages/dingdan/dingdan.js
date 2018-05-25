// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    true: true,
    istrue: false,
    datas: ['全部', '待付款', '待发货', '已发货', '已完成'],
    i: 1,
    h: '',
    dataJson: [[{ 'DD': 'E2017081611372737581054' }], [], [], [], []]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.i)
    let height;
    wx.getSystemInfo({
      success: function (res) {
        height = res.windowHeight - 30;
      }
    })
    this.setData({
      i: options.i,
      h: height + 'px'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    this.setData({
      istrue: true,

    })
  },
  toogle: function (e) {
    this.setData({
      i: e.currentTarget.dataset.i
    })
  },
  change: function (e) {
    this.setData({
      i: e.detail.current
    })
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
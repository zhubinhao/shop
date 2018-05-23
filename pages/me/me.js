Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    hedaimg: '',
    imgs: [{ 'img': '../../image/购物车.png', 'text': '待付款', 'i': 1 }, { 'img': '../../image/购物车.png', 'text': '代发货', 'i': 3 }, { 'img': '../../image/购物车.png', 'text': '已发货', 'i': 4 }, { 'img': '../../image/购物车.png', 'text': '已完成', 'i': 5 }]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: wx.getStorageSync('nickName'),
      hedaimg: wx.getStorageSync('avatarUrl'),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: '我的' })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  goto: function (e) {
    wx.navigateTo({
      url: '../dingdan/dingdan?i=' + e.currentTarget.dataset.i,
    })
  },
  next: function (e) {
    let urls = '../' + e.currentTarget.dataset.to + '/' + e.currentTarget.dataset.to;
    wx.navigateTo({
      url: urls,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


})
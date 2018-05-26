const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    hedaimg: '',
    imgs: [{ 'img': '../../image/购物车.png', 'text': '待付款', 'i': 1 }, { 'img': '../../image/购物车.png', 'text': '待发货', 'i':2 }, { 'img': '../../image/购物车.png', 'text': '已发货', 'i': 3 }, { 'img': '../../image/购物车.png', 'text': '已完成', 'i': 4 }]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              that.setData({
                name: JSON.parse(res.rawData).nickName,
                hedaimg: JSON.parse(res.rawData).avatarUrl,
              })


            }
          })
        }
      }
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
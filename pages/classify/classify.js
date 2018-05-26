// pages/classify/classify.js
const serve = require('../../utils/serve.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i:0,
    leftArr:'',
    son:'',
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    serve.get('/goodType/all', {}, res => {
      wx.hideLoading()
      console.log(res)
      that.setData({
        leftArr: res,
        son: res[0].son,
        img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      })
    })
  },
  click:function(r){

    this.setData({
      i: r.currentTarget.dataset.index,
      son: r.currentTarget.dataset.dat
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  to:function(){
    wx.navigateTo({
      url: '../classifyXq/classifyXq',
    })
  }
})
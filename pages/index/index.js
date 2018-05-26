//index.js
//获取应用实例
const app = getApp()
const serve = require('../../utils/serve.js')

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    interval: 3000,
    duration: 1000,
    list:[],
    URLS:''
  },
  onLoad: function () {
    let that =this;
    console.log(serve.URLS)
    serve.get('/good/hot',{page:1},res=>{
      console.log(res)
      that.setData({
        list: res.list,
        URLS: serve.URLS
      })
     
    })
   
  },
  to:function(r){
    console.log(r.currentTarget.dataset.to)
    wx.navigateTo({
      url: '../'+r.currentTarget.dataset.to+'/'+r.currentTarget.dataset.to,
    })
  }
})

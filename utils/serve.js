const URLS ='https://zlyblog.top'
const lod=(mes,obj)=> {
  let that = obj;
  that.setData({ istrue: true, tit: mes })
  setTimeout(function () {
    that.setData({ istrue: false, })
  }, 1500)
}
//                        post请求
const post = (URL, obj,that,callback)=>{
  wx.request({
    url: URLS+ URL,
    data: obj,
    method: "POST",  
    header: {
      'content-type': 'application/json',
      'cookie': wx.getStorageSync("cookies")
    },
    success: function (res) {
      return callback(res.data)
    }, 
    fail: function (res) {
      lod("请检查您的网络", that)            
      return callback()      
    },
  })
}
const get=(url,data,call)=>{
 
  wx.request({
    url: URLS+url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/json',
      'cookie': wx.getStorageSync("cookies")
    },
    success: function (res) {
      
     return call(res.data.result)
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
//                            图片上传
const chooseImage = (that, num, URL,names,formData,call)=>{
  wx.chooseImage({
    count: num, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var tempFilePaths = res.tempFilePaths[0];
      wx.showLoading({
        title: '',
      })
      wx.uploadFile({
        url: URL,
        filePath: tempFilePaths,
        name: names,
        formData: formData,
        success:function(res){
          wx.hideLoading()
          console.log(res)  
          return call(tempFilePaths);            
        },
        fail:function(res){
            wx.hideLoading()            
            lod("请检查您的网络",that);
            // return call(tempFilePaths);            
        }
      })
    }
  })
}
const showModal = (title, content,call)=>{
    wx.showModal({
      title: title,
      content: content,     
      success: function(res) {
        if (res.confirm){
          call(res.confirm)
        }
      },
    })
}
//                         网络变化
const Network = (call)=>{
  // 监听网络变化
  wx.onNetworkStatusChange(function (res) {
    call(res.networkType)
  })
  // 当前网络状态
   wx.getNetworkType({
      success: function (res) {
        call(res.networkType)
      }
    })
}
//                      打电话
const callPhone=(phone)=>{
  wx.makePhoneCall({
    phoneNumber: phone 
  })
}
//                    获取设备信息
const Info=(call)=>{
  wx.getSystemInfo({
    success: function (res) {
      // console.log(res.model)
      // console.log(res.pixelRatio)
      // console.log(res.windowWidth)
      // console.log(res.windowHeight)
      // console.log(res.language)
      // console.log(res.version)
      // console.log(res.platform)
      return call(res)
    }
  })
}

module.exports = {
  lod: lod,
  post: post,
  get:get,
  chooseImage: chooseImage,
  showModal: showModal,
  Network: Network,
  Info: Info,
  URLS: URLS
}
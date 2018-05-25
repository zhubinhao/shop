// pages/feed/feed.js
const serve = require('../../utils/serve.js')

Page({
  data: {
    num: 0,
    value: '',
    istrue: false,
    tit: '',
    imgs: [],
    ingsfalse: true,
    gz: false
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
    wx.setNavigationBarTitle({ title: '问题反馈', })
  },
  //     数字判断
  changeValue: function (e) {
    this.setData({
      num: e.detail.cursor,
      value: e.detail.value,
    })

  },
  //      提交
  submits: function () {
    let values = this.data.value;
    let IMG = this.data.imgs;
    let that = this;
    if (that.data.gz == true) {
      return;
    }
    if (values.length < 10) {
      serve.lod("请填写十个字以上的问题描述", that)

    } else {
      that.setData({ gz: true })
      serve.post('test.php', { value: values, img: IMG }, this, function (res) {
        that.setData({ gz: false })
        if (res == undefined) {
          return;
        }
        serve.lod("非常感谢您的反馈", that)
        console.log(res)
      })
    }

  },
  //添加图片
  addImg: function () {
    let that = this;
    serve.chooseImage(that, 1, 'https://example.weixin.qq.com/upload', 'photos', { 'user': 'text' }, (res) => {
      //  console.log(res)
      that.add(res, 'add')

    })
  },
  //    删除图片
  del: function (e) {
    this.add(e.target.dataset.img, 'delete')
  },
  add: function (tempFilePaths, type) {
    let imgArray = this.data.imgs;
    if (type == 'add') {
      imgArray.push(tempFilePaths)
      this.setData({
        imgs: imgArray
      })
    }
    if (type == 'delete') {
      imgArray.splice(tempFilePaths, 1);
      this.setData({
        imgs: imgArray
      })
    }
    if (this.data.imgs.length >= 3) {
      this.setData({
        ingsfalse: false
      })
    } else {
      this.setData({
        ingsfalse: true
      })
    }
  },
})
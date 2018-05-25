// pages/goods/goods.js
let server = require('../../utils/serve.js')
let citys = require('../../utils/citys.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [{ 'name': '噗噗噗', 'phone': '18270842', 'cont': '广东省,深圳市,福田区,沙头街道,泰然九路云松大厦6D' }],
    content: '',
    name: '',
    phone: '',
    years: [1, 11, 21, 31],
    cityData: [],
    provinces: [],
    citys: [],
    countys: [],
    val: [],
    xuan: '',
    sheng: "",
    shi: '',
    isfal: false,
    istrue: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    citys.init(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: '收货地址' })
    var cityData = this.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {

      provinces.push({ 'name': cityData[i].name, 'code': cityData[i].code });
    }
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push({ 'name': cityData[0].sub[i].name, 'code': cityData[0].sub[i].code })
    }
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push({ 'name': cityData[0].sub[0].sub[i].name, 'code': cityData[0].sub[0].sub[i].code })
    }
    this.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      val: [provinces[0].name, citys[0].name, countys[0].name]
    })


  },
  radioChange: function (e) {
    console.log(e.detail.value)
  },
  goodchuli: function (e) {
    let num = e.target.dataset.num;
    let Type = e.target.dataset.type;
    let addressArr = [];
    let that = this;
    if (Type == 'B') {
      console.log(this.data.address[num].cont.split(','))
      console.log(this.data.address[num].cont)

      this.setData({
        istrue: true,
        name: this.data.address[num].name,
        phone: this.data.address[num].phone,
        content: this.data.address[num].cont,
        sheng: this.data.address[num].cont.split(',')[0],
        shi: this.data.address[num].cont.split(',')[1],
        xuan: this.data.address[num].cont.split(',')[2]

      })



    } else {
      server.showModal('', '删除改地址？', () => {
        addressArr = that.data.address
        addressArr.splice(num, 1)
        that.setData({
          address: addressArr
        })
      })

    }

  },
  choose: function () {


    this.setData({
      istrue: true,
      name: '',
      phone: '',
      content: '',
      sheng: '',
      shi: '',
      xuan: ''

    })
  },
  xx: function () {
    this.setData({
      istrue: false
    })
  },
  input: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        name: e.detail.value
      })
    }
    if (e.target.id == 'phone') {
      this.setData({
        phone: e.detail.value
      })
    }
    if (e.target.id == 'content') {
      this.setData({
        content: e.detail.value
      })
    }
  },
  submits: function () {
    console.log(this.data.name)
    console.log(this.data.phone)
    console.log(this.data.content)
    console.log(this.data.sheng)
    console.log(this.data.shi)
    console.log(this.data.xuan)


  },
  a: function (e) {
    let a = e.detail.value[0];
    let b = e.detail.value[1];
    let c = e.detail.value[2];
    let cityData = this.data.cityData;
    let shi, xuan;
    for (let i = 0; i < cityData.length; i++) {
      if (cityData[i].code == this.data.provinces[a].code) {
        shi = cityData[i];
      }
    }
    console.log(shi.sub[b].code)
    console.log(shi.sub)
    for (let i = 0; i < shi.sub.length; i++) {
      if (shi.sub[i].code == shi.sub[b].code) {
        xuan = shi.sub[i].sub
      }
    }
    this.setData({
      'citys': shi.sub,
      'countys': xuan,
    })
    let val = [this.data.provinces[a].name, this.data.citys[b].name, this.data.countys[c].name]
    this.setData({
      'val': val,
    })
  },
  queding: function () {
    console.log(this.data.val)
    this.setData({
      xuan: this.data.val[2],
      sheng: this.data.val[0],
      shi: this.data.val[1]
    })
    this.setData({
      isfal: false
    })
  },
  xuanzhe: function () {
    this.setData({
      isfal: true
    })
  },
  quxiao: function () {
    this.setData({
      isfal: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
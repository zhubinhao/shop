// pages/goods/goods.js
let server = require('../../utils/serve.js')
let citys = require('../../utils/citys.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
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
    title:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    citys.init(this)
    let that=this;
    server.get('/address/all',{},res=>{
      console.log(res)
      that.setData({
        address:res
      })
      
    })
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
    let i = e.detail.value;
    console.log(this.data.address[i].id)
    server.post('/address/updateMain/' + this.data.address[i].id,{},this,res=>{
   console.log(res)
    })
  },
  goodchuli: function (e) {
    let num = e.target.dataset.num;
    let Type = e.target.dataset.type;
    let addressArr = [];
    let that = this;
    if (Type == 'B') {
      console.log(this.data.address[num].detail.split(','))
      console.log(this.data.address[num].detail)
      this.setData({
        istrue: true,
        name: this.data.address[num].name,
        phone: this.data.address[num].phone,
        content: this.data.address[num].detail.split(',')[3],
        sheng: this.data.address[num].detail.split(',')[0],
        shi: this.data.address[num].detail.split(',')[1],
        xuan: this.data.address[num].detail.split(',')[2],
        title:'修改收货地址',
        id: this.data.address[num].id

      })



    } else {
      server.showModal('', '删除改地址？', () => {
        addressArr = that.data.address;
        console.log(addressArr[num].id)
        server.post("/address/delete", [addressArr[num].id],this,res=>{
          console.log(res)
        })
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
      xuan: '',
      title:"添加收货地址"

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
  //新增
  submits: function () {
    console.log(this.data.name)
    console.log(this.data.phone)
    console.log(this.data.content)
    console.log(this.data.sheng)
    console.log(this.data.shi)
    console.log(this.data.xuan)
    if (this.data.name.replace(/(^\s*)|(\s*$)/g, "")==""){
       wx.showModal({
         title: '',
         content: '收件人不能为空',
         showCancel: false,
       })
       return;
    }
    if (this.data.phone.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showModal({
        title: '',
        content: '电话号码不能为空',
        showCancel: false,
      })
      return;
      
    }
    if (this.data.sheng.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showModal({
        title: '',
        content: '请填写收货省份',
        showCancel: false,
      })
      return;
      
    }
    if (this.data.shi.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showModal({
        title: '',
        content: '请填写收货城市',
        showCancel:false,
      })
      return;
      
    }
    if (this.data.xuan.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showModal({
        title: '',
        content: '请填写收货地区',
        showCancel: false,
      })
      return;
      
    }
    if (this.data.content.replace(/(^\s*)|(\s*$)/g, "") == "") {
      wx.showModal({
        title: '',
        content: '请填写收货详细地址',
        showCancel: false,
      })
    }

    let that = this;
    let dat = this.data.sheng + "," + this.data.shi + "," + this.data.xuan + "," +this.data.content
    console.log(dat)
    var obj={
      phone: this.data.phone,
      name: this.data.name,
      detail: dat,
      area: this.data.sheng,
      note: this.data.sheng,
    }
    that.xx()
    if (this.data.title =='添加收货地址'){
      server.post('/address/add', obj, this, res => {
        console.log(res)
        that.onLoad()
      })
    }else{
      obj.id = this.data.id
      server.post('/address/update', obj, this, res => {
        console.log(res)
        that.onLoad()
      })
    }
    

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

})
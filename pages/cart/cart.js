// pages/cart/cart.js
const serve = require('../../utils/serve.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    URLS:'',
    list:'',
    checked:false,
    pice:0,
    startX:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    serve.get('/car/all', { }, res => {
      console.log(res.shops)
      that.setData({
        list: res.shops,
        URLS: serve.URLS
      })
      that.changePice()
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
    this.onLoad()
  },
  subtract:function(r){
    let i = r.currentTarget.dataset.i
    let da = this.data.list;
    // console.log(da[i].count)
    if (da[i].count=="1"){
      return;
    }
    da[i].count--;
    this.minus(da, false)
    this.changePice()
    this.gen()
    
    
  },
  add: function (r) {
    let i = r.currentTarget.dataset.i
    let da = this.data.list;
    da[i].count++;
    this.changePice()
    this.minus(da,false)
    this.gen()
  },
  minus: function (da,checked){
    this.setData({
      list: da,
      checked: checked
      
    })

  },
  check:function(r){
    let i = r.currentTarget.dataset.i
    let da = this.data.list;
    if (da[i].select==true){
      da[i].select = false;
    }else{
      da[i].select = true;    
    }
    this.minus(da,false)
    this.changePice()
  },
  allcheck:function(){
    let checkeds = !this.data.checked
    let da = this.data.list;
    da.forEach(r=>{
      
      r.select = checkeds;
      
    })
    this.minus(da, checkeds);
    this.changePice()
  },
  changePice:function(){
    let da = this.data.list;
    let p = 0;
    da.forEach(r => {
      if (r.select){
        p += r.count * r.good.price
      }
 
    })
    this.setData({
      pice:p
    })
  },
  to:function(r){
    wx.navigateTo({
      url: '../shopxq/shopxq?id=' + r.currentTarget.dataset.gid,
    })
  },


  touchS:function(r){
    console.log(r.touches.length)
    this.setData({
      //记录触摸起始位置的X坐标
      startX: r.touches[0].clientX
    });
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
        let n= this.data.startX - moveX;
        let txtStyle;
        console.log(n)
        if(n>0){
          txtStyle = 'left:-' + n + 'px';
        }
        // console.log(txtStyle)
        let i = e.currentTarget.dataset.index;
        let da = this.data.list;
        da.forEach(r => {
          r.txtStyle = 'left:0px'
        })
        da[i].txtStyle = txtStyle;
        console.log(this.data.list[i].txtStyle)
        that.setData({
          list:da
        })
      }
    
  },
  touchE: function (e) {
    var that = this;
    let i = e.currentTarget.dataset.index;
    let da = this.data.list;
    if (e.changedTouches.length == 1) {
      //记录触摸点位置的X坐标
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let n = this.data.startX - endX;
      console.log(n )
      let txtStyle;
      if(n!=0){

        if (n>=30){
          txtStyle = 'left:-100px';

        }else{
          txtStyle = 'left:0px';
          
        }
        da[i].txtStyle = txtStyle;
        console.log(this.data.list[i].txtStyle)
        that.setData({
          list: da
        })
      }           
    }
    
    },
  dele:function(r){
    let i = r.currentTarget.dataset.i
    let da = this.data.list;
    let that =this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success:res=>{
        if (res.confirm) {
          da.splice(i,1)
          that.setData({
            list: da
          })
          that.gen()
        } 
      }
    })
  },
  gen:function(){
    let da = this.data.list;
    let data=[];
    da.forEach(r => {
      var obj={};
      obj.count=r.count;
      obj.gid = r.gid;
      obj.checked = r.checked;
      data.push(obj)
    })
    console.log(data)
    serve.post('/car/update', data,this,res=>{
      console.log(res)
      this.onLoad()
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
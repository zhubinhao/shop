// pages/classifyXq/classifyXq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns:{
      1:['100以内','100-500','500-1000','1000-3000','3000以上'],
      2:['从多到少','从少到多'],
      3: ['从新到旧', '从旧到新','智能排序'],
    },
    dat:'',
    i:'',
    act:{1:-1,2:-1,3:-1},
    istrue:false,
    iaAct:''
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  click:function(r){
    let i = r.currentTarget.dataset.to;
    if(this.data.i==i){ 
      if (this.data.istrue==false){

      }else{
        this.setData({
          istrue: false
        })
        return;
      }          
    }
    this.setData({
      dat: this.data.btns[i],
      iaAct: this.data.act[i],
      i:i,
      istrue: true   
    })
  },
  shuai:function(r){
    let i=this.data.i;
    let num = r.currentTarget.dataset.num;
    let act = this.data.act;
    act[i] = num;
    console.log(act)
    this.setData({
      act: act,
      istrue: false
    })
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
})
// pages/component/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerData: {
      type: Array,
      value: [],
    },
    innerUrl:{
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    to:function(r){
      console.log(r.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../shopxq/shopxq?id=' + r.currentTarget.dataset.id,
      })
    }
  }
})
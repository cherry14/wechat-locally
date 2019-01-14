const fetch = require('../../utils/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:{},//当前全部分类
    shops:[]//分类下的全部店铺
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res=>{
      this.setData({categories:res.data})
      wx.setNavigationBarTitle({title:res.data.name})
       //加载完商铺信息过后再去加载分类信息
      return fetch(`categories/${options.cat}/shops`,{_page:1,limit:10})
    })
    .then(res=>{
      console.log(res.data)
      this.setData({ shops: res.data })
    })
     


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.categories.name){
      wx.setNavigationBarTitle({ title:this.data.categories.name})
    }
   
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
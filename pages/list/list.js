const fetch = require('../../utils/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:{},//当前全部分类
    shops:[],//分类下的全部店铺
    pageindex:0,
    pageSize:20,
    totalCount:0,
    hasmore:true


  },
  //自定义加载更多函数
  loadmore(){
    let { pageindex,pageSize,searchText }=this.data
    const params = { _page: ++pageindex, limit: pageSize }
    if (searchText) params.q=searchText
    fetch(`categories/${this.data.categories.id}/shops`, params).then(res => {
      const totalCount = parseInt(res.header['X-Total-Count'])
      const hasmore=this.data.pageindex*this.data.pageSize<totalCount
      const shops=this.data.shops.concat(res.data)
      this.setData({ shops,pageindex,totalCount,hasmore })
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch(`categories/${options.cat}`).then(res=>{
      this.setData({categories:res.data})
      wx.setNavigationBarTitle({title:res.data.name})
       //加载完商铺信息过后再去加载分类信息
      this.loadmore()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("shangla")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //  console.log("到底了")
    this.loadmore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
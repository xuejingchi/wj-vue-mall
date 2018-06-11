import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    purchaseList: 0, // 购物清单数量
  },
  mutations: {
    // 添加购物清单成功时
    addPurchaseList(state, num) {
      state.purchaseList = num
    },
    // 删除购物清单成功时
    removePurchaseList(state, num) {
      state.purchaseList = num
    }
  },
  // actions: {
  //   // 搜索商品列表
  //   searchGoodsList(context, query) {
  //     return funSets.search(query)
  //   }
  // }
})

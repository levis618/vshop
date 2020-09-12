import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  CLEAR_USERINFO,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  IMCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  REC_SEARCH_SHOPS,
} from './mutation-types.js'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
  reqLoginOut,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings,
  reqSearchShops,
} from '../api'

export default {
  async getAddress({ commit, state }) {
    const { latitude, longitude } = state
    const geohash = latitude + ',' + longitude
    const { code, data } = await reqAddress(geohash)
    if (!code) {
      const address = data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getCategorys({ commit }) {
    const result = await reqCategorys()
    if (!result.code) {
      commit(RECEIVE_CATEGORYS, { categorys: result.data })
    }
  },
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops(latitude, longitude)
    if (!result.code) {
      commit(RECEIVE_SHOPS, { shops: result.data })
    }
  },
  login({ commit }, userInfo) {
    commit(RECEIVE_USERINFO, { userInfo })
  },
  async autoLogin({ commit }) {
    const { code, data } = await reqAutoLogin()
    if (!code) {
      commit(RECEIVE_USERINFO, { userInfo: data })
    }
  },
  async loginOut({ commit }) {
    const { code } = await reqLoginOut()
    if (!code) {
      commit(CLEAR_USERINFO)
    }
  },
  async recShopInfo({ commit }) {
    const { code, data } = await reqShopInfo()
    if (!code) {
      commit(RECEIVE_SHOPINFO, { shopInfo: data })
    }
  },
  async recShopGoods({ commit }) {
    const { code, data } = await reqShopGoods()
    if (!code) {
      commit(RECEIVE_SHOPGOODS, { shopGoods: data })
    }
  },
  async recShopRatings({ commit }) {
    const { code, data } = await reqShopRatings()
    if (!code) {
      commit(RECEIVE_SHOPRATINGS, { shopRatings: data })
    }
  },
  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(IMCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  async actSearchShops({ commit, state }, { keyword }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShops(geohash, keyword)
    console.log(result)
    // if (!code) {
    //   commit(REC_SEARCH_SHOPS, { searchShops: data })
    // }
  },
}

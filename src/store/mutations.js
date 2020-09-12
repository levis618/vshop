import Vue from 'vue'
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
export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, { shops }) {
    // state.shops = [shops]
    state.shops = [...state.shops, ...shops]
  },
  [RECEIVE_USERINFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  [CLEAR_USERINFO](state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOPINFO](state, { shopInfo }) {
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOPGOODS](state, { shopGoods }) {
    state.shopGoods = shopGoods
  },
  [RECEIVE_SHOPRATINGS](state, { shopRatings }) {
    state.shopRatings = shopRatings
  },
  [IMCREMENT_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count++
    } else {
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }
  },
  [DECREMENT_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count--
      if (!food.count) {
        const index = state.cartFoods.indexOf(food)
        state.cartFoods.splice(index, 1)
      }
    }
  },
  [CLEAR_CART](state) {
    state.cartFoods.forEach((food) => {
      food.count = 0
    })
    state.cartFoods = []
  },
  [REC_SEARCH_SHOPS](state, { searchShops }) {
    state.searchShops = searchShops
  },
}

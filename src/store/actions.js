import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types.js'
import { reqAddress, reqCategorys, reqShops } from '../api'

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
}

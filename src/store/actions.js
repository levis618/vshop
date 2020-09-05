import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USERINFO, CLEAR_USERINFO } from './mutation-types.js'
import { reqAddress, reqCategorys, reqShops, reqAutoLogin, reqLoginOut } from '../api'

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
    console.log(code)
    if (!code) {
      commit(CLEAR_USERINFO)
    }
  },
}

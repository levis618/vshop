import ajax from './ajax'
const BASE_URL = '/api'
// const BASE_URL = ''

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax.get(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqCategorys = () => ajax.get(`${BASE_URL}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) =>
  ajax.get(`${BASE_URL}/shops`, { params: { latitude, longitude } })
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) =>
  ajax.get(`${BASE_URL}/search_shops`, { params: { geohash, keyword } })
// 6、用户名密码登陆
export const reqLoginPwd = (name, pwd, captcha) =>
  ajax.post(`${BASE_URL}/login_pwd`, { name, pwd, captcha })
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax.get(`${BASE_URL}/sendcode`, { params: { phone } })
// 8、手机号验证码登陆
export const reqLoginSms = (phone, code) => ajax.post(`${BASE_URL}/login_sms`, { phone, code })
// 9、根据会话获取用户信息
export const reqAutoLogin = () => ajax.get(`${BASE_URL}/userinfo`)
// 10、用户登出
export const reqLoginOut = () => ajax.get(`${BASE_URL}/logout`)

// 获取商家商品信息
export const reqShopGoods = () => ajax.get(`${BASE_URL}/goods`)
// 获取商家评价信息
export const reqShopRatings = () => ajax.get(`${BASE_URL}/ratings`)
// 获取商家信息
export const reqShopInfo = () => ajax.get(`${BASE_URL}/info`)
// // 获取商家商品信息
// export const reqShopGoods = () => ajax.get('/goods')
// // 获取商家评价信息
// export const reqShopRatings = () => ajax.get('/ratings')
// // 获取商家信息
// export const reqShopInfo = () => ajax.get('/info')

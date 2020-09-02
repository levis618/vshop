import ajax from './ajax'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax.get(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqCategorys = () => ajax.get(`${BASE_URL}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax.get(`${BASE_URL}/shops`, { params: { latitude, longitude } })

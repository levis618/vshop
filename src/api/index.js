import ajax from './ajax'
const BASE_URL = '/api'

export const reqCategory = () => ajax.get(`${BASE_URL}/index_category`)

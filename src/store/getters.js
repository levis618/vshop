export default {
  // 购物车商品数量
  totalCount(state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  // 购物商品总价格
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
}

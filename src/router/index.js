import Vue from 'vue'
import VueRouter from 'vue-router'
// import MSite from '../views/MSite/MSite.vue'
// import Search from '../views/Search/Search.vue'
// import Order from '../views/Order/Order.vue'
// import Profile from '../views/Profile/Profile.vue'

const MSite = () => import(/* webpackChunkName: "MSite" */ '../views/MSite/MSite.vue')
const Search = () => import(/* webpackChunkName: "Search" */ '../views/Search/Search.vue')
const Order = () => import(/* webpackChunkName: "Order" */ '../views/Order/Order.vue')
const Profile = () => import(/* webpackChunkName: "Profile" */ '../views/Profile/Profile.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')

import Shop from '../views/Shop/Shop.vue'
import ShopGoods from '../views/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../views/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'MSite',
    component: MSite,
    meta: {
      hasFoot: true,
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      hasFoot: true,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      hasFoot: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      hasFoot: true,
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/shop/:id',
    component: Shop,
    props: (route) => ({ id: route.params.id }),
    // props: true, // 将所有params参数转换成标签属性传递给子路由组件
    children: [
      {
        path: 'goods',
        component: ShopGoods,
      },
      {
        path: 'ratings',
        component: ShopRatings,
      },
      {
        path: 'info',
        component: ShopInfo,
      },
      {
        path: '',
        redirect: 'goods',
      },
    ],
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

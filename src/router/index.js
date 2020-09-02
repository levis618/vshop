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
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods/:id',
        component: ShopGoods,
      },
      {
        path: '/shop/ratings',
        component: ShopRatings,
      },
      {
        path: '/shop/info',
        component: ShopInfo,
      },
      {
        path: '',
        redirect: '/shop/goods',
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

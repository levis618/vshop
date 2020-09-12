import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './validate.js'

// 在main.js中设置
import fastClick from 'fastclick'
fastClick.attach(document.body)

// mock数据
// import './mock/mockServer'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

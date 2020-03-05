import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import Layout from './layout/Layout'
import store from './store'
// import { getAuth } from '@/utils/cookies.js'

Vue.use(Element)
Vue.config.productionTip = false
// const routerWhiteList = ['/login', '/register'];

// router.beforeEach((to, from, next) => {
//   // 记录路由，登录后从哪来让他到哪去
//   window.sessionStorage.formQuery = from.path
//   if (routerWhiteList.indexOf(to.path) === -1) {
//     // 判断用户是否登录
//     if (getAuth()) {
//       next();
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   }else{
//     next();
//   }
// });

new Vue({
  render: h => h(Layout),
  router,
  store,
  components: { Layout },
  template: '<Layout/>'
}).$mount('#app')

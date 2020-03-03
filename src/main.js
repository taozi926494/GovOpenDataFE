import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import Layout from './layout/Layout'
import store from './store'
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(Layout),
  router,
  store,
  components: { Layout },
  template: '<Layout/>'
}).$mount('#app')

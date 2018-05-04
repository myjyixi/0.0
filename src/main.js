// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import { sync } from 'vuex-router-sync'
import App from './App'
import store from './vuex/store'
import router from './router'
import tableList from 'components/list/tableList'

import ElementUI from 'element-ui'
// 引入ElementUI css
// import '../theme/index.css'
sync(store, router)

// 注册组件
Vue.component('tableList', tableList)

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

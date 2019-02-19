/* eslint-disable vue/no-parsing-error */
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import filter from './extend/filter'
// import 'normalize.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(filter)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

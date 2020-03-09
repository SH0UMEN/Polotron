import Vue from 'vue'
import axios from 'axios'
import VModal from 'vue-js-modal'
import VueZoomer from 'vue-zoomer'


Vue.use(VueZoomer)
Vue.use(VModal)

import App from './App'
import router from './router'
import store from './store'

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

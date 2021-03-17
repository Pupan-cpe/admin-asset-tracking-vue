import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios'
import VueAxios from 'vue-axios'

import { DatePicker } from 'ant-design-vue';
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueAxios, axios)
Vue.use(DatePicker);
Vue.use(Toast);
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})



Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App), store
}).$mount('#app')

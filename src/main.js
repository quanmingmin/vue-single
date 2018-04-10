// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { AlertPlugin, ToastPlugin ,ConfirmPlugin } from 'vux'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import InfiniteLoading from 'vue-infinite-loading';

import {EpetJs} from '@/utils/epetsdk'
import {EpetApp} from '@/utils/localapp'
import store from '@/store/index'
import headerbar from '@/components/headerbar/headerbar'
Vue.component('headerbar', headerbar)
Vue.component('InfiniteLoading', InfiniteLoading)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false
Vue.prototype.$EpetJs = EpetJs;
Vue.prototype.$EpetApp = EpetApp;
const FastClick = require('fastclick')
FastClick.attach(document.body)
import './assets/css/public.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

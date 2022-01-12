// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';
import VueCarousel from 'vue-carousel';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueCarousel);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

Vue.component('Loading',Loading); // 全域啟用方式，不需要每個元件都載入
Vue.filter('currency',currencyFilter) // filter('自訂元件名稱', 載入元件)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);
 
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success){
        // console.log(from)
        next();
      }else {
        next({
          path: '/login'
        })
      }
    })
  }else{
    next();
  }
})

// 換頁後從最上方顯示
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
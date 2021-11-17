// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import './bus';


Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

Vue.component('Loading',Loading); // 全域啟用方式，不需要每個元件都載入

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
        console.log(from)
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
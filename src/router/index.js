import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/products';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard,
      meta: { requiresAuth: true }, //判斷此頁面是否需要驗證
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
})

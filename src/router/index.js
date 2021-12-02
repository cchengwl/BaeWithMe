import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/products';
import Order from '@/components/pages/orders';
import Coupon from '@/components/pages/coupon';
import Customer from '@/components/pages/customerOrder';
import CheckOut from '@/components/pages/customerCheckOut';

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
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'orders',
          component: Order,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'Customer',
      component: Dashboard,
      children: [
        {
          path: '/customer_order',
          name: 'customerOrder',
          component: Customer,
        },
        {
          path: '/customer_checkout/:orderId',
          name: 'customerCheckOut',
          component: CheckOut,
        },
      ]
    }
  ]
})

import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/products';
import Order from '@/components/pages/orders';
import Coupon from '@/components/pages/coupon';
import Customer from '@/components/pages/customerOrder';
import CheckOut from '@/components/pages/customerCheckOut';

import Home from '@/components/front_pages/Index';
import front_Products from '@/components/front_Products';
import front_Products_all from '@/components/front_pages/products_all';
import front_Products_single from '@/components/front_pages/products_single';
import front_Cart from '@/components/front_pages/cart';
import front_Checkout from '@/components/front_pages/cart_checkout';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/product',
      name: 'front_Products',
      component: front_Products,
      redirect: '/products',
      children: [
        {
          path: '/products',
          name: 'front_Products_all',
          component: front_Products_all,
        },
        {
          path: '/products/:id',
          name: 'front_Products_single',
          component: front_Products_single,
        },
      ]
    },
    {
      path: '/cart',
      name: 'front_Cart',
      component: front_Cart,
    },
    {
      path: '/checkout',
      name: 'front_Checkout',
      component: front_Checkout,
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

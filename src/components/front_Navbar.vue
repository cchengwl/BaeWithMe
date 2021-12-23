<template>
  <div>
    <nav class="front_nav">
      <div class="container">
        <ul v-show="hamburgerActive">
          <li><router-link :to="{name: 'home'}">首頁</router-link></li>
          <li><router-link :to="{name: 'front_Products_all'}">品牌商品</router-link></li>
          <li @click="openCart = !openCart">購物車
            <!-- <div class="cart_num" v-show="cartShow">{{cartQty}}</div> -->
          </li>
        </ul>
        <button class="hamburger hamburger--minus" :class="{'is-active': hamburgerActive}" @click="hamburgerActive = !hamburgerActive" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div class="front_nav_cart" v-show="openCart">
        <div class="front_nav_cart_contain" v-for="item in cart" :key="item.id">
          <div class="front_nav_cart_img"><img :src="item.product.imageUrl"></div>
          <div class="front_nav_cart_title">
            <h6>{{item.product.title}}</h6>
            <p>總價:{{item.product.price}}</p>
          </div>
          <button class="front_nav_cart_trash" @click.prevent="deleteItem(item.id)"><i class="fas fa-trash-alt"></i></button>         
        </div>
        <button class="add_to_cart_button" @click="gotoCart">前往購物車</button>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery';

export default({
  data() {
    return {
      hamburgerActive: false,
      cart: [],
      cartQty: '',
      cartShow: false,
      openCart: false
    }
  },

  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.cartShow = false;
      
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data.carts;
        vm.cartQty = response.data.data.carts.length;
        vm.cartShow = true;
      })
    },

    deleteItem(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      
      this.$http.delete(api).then((response) => {
        vm.getCart();
      })
    },

    gotoCart() {
      this.$router.push('/cart');
    }
  },

  created() {
    this.getCart();
    this.$bus.$on('update:cart',() => {
      this.getCart();
    })
  }
})
</script>

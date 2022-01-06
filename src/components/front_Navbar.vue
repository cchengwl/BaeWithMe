<template>
  <div>
    <nav class="front_nav">
      <div class="container">
        <ul :class="{'open': hamburgerActive}">
          <li><router-link :to="{name: 'home'}">首頁</router-link></li>
          <li><router-link :to="{name: 'front_Products_all'}">品牌商品</router-link></li>
          <li><router-link :to="{name: 'front_Cart'}">購物車</router-link></li>
        </ul>
        <button class="hamburger hamburger--minus" :class="{'is-active': hamburgerActive}" @click="hamburgerActive = !hamburgerActive" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
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
      cart: {},
    }
  },

  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
      })      
    },

    deleteItem(item) {
      const vm = this;
      const deleteAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`;

      this.$http.delete(deleteAPI).then((response) => {
        vm.getCart();
      })
    },


    goCart() {
      this.$router.push('/cart').catch(() => {});
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

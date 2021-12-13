<template>
  <div>
    <nav class="front-nav">
      <div class="container">
        <ul v-show="hamburgerActive">
          <li><router-link :to="{name: 'home'}">Home</router-link></li>
          <li><router-link :to="{name: 'front_Products_all'}">Products</router-link></li>
          <li><router-link :to="{name: 'front_Cart'}">Cart</router-link></li>
          <li><router-link to="/f&q">F&Q</router-link></li>
        </ul>
        <button class="hamburger hamburger--minus" :class="{'is-active': hamburgerActive}" @click="hamburgerActive = !hamburgerActive" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </nav>
    <div id="nav-bg"></div>
  </div>
</template>

<script>
import $ from 'jquery';

export default({
  data() {
    return {
      hamburgerActive: false,
    }
  },
})
</script>

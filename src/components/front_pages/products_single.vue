<template>
  <div class="product_single">
    <div class="product_single_img">
      <img src="https://cdn.pixabay.com/photo/2016/05/13/19/30/girl-with-a-cloth-1390693_1280.jpg" alt="">
    </div>
    <div class="product_single_detail">
      <h6>PRODUCT NAME</h6>
      <span>$1222</span>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <div>
        <button class="qty_button">-</button><input type="text" class="qty_input" v-model="qty"><button class="qty_button">+</button>
      </div>
      <button class="add_to_cart_button">ADD TO CART</button>
    </div>
  </div>
</template>

<script>
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";

export default {
  components: { frontNavbar, frontFooter },
  data() {
    return {
      qty: 0,
    }
  }
};
</script>
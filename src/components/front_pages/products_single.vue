<template>
  <div class="product_single">
    <div class="product_single_img">
      <img :src="product.imageUrl">
    </div>
    <div class="product_single_detail">
      <h6>{{product.title}}</h6>
      <span>{{product.price}}</span>
      <p>{{product.description}}</p>
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
      product: {},
    }
  },
  
  methods: {
    getSingleProduct() {
      const vm = this;
      const id = this.$route.params.id; // 從網址獲得product id

      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
    
      this.$http.get(api).then((response) => {
        console.log(response.data.product);
        vm.product = response.data.product;
      })
    }
  },

  created() {
    this.getSingleProduct();
  }

};
</script>
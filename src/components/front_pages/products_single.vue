<template>
  <div class="product_single">
    <alert/>
    <div class="product_single_img">
      <img :src="product.imageUrl">
    </div>
    <div class="product_single_detail">
      <h6>{{product.title}}</h6>
      <span class="product_single_detail_price">${{product.price}}</span>
      <span class="product_single_detail_origin">${{product.origin_price}}</span>
      <p>{{product.description}}</p>
      <div>
        <button class="qty_button" @click="qtyButton('minus')" :disabled="qty <= 1">-</button><input type="text" class="qty_input" v-model="qty"><button class="qty_button" @click="qtyButton('plus')" :disabled="qty >= 10">+</button>
      </div>
      <button class="add_to_cart_button" @click.prevent="addToCart">ADD TO CART</button>
    </div>
  </div>
</template>

<script>
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";
import Alert from '../AlertMessage.vue';

export default {
  components: { frontNavbar, frontFooter, Alert },
  data() {
    return {
      qty: 1,
      product: {},
      cart: [],
      cartId: {}
    }
  },
  
  methods: {
    getSingleProduct() {
      const vm = this;
      const id = this.$route.params.id; // 從網址獲得product id

      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
    
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
      })
    },

    qtyButton(count) {
      if(count === 'plus') {
        this.qty ++;
      }else {
        this.qty --;
      }
    },
    
    addToCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      
      let cart = {
        "product_id": vm.product.id,
        "qty": vm.qty
      }

      this.$http.get(api).then((response) => {
        vm.cart = response.data.data.carts;
        let currentItem = vm.cart.map(function(item) {
          return item.product_id
        }).indexOf(vm.product.id)

        if(currentItem !== -1) {
          vm.cartId = vm.cart.find(function(item) {
            return item.product_id === vm.product.id
          })
          const deleteAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${vm.cartId.id}`;
          this.$http.delete(deleteAPI).then((response) => {
            this.$http.post(api, { data:cart }).then((response) => {
              this.$bus.$emit('message:push',response.data.message, 'success');  
              this.$bus.$emit('update:cart');
            })
          })
        }else {
          this.$http.post(api, { data:cart }).then((response) => {
            this.$bus.$emit('message:push',response.data.message, 'success');
            this.$bus.$emit('update:cart');
          })          
        }

      })
    },
  },

  created() {
    this.getSingleProduct();
  }

};
</script>
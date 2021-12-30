<template>
  <div class="product_single">
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

export default {
  components: { frontNavbar, frontFooter },
  data() {
    return {
      qty: 1,
      product: {},
      cart: []
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

      vm.cart = JSON.parse(localStorage.getItem('cart'));

      if(vm.cart === null) {
        vm.cart = [],
        vm.cart.push({product: vm.product, qty: vm.qty, total: vm.product.price * vm.qty});

      }else {
        var result = vm.cart.map(function(item){ 
          return item.product.id 
        }).indexOf(vm.product.id);

        if(result === -1) {
          vm.cart.push({product: vm.product, qty: vm.qty, total: vm.product.price * vm.qty});
        }else {
          vm.cart[result].qty = vm.qty;
          vm.cart[result].total = vm.product.price * vm.qty;
        }
      }

      var cartJson = JSON.stringify(vm.cart);
      localStorage.setItem('cart', cartJson);      
    },

    clear() {
      localStorage.clear('cart');
    }
  },

  created() {
    this.getSingleProduct();
  }

};
</script>
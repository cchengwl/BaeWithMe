<template>
  <div>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="cart_main">
      <div class="cart_main_table">
        <div class="cart_main_table_head">
          <div style="width: 400px"><h6>Product</h6></div>
          <div class="text-center" style="width: 300px"><h6>價格</h6></div>
          <div class="text-center" style="width: 200px"><h6>數量</h6></div>
          <div class="text-right" style="width: 200px"><h6>總價</h6></div>
        </div>
        <div class="cart_main_table_body">
          <div class="cart_main_table_body_row" v-for="item in cart.carts" :key="item.id">
            <div style="width: 400px; table_body_row_phone1">
              <div class="cart_main_table_body_row_img">
                <a href="#">
                  <img
                    :src="item.product.imageUrl"
                  />                    
                </a>
              </div>
              <div class="cart_main_table_body_row_detail">
                <a href="#"><h6>{{item.product.title}}</h6></a>
                <p>{{item.product.description}}</p>
                <span><i class="far fa-trash-alt"></i></span>
              </div>
            </div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 300px">{{item.product.price}}</div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 200px">{{item.qty}}</div>
            <div class="text-right cart_main_table_body_row_phone2" style="width: 200px">{{item.total}}</div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <div>總價: {{cart.total}}</div>
          <div>優惠券碼 <input type="text" v-model="coupon" @change="applyCoupon"></div>
          <div class="text-success">折扣後價格: {{Math.ceil(cart.final_total)}}</div>
          <button class="qty_button" @click="checkOut">確認結帳去<i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </main>
    <front-footer />
  </div>
</template>

<script>
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";

export default {
  components: { frontNavbar, frontFooter },

  data() {
    return {
      cart: {},
      coupon: '',
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

    applyCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      
      let coupon = {
        "code": vm.coupon,
      }

      this.$http.post(api, { data : coupon } ).then((response) => {
        alert('已套用優惠券');
        this.$bus.$emit('couponCode',vm.coupon);
        vm.getCart();
      })
    },

    checkOut() {
      this.$router.push('/checkout');
    },

    qtyButton(count,item) {
      if(count === 'plus') {
        item.qty ++;
      }else {
        item.qty --;
      }
    }
  },

  created() {
    this.getCart();
  }
};
</script>
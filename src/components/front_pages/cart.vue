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
          <div class="cart_main_table_body_row">
            <div style="width: 400px; table_body_row_phone1">
              <div class="cart_main_table_body_row_img">
                <a href="#">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/05/13/19/30/girl-with-a-cloth-1390693_1280.jpg"
                  />                    
                </a>
              </div>
              <div class="cart_main_table_body_row_detail">
                <a href="#"><h6>Product Name</h6></a>
                <p>產品敘述</p>
                <span><i class="far fa-trash-alt"></i></span>
              </div>
            </div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 300px">$100</div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 200px">
              <button class="qty_button">-</button><input type="text" class="qty_input"><button class="qty_button">+</button>
            </div>
            <div class="text-right cart_main_table_body_row_phone2" style="width: 200px">$10,000</div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <div>總價: 10,000</div>
          <div>優惠券碼 <input type="text"></div>
          <div class="text-success">折扣後價格: 10,000</div>
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

  methods: {
    checkOut() {
      this.$router.push('/checkout');
    }
  }
};
</script>
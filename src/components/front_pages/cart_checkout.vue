<template>
  <div>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="cart_main cart_checkout">
      <h5>產品資訊</h5>
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
              </div>
            </div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 300px">$100</div>
            <div class="text-center cart_main_table_body_row_phone2" style="width: 200px">1</div>
            <div class="text-right cart_main_table_body_row_phone2" style="width: 200px">$10,000</div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <div>總價: 10,000</div>
          <div>優惠券碼 code11111</div>
          <div class="text-success">折扣後價格: 10,000</div>
        </div>            
      </div>
      <h5>運送資訊</h5>
      <div class="cart_checkout_delivery">
        <Validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <Validation-provider name="email" rules="required|email" v-slot="{ errors,classes }">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" :class="classes" name="email" id="useremail"
                placeholder="請輸入 Email" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
      
          <div class="form-group">
            <Validation-provider name="收件人姓名" rules="required" v-slot="{ errors,classes }">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" :class="classes" name="name" id="username"
                placeholder="輸入姓名">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
        
          <div class="form-group">
            <Validation-provider name="收件人電話" rules="required|numeric" v-slot="{ errors,classes }">
              <label for="usertel">收件人電話</label>
              <input type="tel" name="tel" class="form-control" :class="classes" id="usertel" placeholder="請輸入電話">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
        
          <div class="form-group">
            <Validation-provider name="收件人地址" rules="required" v-slot="{ errors,classes }">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" :class="classes" name="address" id="useraddress"
                placeholder="請輸入地址">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>                
        
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" placeholder="有任何問題請留言"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger" type="submit" :disabled="invalid">送出訂單</button>
          </div>
        </Validation-observer>
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
};
</script>
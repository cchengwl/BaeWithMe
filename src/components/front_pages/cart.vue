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
                <a href="#">{{item.product.title}}</a>
                <p>{{item.product.description}}</p>
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
        </div>            
      </div>
      <h5>運送資訊</h5>
      <div class="cart_checkout_delivery">
        <Validation-observer v-slot="{ invalid }">
          <div class="form-group">
            <Validation-provider name="email" rules="required|email" v-slot="{ errors,classes }">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" :class="classes" name="email" id="useremail"
                placeholder="請輸入 Email" v-model="form.user.email" required>
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
      
          <div class="form-group">
            <Validation-provider name="收件人姓名" rules="required" v-slot="{ errors,classes }">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" :class="classes" name="name" id="username"
                placeholder="輸入姓名" v-model="form.user.name">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
        
          <div class="form-group">
            <Validation-provider name="收件人電話" rules="required|numeric" v-slot="{ errors,classes }">
              <label for="usertel">收件人電話</label>
              <input type="tel" name="tel" class="form-control" :class="classes" id="usertel" 
              placeholder="請輸入電話" v-model="form.user.phone">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>
        
          <div class="form-group">
            <Validation-provider name="收件人地址" rules="required" v-slot="{ errors,classes }">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" :class="classes" name="address" id="useraddress"
                placeholder="請輸入地址" v-model="form.user.address">
              <span class="text-danger">{{ errors[0] }}</span>
            </Validation-provider>
          </div>                
        
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" placeholder="有任何問題請留言"
             v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger" type="submit" @click="creatOrder" :disabled="invalid">送出訂單</button>
          </div>
        </Validation-observer>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-check-circle"></i>訂單建立成功</h5>
              <h6>感謝您的訂購，訂單編號為: {{orderId}}</h6>
            </div>
          </div>
        </div>
      </div>
    </main>
    <front-footer />
  </div>
</template>

<script>
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";
import $ from 'jquery';

export default {
  components: { frontNavbar, frontFooter },

  data() {
    return {
      cart: {},
      form: {
        "user": {
          "name": "",
          "email": "",
          "tel": "",
          "address": ""
        },
        "message": ""
      },
      orderId: '',
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

    creatOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;

      this.$http.post(api, {data: vm.form}).then((response) => {
        console.log(response.data)
        vm.orderId = response.data.orderId;
        $('#orderModal').modal('show');
      })
    },

    closeModal() {
      this.orderId = '';
    },
  },

  created() {
    this.getCart();
  }
};
</script>
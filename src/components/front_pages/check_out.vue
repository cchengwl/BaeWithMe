<template>
  <div>
    <loading :active.sync="isLoading"/>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="cart_main cart_checkout">
      <h5>產品資訊</h5>
      <div class="cart_main_table">
        <div class="cart_main_table_head">
          <div class="cart_main_table_body_item"><h6>商品名稱</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>單價</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>數量</h6></div>
          <div class="cart_main_table_body_item text-right"><h6>總價</h6></div>
        </div>
        <div class="cart_main_table_body">
          <div class="cart_main_table_body_row" v-for="(item) in cart.carts" :key="item.id">
            <div class="cart_main_table_body_item">
              <div class="cart_main_table_body_row_img">
                <router-link :to="`/products/${item.product.id}`">
                  <img
                    :src="item.product.imageUrl"
                  />
                </router-link>
              </div>
              <router-link :to="`/products/${item.product.id}`" style="display: inline-block;"><h6>{{item.product.title}}</h6></router-link>
            </div>
            <div class="cart_main_table_body_item text-center"><span>單價 </span>NT${{item.product.price}}</div>
            <div class="cart_main_table_body_item text-center">{{item.qty}}</div>
            <div class="cart_main_table_body_item text-right"><span>總價 </span>NT${{item.total}}</div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <div class="cart_main_table_foot_total">總計：NT${{cart.total}}</div>
          <div class="cart_main_table_foot_total text-success" v-if="cart.total > cart.final_total">折扣後價格：NT${{Math.ceil(cart.final_total)}}</div>          
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
              <h6>感謝您的訂購，訂單編號為:</h6>
              <h6>{{orderId}}</h6>
              <button class="add_to_cart_button" @click="goPay(orderId)">前往付款</button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <stars/>
    <front-footer />
  </div>
</template>

<script>
import $ from 'jquery';
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";
import Stars from '../Stars.vue';


export default {
  components: { frontNavbar, frontFooter, Stars },

  data() {
    return {
      cart: [],
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
      isLoading: false,
    }
  },

  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;

      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      })
    },  

    creatOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;

      this.$http.post(api, {data: vm.form}).then((response) => {
        vm.orderId = response.data.orderId;
        $('#orderModal').modal('show');
      })
    },

    goPay(orderId) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${orderId}`;

      this.$http.post(api).then((response) => {
        vm.$router.push({
          name: 'front_Paid',
          params: { orderId: orderId }
        }).catch(() => {});
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
<template>
  <div>
    <loading :active.sync="isLoading"/>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="cart_main">
      <alert/>
      <div class="cart_main_table">
        <div class="cart_main_table_head">
          <div class="cart_main_table_body_item"><h6>商品名稱</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>價格</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>數量</h6></div>
          <div class="cart_main_table_body_item text-right"><h6>總價</h6></div>
          <div class="cart_main_table_body_item text-center"></div>
        </div>
        <div class="cart_main_table_body">
          <div class="cart_main_table_body_row" v-for="item in cart.carts" :key="item.id">
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
            <div class="cart_main_table_body_item text-center">NT${{item.product.price}}</div>
            <div class="cart_main_table_body_item text-center">
              <button class="qty_button" @click="qtyButton('minus',item)" :disabled="item.qty <= 1">-</button><input type="text" class="qty_input" v-model="item.qty" disabled><button class="qty_button" @click="qtyButton('plus',item)" :disabled="item.qty >= 10">+</button>
            </div>
            <div class="cart_main_table_body_item text-right">NT${{item.total}}</div>
            <div class="cart_main_table_body_item text-center"><button @click.prevent="deleteItem(item)"><i class="far fa-trash-alt"></i></button></div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <div class="cart_main_table_foot_coupon">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">套用優惠券</span>
              </div>
              <input type="text" id="couponCode" v-model="coupon" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>          
          </div>
          <div class="cart_main_table_foot_total">總計：NT${{cart.total}}</div>
          <div class="cart_main_table_foot_total text-success" v-if="cart.total > cart.final_total">折扣後價格：NT${{cart.final_total}}</div>          
          <button class="add_to_cart_button" @click.prevent="openModal">清空購物車</button>
          <button class="add_to_cart_button" @click.prevent="checkOut" :disabled="cart.total === 0">確認結帳去<i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </main>
    <!-- Modal -->
    <div class="modal fade" id="clearModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body cart_main_modal">
            確定要移除商品嗎？<br>刪除後將無法恢復
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-dismiss="modal">取消</button>
            <button type="button" class="btn" @click="clearItem">確定刪除</button>
          </div>
        </div>
      </div>
    </div>
    <front-footer />
  </div>
</template>

<script>
import $ from 'jquery';
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";
import Alert from '../AlertMessage.vue';

export default {
  components: { frontNavbar, frontFooter, Alert },

  data() {
    return {
      cart: {},
      isLoading: false,
      coupon: '',
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

    qtyButton(count, item) {
      const vm = this;
      const deleteAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`;
      const postAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;

      if(count === 'plus') {
        item.qty ++;
      }else {
        item.qty --;
      }

      let cart = {
        "product_id": item.product_id,
        "qty": item.qty
      }

      this.$http.delete(deleteAPI).then((response) => {
        this.$http.post(postAPI, { data: cart }).then((response) => {
          vm.isLoading = false;
          vm.getCart();
          this.$bus.$emit('update:cart');
        })
      })
    },
    
    checkOut() {
      this.$router.push('/checkout').catch(() => {});
    },

    deleteItem(item) {
      const vm = this;
      const deleteAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${item.id}`;

      this.$http.delete(deleteAPI).then((response) => {
        vm.getCart();
      })
    },

    openModal() {
      $('#clearModal').modal('show');
    },

    clearItem() {
      const vm = this;

      for(let i = 0; i < vm.cart.carts.length ; i++) {
        let itemId = vm.cart.carts[i].id;
        let deleteAPI = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${itemId}`;

        this.$http.delete(deleteAPI).then((response) => {
          vm.getCart();
        })
      }

      $('#clearModal').modal('hide');
    }
  },

  created() {
    this.getCart();
  },

  mounted() {
    const vm = this;
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;

    $('#couponCode').change(function() {
      let coupon = {
        "code": vm.coupon,
      }      
      vm.$http.post(api, { data : coupon } ).then((response) => {
        if(response.data.success) {
          vm.$bus.$emit('message:push',response.data.message, 'success');          
        }else {
          vm.$bus.$emit('message:push',response.data.message, 'danger');
        }
        vm.coupon = '';
        vm.getCart();
      })
    })    
  }
};
</script>
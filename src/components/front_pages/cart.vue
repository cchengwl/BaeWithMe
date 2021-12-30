<template>
  <div>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="cart_main">
      <div class="cart_main_table">
        <div class="cart_main_table_head">
          <div class="cart_main_table_body_item"><h6>商品名稱</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>價格</h6></div>
          <div class="cart_main_table_body_item text-center"><h6>數量</h6></div>
          <div class="cart_main_table_body_item text-right"><h6>總價</h6></div>
          <div class="cart_main_table_body_item text-center"></div>
        </div>
        <div class="cart_main_table_body">
          <div class="cart_main_table_body_row" v-for="(item,index) in cart" :key="item.id">
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
            <div class="cart_main_table_body_item text-center"><button @click.prevent="deleteItem(item,index)"><i class="far fa-trash-alt"></i></button></div>
          </div>
        </div>
        <div class="cart_main_table_foot">
          <button class="add_to_cart_button" @click.prevent="openModal">清空購物車</button>
          <div>總計：NT${{subTotal}}</div>
          <button class="add_to_cart_button" @click.prevent="checkOut">確認結帳去<i class="fas fa-arrow-right"></i></button>
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

export default {
  components: { frontNavbar, frontFooter },

  data() {
    return {
      cart: [],
      qty: 0,
    }
  },

  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      vm.cart = JSON.parse(localStorage.getItem('cart'));
    },

    qtyButton(count, item) {
      const vm = this;

      if(count === 'plus') {
        item.qty ++;
      }else {
        item.qty --;
      }
      item.total = item.product.price * item.qty;

      let cartJson = JSON.stringify(vm.cart);
      localStorage.setItem('cart',cartJson);
    },  

    checkOut() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      for(let i = 0; i < vm.cart.length; i++) {
        let cart = {
          "product_id": vm.cart[i].product.id,
          "qty": vm.cart[i].qty
        }
        this.$http.post(api, { data: cart }).then((response) => {
          vm.cart = [];
          let cartJson = JSON.stringify(vm.cart);
          localStorage.setItem('cart',cartJson);
          this.$router.push('/checkout').catch(() => {});
        })
      }
    },

    deleteItem(item, index) {
      const vm = this;
      vm.cart.splice(index, 1);

      let cartJson = JSON.stringify(vm.cart);
      localStorage.setItem('cart',cartJson);
    },

    openModal() {
      $('#clearModal').modal('show');
    },

    clearItem() {
      const vm = this;
      vm.cart = [];
      let cartJson = JSON.stringify(vm.cart);
      localStorage.setItem('cart',cartJson);

      $('#clearModal').modal('hide');
    }
  },

  computed: {
    subTotal() {
      const vm = this;
      let subtotal = vm.cart.map(function(item) {
        return item.total
      }).reduce(function(prev, curr) {
        return prev + curr
      }, 0)

      return subtotal
    },

    total() {
      const vm = this;

    }
  },

  created() {
    this.getCart();
  }
};
</script>
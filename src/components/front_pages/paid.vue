<template>
  <div>
    <loading :active.sync="isLoading"/>
    <front-navbar />
    <div class="product_nav_margin"></div>
    <main class="paid_main">
      <div class="paid_main_thanks">
        <h4>感謝您的購買，商品將為您準備出貨</h4>
        <h5>以下為您的訂單及運送資訊</h5>
        <button class="add_to_cart_button" @click="goNext('home')">前往首頁</button><button class="add_to_cart_button" @click="goNext('front_Products_all')">前往商店</button>
      </div>
      <div class="paid_main_order">
        <h5>訂單資訊</h5>
        <div class="paid_main_order_table">
          <div class="paid_main_order_table_head">
            <div class="paid_main_order_item"><h6>商品名稱</h6></div>
            <div class="paid_main_order_item text-center"><h6>數量</h6></div>
            <div class="paid_main_order_item text-right"><h6>小計</h6></div>            
          </div>
          <div class="paid_main_order_table_body">
            <div class="paid_main_order_table_body_row" v-for="item in order.products" :key="item.id">
              <div class="paid_main_order_item">
                <div class="paid_main_order_table_body_row_img">
                  <router-link :to="`/products/${item.product_id}`">
                    <img
                      :src="item.product.imageUrl"
                    />
                  </router-link>
                </div>
                <router-link :to="`/products/${item.product_id}`" style="display: inline-block;"><h6>{{item.product.title}}</h6></router-link>
              </div>
              <div class="paid_main_order_item text-center">{{item.qty}}</div>
              <div class="paid_main_order_item text-right">NT${{item.total}}</div>
            </div>              
          </div>
        </div>
      </div>
      <div class="paid_main_ship">
        <h5>運送資訊</h5>
        <div>
          <span>下單日期</span><span>{{order.create_at}}</span>
        </div>
        <div>
          <span>顧客姓名</span><span>{{order.user.name}}</span>
        </div>
        <div>
          <span>連絡電話</span><span>{{order.user.phone}}</span>
        </div>
        <div>
          <span>電子郵件</span><span>{{order.user.email}}</span>
        </div>
        <div>
          <span>地址</span><span>{{order.user.address}}</span>
        </div>                     
      </div>
    </main>
    <stars/>
    <front-footer />
  </div>
</template>

<script>
import frontNavbar from "../front_Navbar.vue";
import frontFooter from "../front_Footer.vue";
import Stars from '../Stars.vue';

export default {
  components: { frontNavbar, frontFooter, Stars },

  data() {
    return {
      order: {
        "user": {
          "name": "",
          "email": "",
          "tel": "",
          "address": ""
        },
      },
      isLoading: false,
    }
  },

  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.$route.params.orderId}`;
      vm.isLoading = true;
      
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        const date = new Date(vm.order.create_at * 1000);
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

        vm.order.create_at = `${yyyy}/${mm}/${dd} ${hour}:${minute}:${second}`;
        vm.isLoading = false;
      })
    },

    goNext(page) {
      this.$router.push({
        name: page,
      })
    }
  },

  mounted() {
    this.getOrder();
  }
  
}
</script>
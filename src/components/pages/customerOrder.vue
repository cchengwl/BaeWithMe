<template>
  <div class="row mt-5">
    <loading :active.sync="isLoading"/>
    <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
      <div class="card border-0 shadow-sm">
        <div class="cardImg"
          :style="{backgroundImage:`url(${item.imageUrl})`}">
        </div>
        <div class="card-body">
          <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
          <h5 class="card-title">
            <a href="#" class="text-dark">{{item.title}}</a>
          </h5>
          <p class="card-text">{{item.description}}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="item.price == item.origin_price">售價 {{item.origin_price}}</div>
            <del class="h6" v-if="item.origin_price > item.price">原價 {{item.origin_price}}</del>
            <div class="h5" v-if="item.origin_price > item.price">現在只要 {{item.price}} 元</div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProductDetail(item.id)">
            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
            <i class="fas fa-spinner fa-spin" v-if="status.loadingCart === item.id"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <hr width="100%;">
    <!-- 購物車如為空隱藏表格 -->
    <div class="d-flex flex-column" style="margin: 0 auto;" v-if="cart.carts.length !== 0">
      <table class="table">
        <thead>
          <tr>
            <th class="align-middle text-center"></th>
            <th class="align-middle" width="220px;">品名</th>
            <th class="align-middle" width="220px;">內容</th>
            <th class="align-middle text-right">數量</th>
            <th class="align-middle text-right">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle text-center"><button class="btn btn-outline-danger" @click="removeCartItem(item.id)"><i class="far fa-trash-alt"></i></button></td>
            <td class="align-middle" width="220px;">{{item.product.title}}</td>
            <td class="align-middle" width="220px;">{{item.product.content}}</td>
            <td class="align-middle text-right">{{item.qty}}</td>
            <td class="align-middle text-right">{{item.final_total}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.total !== cart.final_total">
            <td colspan="4" class="text-right text-success">折扣後</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="applyCoupon">套用優惠碼</button>
          </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{productDetail.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="cardImg" style="height: 300px;"
              :style="{backgroundImage:`url(${productDetail.imageUrl})`}">
            </div>
            <h3 class="mt-3">{{productDetail.content}}</h3>
            <br>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="productDetail.price == productDetail.origin_price">售價 {{productDetail.origin_price}}</div>
              <del class="h6" v-if="productDetail.origin_price > productDetail.price">原價 {{productDetail.origin_price}}</del>
              <div class="h5" v-if="productDetail.origin_price > productDetail.price">現在只要 {{productDetail.price}} 元</div>
            </div>
            <div class="input-group my-3">
              <select class="custom-select" id="inputGroupSelect01" v-model="productDetail.num">
                <option :value="num" v-for="num in 10" :key="num">{{num}} 人</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <span class="h6">小計 {{subtotal}} 元</span>
            <button type="button" class="btn btn-primary" @click="addtoCart(productDetail.id, productDetail.num)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default({
  data() {
    return {
      products: [],
      productDetail: {},
      isLoading: false,
      status: {
        loadingItem: '',
        loadingCart: '',
      },
      pagination: {},
      cart: {},
      coupon: '',
    }
  }, 
  methods: {
    getProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=:page`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then((response) => { 
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      })
    },

    getProductDetail(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;

      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.productDetail = response.data.product;
        $('#productModal').modal('show');
        vm.productDetail.num = 1;
        vm.status.loadingItem = '';
      })
    },

    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        "product_id": id,
        qty
      };

      vm.status.loadingCart = id;

      this.$http.post(api, {"data": cart}).then((response) => {
        $('#productModal').modal('hide');
         vm.status.loadingCart = '';
        vm.getCart();
      })
    },

    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;

      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
      })
    },

    removeCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;

      this.$http.delete(api).then((response) => {
        console.log(response.data);
        vm.getCart();
      })
    },

    applyCoupon() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        data: {
          code: vm.coupon,
        }
      }

      this.$http.post(api,coupon).then((response) => {
        console.log(response.data);
      })
    }
  },
  
  computed: {
    subtotal() {
      return this.productDetail.num * this.productDetail.price;
    }
  },

  created() {
    this.getProduct();
    this.getCart();
  }
})
</script>

<style scoped>
  .cardImg{
    height: 150px; 
    background-size: cover; 
    background-position: center
  }
</style>
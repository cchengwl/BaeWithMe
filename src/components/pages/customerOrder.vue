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
            <!-- <i class="fas fa-spinner fa-spin"></i> -->
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
            <!-- <i class="fas fa-spinner fa-spin"></i> -->
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <select class="custom-select" id="inputGroupSelect01" v-model="quantity">
                <option selected value="0">請選擇人數</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <span class="h6">小計 {{subtotal}} 元</span>
            <button type="button" class="btn btn-primary">加到購物車</button>
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
      tempProduct: {},
      isLoading: false,
      pagination: {},
      quantity: 0,
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

      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.productDetail = response.data.product;
        $('#exampleModal').modal('show');
        vm.quantity = 0;
      })
    }
  },
  
  computed: {
    subtotal() {
      return this.quantity * this.productDetail.price;
    }
  },

  created() {
    this.getProduct();
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
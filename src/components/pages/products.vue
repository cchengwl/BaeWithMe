<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">新增商品</button>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <td style="width: 200px;">類別</td>
          <td>產品名稱</td>
          <td class="text-right" style="width: 100px;">數量</td>
          <td class="text-right" style="width: 100px;">原價</td>
          <td class="text-right" style="width: 100px;">售價</td>
          <td class="text-center" style="width: 100px;">狀態</td>
          <td class="text-center" style="width: 100px;">編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id" class="align-middle">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.num}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <!-- <td>{{item.unit}}</td> -->
          <!-- <td>{{item.image}}</td> -->
          <td class="text-center">
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return{
      products: [],
    }
  },
  
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=:page`;
      const vm = this;

      this.$http.get(api).then((response) => { 
        console.log(response.data) 
        vm.products = response.data.products;
      })
    }
  },

  created() {
    this.getProducts();
  }
}
</script>

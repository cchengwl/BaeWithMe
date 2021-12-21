<template>
  <div>
    <div class="product_all_main_filter">
      <label>Sort By:</label><select name="filter_select" id="main_filter_select">
        <option value="Price">Price(Low to High)</option></select>
    </div>
    <div class="product_all_main_products">         
      <div class="product_all_main_products_intro" v-for="item in filterProducts" :key="item.id">
        <router-link :to="{ path:`/products/${item.id}` }">
          <div class="product_all_main_products_intro_img">
            <img :src="item.imageUrl">
          </div>
          <p>{{item.title}}</p>
          <span>{{item.price}}</span>
          <button class="add_to_cart_button">查看更多</button>          
        </router-link>
      </div>
    </div>

    <!-- 分頁標籤 -->
    <nav aria-label="Page navigation example" v-if="pagination.category === null">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled':!pagination.has_pre }">
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" :class="{ 'active':page === pagination.current_page }" v-for="page in pagination.total_pages" :key="page">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{ 'disabled':!pagination.has_next }">
          <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['products','pagination','filterProducts'],

  methods: {
    getProducts(page = 1) {
      this.$emit('page', page);
    },

    addToCart(id , qty) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      let cart = {
        "product_id": id,
        "qty": qty
      }

      this.$http.post(api, { data : cart}).then((response) => {
        this.$bus.$emit('update:cart');
      })
    }
  },

  created() {
    this.getProducts();
  }
};
</script>

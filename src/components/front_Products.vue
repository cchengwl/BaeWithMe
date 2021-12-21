<template>
  <div>
    <front-navbar/>
      <div class="product_nav_margin">
      <article class="product_article">
        <div class="product_article_mask"></div>
        <div class="container">
          <h4>Products</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </article>
    </div>
    <div class="product_content">
      <aside>
        <h6>CATEGORIES</h6>
        <ul>
          <li><button @click="getCategory(null)">全部商品</button></li>
          <li><button @click="getCategory('backpack')">背包</button></li>
          <li><button @click="getCategory('shoes')">鞋子</button></li>
          <li><button @click="getCategory('accessory')">配件</button></li>
        </ul>
      </aside>
      <main class="product_main">
        <router-view :products="products" :pagination="pagination" :filterProducts="filterProducts" @page="getProducts"/>
      </main>
    </div>
    <front-footer/>
  </div>
</template>

<script>
import frontNavbar from "./front_Navbar.vue";
import frontFooter from "./front_Footer.vue";

export default {
  components: { frontNavbar, frontFooter },
  
  data() {
    return {
      allProducts: [],
      products: [],
      pagination: {},
      filterProducts: [],
    }
  },

  methods: {
    getAllProducts() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      
      this.$http.get(api).then((response) => {
        vm.allProducts = response.data.products;

        vm.allProducts = vm.allProducts.filter((item) => {
          return item.is_enabled === 1;
        })        
      })
    },

    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;

      this.$http.get(api).then((response) => {
        vm.products = response.data.products;

        vm.products = vm.products.filter((item) => {
          return item.is_enabled === 1;
        })

        vm.filterProducts = vm.products;
        vm.pagination = response.data.pagination;
      })
    },

    getCategory(item) {
      const vm = this;
      vm.pagination.category = item;

      if(vm.pagination.category !== null) {
        this.$router.push({
          name: 'front_Products_all',
          query: {
            category: item
          }
        }).catch(() => {});

        vm.filterProducts = vm.allProducts.filter(item => {
          return item.category === vm.pagination.category;
        })

      } else if(vm.pagination.category === null){
        this.$router.push({
          name: 'front_Products_all',
        }).catch(() => {});

        return vm.filterProducts = vm.products;
      }
    },
  },

  created() {
    this.getProducts();
    this.getAllProducts();
  }  
};
</script>
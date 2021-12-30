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
        <h6>茶種</h6>
        <div class="product_content_flex">
          <div class="product_content_flex_item">
            <button @click="getCategory('backpack')">
              <div></div>
              <span>紅茶</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button @click="getCategory('shoes')">
              <div></div>
              <span>綠茶</span>              
            </button>
          </div>
          <div class="product_content_flex_item">
            <button>
              <div></div>
              <span>白茶</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button>
              <div></div>
              <span>烏龍</span>              
            </button>
          </div>
          <div class="product_content_flex_item">
            <button>
              <div></div>
              <span>普洱</span>
            </button>
          </div>
          <div class="product_content_flex_item">
            <button>
              <div></div>
              <span>花草茶</span>              
            </button>
          </div>                        
        </div>
      </aside>
      <main class="product_main">
        <router-view :products="products" :pagination="pagination" :filterProducts="filterProducts" @page="getProducts"/>
      </main>
    </div>
    <stars/>
    <front-footer/>
  </div>
</template>

<script>
import frontNavbar from "./front_Navbar.vue";
import frontFooter from "./front_Footer.vue";
import Stars from './Stars.vue';

export default {
  components: { frontNavbar, frontFooter, Stars },
  
  data() {
    return {
      allProducts: [],
      products: [],
      pagination: {},
      filterProducts: [],
      category: null,
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

    this.$bus.$on('get:category', item => {
      this.getCategory(item);
    })
  },
};
</script>